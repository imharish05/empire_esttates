import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}`;

const DEFAULT_SERVICES = [
  { id: 1, title: 'Premium Individual Homes', category: 'Individual House', slug: 'premium-individual-homes' },
  { id: 2, title: 'Luxury Villas', category: 'Luxury Villas', slug: 'luxury-villas' },
  { id: 3, title: 'Modern Flats', category: 'Modern Flats', slug: 'modern-flats' },
  { id: 4, title: 'Gated Community Plots', category: 'Plot Sales', slug: 'gated-community-plots' },
  { id: 5, title: 'Commercial Spaces', category: 'Commercial', slug: 'commercial-spaces' },
  { id: 6, title: 'Construction & Interior', category: 'Construction', slug: 'construction-interior' },
];

let homeBannersCache = null;
try {
  const saved = localStorage.getItem('ee_home_banners');
  if (saved) {
    homeBannersCache = JSON.parse(saved);
  }
} catch (e) {}

function filterHomeBanners(data) {
  if (!Array.isArray(data)) return [];
  return data.filter(b => b && b.active !== false && (
    !b.placement ||
    b.placement === 'Homepage Hero' ||
    b.placement === 'homepage-hero' ||
    b.placement === 'home' ||
    b.placement === 'Home Page Slider' ||
    b.placement === 'Home Page'
  ));
}

export default function HomeSlider() {
  const history = useHistory();
  const [banners, setBanners] = useState(() => {
    if (homeBannersCache) return homeBannersCache;
    return [];
  });

  // Services list for dropdown select
  const [servicesList, setServicesList] = useState(DEFAULT_SERVICES);
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_URL}/banners`);
        if (res.ok) {
          const data = await res.json();
          const activeBanners = filterHomeBanners(data);
          if (activeBanners.length > 0) {
            homeBannersCache = activeBanners;
            setBanners(activeBanners);
            try {
              localStorage.setItem('ee_home_banners', JSON.stringify(activeBanners));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);

  // Fetch Services from backend for dropdown
  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      })
      .catch(err => console.error('Error fetching services for search:', err));
  }, []);

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setSelectedService(val);
    if (val) {
      const matched = servicesList.find(s => s.slug === val || (s.title || s.service) === val);
      if (matched && matched.slug) {
        history.push(`/services-details/${matched.slug}`);
      } else {
        history.push(`/services-details?search=${encodeURIComponent(val)}`);
      }
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (selectedService) {
      const matched = servicesList.find(s => s.slug === selectedService || (s.title || s.service) === selectedService);
      if (matched && matched.slug) {
        history.push(`/services-details/${matched.slug}`);
      } else {
        history.push(`/services-details?search=${encodeURIComponent(selectedService)}`);
      }
    } else {
      history.push('/services-details');
    }
  };

  return (
    <div className="homepage-hero" style={{ position: 'relative' }}>
      <Carousel
        controls={true}
        indicators={true}
        className="home-slider-1"
        interval={5000}
        fade={true}
      >
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <div
              className="banner-three overlay-black-middle homepage-hero-slide"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div className="container">
                <div className="row align-items-center banner-inner" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
                  <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                    <div className="content-blog homepage-hero-copy">
                      <div className="banner-content">
                        <h1
                          className="title text-white m-b0"
                          style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.2' }}
                          dangerouslySetInnerHTML={{ __html: banner.title.replace(/\n/g, '<br/>') }}
                        />
                      </div>
                      <p
                        className="text-white m-b20"
                        style={{ fontSize: "1.1rem", opacity: "0.9", lineHeight: "1.6", marginTop: "25px" }}
                      >
                        {banner.subtitle}
                      </p>
                      <div className="m-b0">
                        <Link to={banner.ctaLink || "/contact-us"} className="btn btn-primary" style={{ backgroundColor: '#3b46a2', borderColor: '#3b46a2', padding: '12px 30px', fontWeight: '700', borderRadius: '6px' }}>
                          {banner.ctaText || "Learn More"}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Hero Banner Single Search Input Box */}
                  <div className="col-lg-6 col-md-12">
                    <div 
                      className="homepage-hero-search"
                      style={{
                        background: 'rgba(255, 255, 255, 0.96)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '32px 30px',
                        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        position: 'relative',
                        zIndex: 10
                      }}
                    >
                      <div style={{ marginBottom: '22px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#3b46a2', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '4px' }}>
                          Explore Our Services
                        </span>
                        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          Find What You're Looking For
                        </h3>
                      </div>

                      <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        
                        {/* Service Dropdown Select */}
                        <div style={{ position: 'relative' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                            Search Services or Categories
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select
                              value={selectedService}
                              onChange={handleSelectChange}
                              style={{
                                width: '100%',
                                padding: '14px 40px 14px 44px',
                                borderRadius: '10px',
                                border: '1.5px solid #cbd5e1',
                                background: '#ffffff',
                                color: selectedService ? '#1e293b' : '#64748b',
                                fontSize: '14px',
                                fontWeight: '500',
                                outline: 'none',
                                cursor: 'pointer',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                              }}
                            >
                              <option value="">e.g. Plot Sales, Villa Layouts, Modular Kitchen...</option>
                              {Object.entries(
                                servicesList.reduce((acc, srv) => {
                                  const cat = srv.category || srv.estate || 'General Services';
                                  if (!acc[cat]) acc[cat] = [];
                                  acc[cat].push(srv);
                                  return acc;
                                }, {})
                              ).map(([category, items]) => (
                                <optgroup key={category} label={category}>
                                  {items.map((srv, idx) => (
                                    <option key={srv.id || idx} value={srv.slug || srv.title || srv.service}>
                                      {srv.title || srv.service}
                                    </option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#3b46a2', fontSize: '15px', pointerEvents: 'none' }} />
                            <FaChevronDown style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', fontSize: '12px', pointerEvents: 'none' }} />
                          </div>
                        </div>

                        {/* Search Submit Button */}
                        <button
                          type="submit"
                          style={{
                            width: '100%',
                            padding: '14px',
                            background: '#3b46a2',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '15px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(59, 70, 162, 0.35)',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#2a337a'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#3b46a2'; }}
                        >
                          <FaSearch /> Search Services
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
