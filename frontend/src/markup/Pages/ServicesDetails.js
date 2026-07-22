import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import Header from './../Layout/Header';
import Footer2 from './../Layout/Footer2';
import PageTitle from './../Layout/PageTitle';
import { applyMetaTags } from '../../utils/meta';
import dpic1 from './../../images/blog/default/pic1.jpg';

const API_BASE = process.env.REACT_APP_API_URL || 'https://empireesttatesapi.freshmindz.in';
const API_URL = `${API_BASE}`;

const getImagesArray = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  try {
    const p = JSON.parse(v);
    return Array.isArray(p) ? p : [p];
  } catch {
    return v.trim().startsWith('data:image/') || (!v.trim().startsWith('[')) ? [v] : [];
  }
};

export default function ServicesDetails() {
  const { slug: pathSlug } = useParams();
  const querySlug = new URLSearchParams(useLocation().search).get('slug');
  const slug = pathSlug || querySlug;
  const history = useHistory();

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Fetch all services for the sidebar
        const all = await fetch(`${API_URL}/services`).then(r => r.json());
        setAllServices(all);
        
        if (slug) {
          const current = all.find(s => s.slug === slug);
          if (current) {
             setService(current);
          } else {
             const r = await fetch(`${API_URL}/services/slug/${slug}`);
             if (!r.ok) throw new Error('Not found');
             setService(await r.json());
          }
        } else {
          if (all[0]) setService(all[0]);
        }
        setError(null);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  useEffect(() => {
    if (service) applyMetaTags(
      `${service.title || service.service} | Empire Estates`,
      service.description || ''
    );
  }, [service]);

  if (loading) return (
    <Fragment>
      <Header isTransparent={true} />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 44, height: 44, border: '3px solid #f0ebe1', borderTopColor: '#c8902a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <Footer2 />
    </Fragment>
  );

  if (error || !service) return (
    <Fragment>
      <Header isTransparent={true} />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#c0392b' }}>{error || 'Service not found'}</p>
        <Link to="/" style={{ color: '#c8902a', fontWeight: 600 }}>Back to Home</Link>
      </div>
      <Footer2 />
    </Fragment>
  );

  const imgs = getImagesArray(service.images);
  const serviceImages = imgs.length ? imgs : [dpic1];

  return (
    <Fragment>
      <Header isTransparent={true} />
      <PageTitle motherMenu="Services" activeMenu={service.title || service.service} placement="Services Details Banner" />

      <div style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="row">
            
            {/* ── LEFT COLUMN (Main Content) ── */}
            <div className="col-lg-8 mb-5 mb-lg-0">
              
              {/* Main Large Image */}
              <div style={{ marginBottom: 35, borderRadius: 0, overflow: 'hidden' }}>
                 <img src={serviceImages[0]} alt={service.title || service.service} style={{ width: '100%', height: 450, objectFit: 'cover' }} />
              </div>

              {/* Service Title */}
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
                {service.title || service.service}
              </h2>

              {/* Description with Drop Cap */}
              <div style={{ color: '#666', fontSize: 16, lineHeight: 1.8, marginBottom: 30, display: 'flow-root' }}>
                {service.description ? (
                  <p>
                    <span style={{ 
                      float: 'left', 
                      fontSize: 40, 
                      lineHeight: '70px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      background: '#c8902a', 
                      width: '70px',
                      height: '70px',
                      textAlign: 'center',
                      marginRight: 25, 
                      marginBottom: 10,
                      marginTop: 6
                    }}>
                      {service.description.charAt(0)}
                    </span>
                    {service.description.substring(1)}
                  </p>
                ) : (
                   <p>No description available for this service.</p>
                )}
              </div>

              {/* Services Included Section */}
              {(() => {
                let list = [];
                if (Array.isArray(service.servicesIncluded)) {
                  list = service.servicesIncluded;
                } else if (typeof service.servicesIncluded === 'string') {
                  try {
                    const parsed = JSON.parse(service.servicesIncluded);
                    list = Array.isArray(parsed) ? parsed : [];
                  } catch (e) {
                    list = [];
                  }
                }
                if (list.length === 0) return null;
                
                return (
                  <div style={{ marginTop: 50, marginBottom: 50 }}>
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', marginBottom: 25, borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                      <span style={{ color: '#c8902a' }}>Services</span> Included
                    </h3>
                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', listStyle: 'none', padding: 0 }}>
                      {list.map((item, idx) => (
                        <li key={idx} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: '#333', 
                          fontSize: 15,
                          fontWeight: 500,
                          padding: '14px 18px',
                          background: '#fff',
                          border: '1px solid #eee',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          transition: 'all 0.3s ease',
                          cursor: 'default'
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.borderColor = '#c8902a'; 
                          e.currentTarget.style.transform = 'translateY(-3px)'; 
                          e.currentTarget.style.boxShadow = '0 6px 15px rgba(200,144,42,0.1)'; 
                          e.currentTarget.style.color = '#c8902a';
                        }}
                        onMouseLeave={(e) => { 
                          e.currentTarget.style.borderColor = '#eee'; 
                          e.currentTarget.style.transform = 'translateY(0)'; 
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)'; 
                          e.currentTarget.style.color = '#333';
                        }}
                        >
                          <span style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            width: '26px', 
                            height: '26px', 
                            borderRadius: '50%', 
                            background: 'rgba(200,144,42,0.1)', 
                            color: '#c8902a', 
                            marginRight: '12px',
                            flexShrink: 0
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

            </div>


            {/* ── RIGHT COLUMN (Sidebar) ── */}
            <div className="col-lg-4 pl-lg-5">
              
              {/* Services List Menu */}
              <div style={{ marginBottom: 40 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {allServices.map((s, idx) => {
                    const isActive = (s.slug === slug) || (s.id === service.id);
                    return (
                      <li key={idx} style={{ marginBottom: 10 }}>
                        <Link 
                          to={`/services-details/${s.slug}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: isActive ? '#c8902a' : '#f5f6f8',
                            color: isActive ? '#fff' : '#222',
                            padding: '18px 25px',
                            fontWeight: 600,
                            fontSize: 14,
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: 'none'
                          }}
                        >
                          {s.title || s.service}
                          <FaArrowRight style={{ color: isActive ? '#fff' : '#1a1a2e', fontSize: 14 }} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>


              {/* Sidebar Additional Images (Moved from main column) */}
              {serviceImages.length > 1 && (
                <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {serviceImages.slice(1, 3).map((img, idx) => (
                    <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
                      <img src={img} alt={`Detail ${idx+1}`} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Full-width Gold Banner */}
      <div style={{ 
        background: '#c8902a', 
        padding: '50px 0', 
      }}>
        <div className="container">
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20
          }}>
            <div>
              <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 5 }}>Looking for a dream home?</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, margin: 0 }}>We can help you realize your dream of a new home</p>
            </div>
            <div>
              <Link to="/projects" style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#fff',
                color: '#1a1a1a',
                fontWeight: 600,
                fontSize: 15,
                padding: '12px 30px',
                textDecoration: 'none',
                borderRadius: '4px'
              }}>
                Explore Properties <FaArrowRight style={{ marginLeft: '10px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </Fragment>
  );
}
