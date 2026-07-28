import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Header from './../Layout/Header';
import Footer2 from './../Layout/Footer2';
import PageTitle from './../Layout/PageTitle';
import { applyMetaTags } from '../../utils/meta';
import ScrollRevealInit from '../../utils/ScrollRevealInit';
import dpic1 from './../../images/blog/default/pic1.jpg';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySlug = queryParams.get('slug');
  const searchParam = queryParams.get('search');
  const categoryParam = queryParams.get('category');
  const slug = pathSlug || querySlug;

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Fetch all services for the sidebar
        const res = await fetch(`${API_URL}/services`);
        if (!res.ok) throw new Error('Failed to fetch services');
        const all = await res.json();
        setAllServices(all);
        
        if (slug) {
          const current = all.find(s => s.slug === slug);
          if (current) {
             setService(current);
          } else {
             const r = await fetch(`${API_URL}/services/slug/${slug}`);
             if (r.ok) {
               setService(await r.json());
             } else if (all[0]) {
               setService(all[0]);
             }
          }
        } else if (searchParam || categoryParam) {
          const term = (searchParam || categoryParam || '').toLowerCase();
          const matched = all.find(s => 
            (s.title && s.title.toLowerCase().includes(term)) ||
            (s.service && s.service.toLowerCase().includes(term)) ||
            (s.category && s.category.toLowerCase().includes(term)) ||
            (s.estate && s.estate.toLowerCase().includes(term)) ||
            (s.slug && s.slug.toLowerCase().includes(term))
          );
          if (matched) {
            setService(matched);
          } else if (all[0]) {
            setService(all[0]);
          }
        } else {
          if (all[0]) setService(all[0]);
        }
        setError(null);
      } catch (e) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, [slug, location.search, searchParam, categoryParam]);

  useEffect(() => {
    if (service) applyMetaTags(
      `${service.title || service.service} | Empire Estates`,
      service.description || ''
    );
  }, [service]);

  if (loading) return (
    <Fragment>
      <Header isTransparent={false} />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 44, height: 44, border: '3px solid #f0ebe1', borderTopColor: '#0284c7', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
      <Footer2 />
    </Fragment>
  );

  if (error || !service) return (
    <Fragment>
      <Header isTransparent={false} />
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#c0392b' }}>{error || 'Service not found'}</p>
        <Link to="/" style={{ color: '#0284c7', fontWeight: 600 }}>Back to Home</Link>
      </div>
      <Footer2 />
    </Fragment>
  );

  const imgs = getImagesArray(service.images);
  const serviceImages = imgs.length ? imgs : [dpic1];

  return (
    <Fragment>
      <ScrollRevealInit />
      <Header isTransparent={false} />
      <PageTitle motherMenu="Services" activeMenu={service.title || service.service} placement="Services Details Banner" />

      <div style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div className="row">
            
            {/* ── LEFT COLUMN (Main Content) ── */}
            <div className="col-lg-8 mb-5 mb-lg-0">
              
              {/* Main Large Image */}
              <div className="reveal-img img-zoom-wrap" style={{ marginBottom: 35, borderRadius: '8px', overflow: 'hidden' }}>
                 <img src={serviceImages[0]} alt={service.title || service.service} style={{ width: '100%', height: 450, objectFit: 'cover' }} />
              </div>

              {/* Service Title */}
              <h2 className="reveal-left" style={{ fontSize: 32, fontWeight: 700, color: '#0284c7', marginBottom: 20 }}>
                {service.title || service.service}
              </h2>

              {/* Description with Drop Cap */}
              <div className="reveal-up delay-1" style={{ color: '#666', fontSize: 16, lineHeight: 1.8, marginBottom: 30, display: 'flow-root', textAlign: 'justify' }}>
                {service.description ? (
                  <p style={{ textAlign: 'justify' }}>
                    <span style={{ 
                      float: 'left', 
                      fontSize: 40, 
                      lineHeight: '70px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      background: '#0284c7',
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
                   <p style={{ textAlign: 'justify' }}>No description available for this service.</p>
                )}
              </div>

              {/* Services Included Section */}
              {(() => {
                let list = [];
                const value = service.servicesIncluded;
                if (value) {
                  if (Array.isArray(value)) {
                    list = value;
                  } else if (typeof value === 'string') {
                    const trimmed = value.trim();
                    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                      try {
                        const parsed = JSON.parse(trimmed);
                        list = Array.isArray(parsed) ? parsed : [parsed];
                      } catch (e) {
                        try {
                          const unescaped = trimmed.replace(/\\"/g, '"');
                          const parsed = JSON.parse(unescaped);
                          if (Array.isArray(parsed)) {
                            list = parsed;
                          }
                        } catch (err) {
                          list = trimmed.slice(1, -1).split(',').map(s => s.trim());
                        }
                      }
                    } else {
                      list = value.split(',').map(s => s.trim());
                    }
                  }
                }

                list = list
                  .map(item => {
                    if (!item) return '';
                    let cleaned = String(item).trim();
                    let prev;
                    do {
                      prev = cleaned;
                      cleaned = cleaned.replace(/^\\*"/, '').replace(/\\*"$/, '');
                      cleaned = cleaned.replace(/^\\*'/, '').replace(/\\*'$/, '');
                      cleaned = cleaned.replace(/^\["?|"?\]$/g, '');
                      cleaned = cleaned.trim();
                    } while (cleaned !== prev);
                    
                    cleaned = cleaned.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\/g, '');
                    return cleaned;
                  })
                  .filter(Boolean);

                if (list.length === 0) return null;
                
                return (
                  <div className="reveal-up delay-2" style={{ marginTop: 50, marginBottom: 50 }}>
                    <h3 style={{ fontSize: 28, fontWeight: 700, color: '#0284c7', marginBottom: 25, borderBottom: '2px solid #f0f0f0', paddingBottom: '15px' }}>
                      <span style={{ color: '#0284c7' }}>Services</span> Included
                    </h3>
                    <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', listStyle: 'none', padding: 0 }}>
                      {list.map((item, idx) => (
                        <li key={idx} className={`reveal-up delay-${(idx % 4) + 1}`} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          color: '#333', 
                          fontSize: 15,
                          fontWeight: 500,
                          padding: '14px 18px',
                          background: '#fff',
                          border: '1px solid #eee',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                          transition: 'all 0.3s ease',
                          cursor: 'default'
                        }}
                        onMouseEnter={(e) => { 
                          e.currentTarget.style.borderColor = '#0284c7';
                          e.currentTarget.style.transform = 'translateY(-3px)'; 
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(2,132,199,0.15)';
                          e.currentTarget.style.color = '#0284c7';
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
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: '#0284c7',
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
            <div className="col-lg-4 reveal-right pl-lg-5">
              
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
                            background: isActive ? 'linear-gradient(135deg, #0284c7 0%, #0284c7 100%)' : '#f8fafc',
                            color: isActive ? '#fff' : '#1e293b',
                            padding: '18px 25px',
                            fontWeight: 700,
                            fontSize: 14,
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            borderRadius: '10px',
                            border: isActive ? 'none' : '1px solid #e2e8f0',
                            boxShadow: isActive ? '0 6px 20px rgba(2, 132, 199, 0.3)' : 'none'
                          }}
                        >
                          {s.title || s.service}
                          <FaArrowRight style={{ color: isActive ? '#fff' : '#0284c7', fontSize: 14 }} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Sidebar Additional Images */}
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

      {/* Full-width Primary Blue Banner */}
      <div style={{ 
        background: '#0284c7',
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
                color: '#0284c7',
                fontWeight: 700,
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
