import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FaSearch } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}`;

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

  // Services list for search input
  const [servicesList, setServicesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

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

  // Fetch Services from backend for search input
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

  // Filter suggestions when user types
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = servicesList.filter(s => {
        const title = (s.title || s.service || '').toLowerCase();
        const cat = (s.category || s.estate || '').toLowerCase();
        const q = query.toLowerCase();
        return title.includes(q) || cat.includes(q);
      });
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Close suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectService = (srv) => {
    setSearchQuery(srv.title || srv.service);
    setShowSuggestions(false);
    if (srv.slug) {
      history.push(`/services-details/${srv.slug}`);
    } else {
      history.push(`/services-details?search=${encodeURIComponent(srv.title || srv.service)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      history.push('/services-details');
      return;
    }
    // Match exact service slug if exists
    const matched = servicesList.find(s => 
      (s.title || s.service || '').toLowerCase() === query.toLowerCase() ||
      (s.category || s.estate || '').toLowerCase() === query.toLowerCase() ||
      (s.slug || '').toLowerCase() === query.toLowerCase()
    );
    if (matched && matched.slug) {
      history.push(`/services-details/${matched.slug}`);
    } else {
      history.push(`/services-details?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
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
              className="banner-three overlay-black-middle"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: '620px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div className="container">
                <div className="row align-items-center banner-inner" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
                  <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                    <div className="content-blog">
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
                      ref={searchBoxRef}
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
                        
                        {/* Single Search Input with Autocomplete */}
                        <div style={{ position: 'relative' }}>
                          <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                            Search Services or Categories
                          </label>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={handleInputChange}
                              placeholder="e.g. Plot Sales, Villa Layouts, Modular Kitchen..."
                              style={{
                                width: '100%',
                                padding: '14px 18px 14px 44px',
                                borderRadius: '10px',
                                border: '1.5px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#1e293b',
                                fontSize: '14px',
                                fontWeight: '500',
                                outline: 'none',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                              }}
                              onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true); }}
                            />
                            <FaSearch style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#3b46a2', fontSize: '15px' }} />
                          </div>

                          {/* Autocomplete Dropdown */}
                          {showSuggestions && suggestions.length > 0 && (
                            <ul
                              style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: '#ffffff',
                                borderRadius: '10px',
                                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                                border: '1px solid #e2e8f0',
                                listStyle: 'none',
                                padding: '6px 0',
                                margin: '6px 0 0',
                                maxHeight: '240px',
                                overflowY: 'auto',
                                zIndex: 100
                              }}
                            >
                              {suggestions.map((srv, idx) => (
                                <li
                                  key={idx}
                                  onClick={() => handleSelectService(srv)}
                                  style={{
                                    padding: '12px 18px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#1e293b',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottom: idx < suggestions.length - 1 ? '1px solid #f1f5f9' : 'none'
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#3b46a2'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1e293b'; }}
                                >
                                  <span>{srv.title || srv.service}</span>
                                  <span style={{ fontSize: '11px', background: '#e0e7ff', color: '#3b46a2', padding: '3px 10px', borderRadius: '12px', fontWeight: '600' }}>
                                    {srv.category || 'Service'}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
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
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#2b3582'; }}
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
