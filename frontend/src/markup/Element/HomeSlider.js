import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}`;

// Static fallback background image (used when no banner.image comes from API)
const HERO_BG_IMAGE = '/images/hero-bg.jpg'; // place your image in public/images/

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

  const [servicesList, setServicesList] = useState(DEFAULT_SERVICES);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Fetch Services from backend
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

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim().length > 0
    ? servicesList.filter(s => {
        const title = (s.title || s.service || '').toLowerCase();
        const cat = (s.category || s.estate || '').toLowerCase();
        const loc = (s.location || '').toLowerCase();
        const q = searchQuery.trim().toLowerCase();
        return title.includes(q) || cat.includes(q) || loc.includes(q);
      })
    : servicesList;

  const handleSelectSuggestion = (srv) => {
    setSearchQuery(srv.title || srv.service);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (!q) {
      history.push('/services-details');
      return;
    }

    const matched = servicesList.find(s =>
      (s.title || s.service || '').toLowerCase().includes(q.toLowerCase()) ||
      (s.category || s.estate || '').toLowerCase().includes(q.toLowerCase()) ||
      (s.location || '').toLowerCase().includes(q.toLowerCase()) ||
      (s.slug || '').toLowerCase().includes(q.toLowerCase())
    );

    if (matched && matched.slug) {
      history.push(`/services-details/${matched.slug}`);
    } else if (matched) {
      history.push('/services-details');
    } else {
      // No service found! Do NOT redirect. Keep dropdown open showing "No services found".
      setShowSuggestions(true);
    }
  };

  const heroBanner = (banners && banners.length > 0) ? banners[0] : {
    id: 'static-banner',
    title: 'Invest In Land,<br/>Invest In Your Future',
    subtitle: 'Premium CMDA & RERA Approved Plots, Individual Houses & Luxury Villas with Unmatched Civil Engineering Excellence.',
    ctaText: 'Explore Projects',
    ctaLink: '/projects',
    image: ''
  };

  return (
    <div className="homepage-hero-static" style={{ position: 'relative', overflow: 'visible', width: '100%', maxWidth: '100%' }}>
      <style>{`
        .homepage-hero-static, .homepage-hero-slide {
          overflow: visible !important;
          overflow-x: clip !important;
          overflow-y: visible !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .homepage-hero-slide {
          min-height: 620px;
          position: relative;
        }
        .homepage-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(${HERO_BG_IMAGE});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #0f172a;
          z-index: 0;
          transition: background-image 0.3s ease;
        }
        .homepage-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,23,42,0.60) 0%, rgba(0,0,0,0.1) 100%);
        }
        .homepage-hero-slide > .container {
          position: relative;
          z-index: 1;
        }
        .homepage-hero-copy {
          margin: 0 !important;
          padding: 0 !important;
        }
        .homepage-hero-slide .banner-content {
          padding: 0 !important;
        }
        .homepage-hero-title {
          font-size: 44px;
          font-weight: 800;
          line-height: 1.25;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .homepage-hero-subtitle {
          font-size: 1.15rem;
          opacity: 0.95;
          line-height: 1.6;
          margin-top: 18px;
          max-width: 520px;
        }
        .homepage-hero-btn-wrap {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
        }
        .homepage-hero-search {
          background: rgba(255, 255, 255, 0.97);
          backdrop-filter: blur(14px);
          border-radius: 20px;
          padding: 34px 32px;
          box-shadow: 0 25px 60px rgba(2, 132, 199, 0.15), 0 10px 35px rgba(0, 0, 0, 0.25);
          border: 1.5px solid rgba(56, 189, 248, 0.3);
          position: relative;
          z-index: 50;
        }
        .homepage-hero-search-suggestions {
          max-height: 95px !important;
          overflow-y: scroll !important;
          scrollbar-width: thin;
          scrollbar-color: #0284c7 #f1f5f9;
        }
        .homepage-hero-search-suggestions::-webkit-scrollbar {
          width: 7px !important;
          display: block !important;
        }
        .homepage-hero-search-suggestions::-webkit-scrollbar-track {
          background: #f1f5f9 !important;
          border-radius: 8px !important;
        }
        .homepage-hero-search-suggestions::-webkit-scrollbar-thumb {
          background: #0284c7 !important;
          border-radius: 8px !important;
        }
        .homepage-hero-search-suggestions::-webkit-scrollbar-thumb:hover {
          background: #0369a1 !important;
        }
        .homepage-hero-search-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media only screen and (max-width: 767px) {
          .homepage-hero-search-row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
        @media only screen and (max-width: 991px) {
          .homepage-hero-slide {
            min-height: auto !important;
            height: auto !important;
            display: block !important;
            padding-top: 85px !important;
            padding-bottom: 45px !important;
          }
          .homepage-hero-slide .banner-inner {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .homepage-hero-bg {
            background-position: center top;
          }
          .homepage-hero-copy {
            margin: 0 !important;
            padding: 0 !important;
          }
          .homepage-hero-title {
            font-size: 28px !important;
            line-height: 1.25 !important;
            margin-bottom: 6px !important;
          }
          .homepage-hero-subtitle {
            font-size: 0.9rem !important;
            line-height: 1.45 !important;
            margin-top: 8px !important;
            margin-bottom: 14px !important;
          }
          .homepage-hero-btn-wrap {
            gap: 10px !important;
            margin-bottom: 14px !important;
          }
          .homepage-hero-btn-wrap .btn {
            padding: 10px 18px !important;
            font-size: 13px !important;
          }
          .homepage-hero-search {
            padding: 20px 18px !important;
            border-radius: 16px !important;
            margin-top: 0 !important;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25) !important;
          }
          .homepage-hero-search-header {
            margin-bottom: 12px !important;
          }
          .homepage-hero-search h3 {
            font-size: 18px !important;
            margin-top: 2px !important;
          }
          .homepage-hero-search-form {
            gap: 10px !important;
          }
          .homepage-hero-search-label {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
          .homepage-hero-search-input {
            padding: 11px 14px 11px 36px !important;
            font-size: 13.5px !important;
            border-radius: 10px !important;
          }
          .homepage-hero-search-btn {
            padding: 11px !important;
            font-size: 14px !important;
            border-radius: 10px !important;
          }
        }
        @media only screen and (max-width: 575px) {
          .homepage-hero-slide {
            padding-top: 80px !important;
            padding-bottom: 40px !important;
          }
          .homepage-hero-bg {
            background-position: 65% center;
          }
          .homepage-hero-title {
            font-size: 22px !important;
            line-height: 1.25 !important;
          }
          .homepage-hero-subtitle {
            font-size: 0.85rem !important;
            margin-top: 6px !important;
            margin-bottom: 12px !important;
          }
          .homepage-hero-btn-wrap {
            gap: 8px !important;
            margin-bottom: 12px !important;
          }
          .homepage-hero-btn-wrap .btn {
            padding: 9px 14px !important;
            font-size: 12px !important;
          }
          .homepage-hero-search {
            padding: 14px 14px !important;
            border-radius: 14px !important;
          }
          .homepage-hero-search-header {
            margin-bottom: 10px !important;
          }
          .homepage-hero-search h3 {
            font-size: 16.5px !important;
          }
          .homepage-hero-search-input {
            padding: 10px 12px 10px 36px !important;
            font-size: 13px !important;
          }
          .homepage-hero-search-btn {
            padding: 10px !important;
            font-size: 13.5px !important;
          }
        }
        @media only screen and (max-width: 400px) {
          .homepage-hero-btn-wrap {
            flex-direction: column;
            width: 100%;
          }
          .homepage-hero-btn-wrap .btn {
            width: 100%;
          }
        }
      `}</style>
      <div
        className="banner-three homepage-hero-slide"
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background layer: API banner image wins if present, else static fallback image set in CSS */}
        <div
          className="homepage-hero-bg"
          style={heroBanner.image ? { backgroundImage: `url(${heroBanner.image})` } : {}}
        ></div>

        <div className="container">
          <div className="row align-items-center banner-inner" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
            <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
              <div className="content-blog homepage-hero-copy">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '30px', padding: '6px 14px', marginBottom: '14px', maxWidth: '100%',
                  animation: 'revealUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 10px #38bdf8', flexShrink: 0 }}></span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#e0f2fe', letterSpacing: '1.2px', textTransform: 'uppercase', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                   Construction Excellence
                  </span>
                </div>

                <div className="banner-content" style={{ animation: 'revealUp 0.72s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}>
                  <h1 className="title text-white m-b0 homepage-hero-title">
                    Invest In Land,<br />
                    <span className="text-animated-gradient">Invest In Your Future</span>
                  </h1>
                </div>
                <p className="text-white m-b20 homepage-hero-subtitle" style={{ animation: 'revealUp 0.72s cubic-bezier(0.16,1,0.3,1) 0.38s both' }}>
                  {heroBanner.subtitle || 'Premium CMDA & RERA Approved Plots, Individual Houses & Luxury Villas with Unmatched Civil Engineering Excellence.'}
                </p>
                <div className="m-b0 homepage-hero-btn-wrap" style={{ animation: 'revealUp 0.72s cubic-bezier(0.16,1,0.3,1) 0.52s both' }}>
                  <Link 
                    to={heroBanner.ctaLink || "/projects"} 
                    className="btn" 
                    style={{ 
                      background: '#0284c7', 
                      color: '#ffffff',
                      padding: '14px 34px', 
                      fontWeight: '700', 
                      borderRadius: '8px',
                      boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: 'none'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(56, 189, 248, 0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.4)'; }}
                  >
                    {heroBanner.ctaText || "Explore Projects"}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12">
              <div 
                ref={searchBoxRef}
                className="homepage-hero-search"
                style={{ animation: 'revealRight 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}
              >
                <div className="homepage-hero-search-header" style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0f9ff', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '20px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
                      EXPLORE OUR SERVICES
                    </span>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: 0, marginTop: '4px' }}>
                    Find What You're Looking For
                  </h3>
                </div>

                <form className="homepage-hero-search-form" onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Service Search Input */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        className="homepage-hero-search-input"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search plot sales, villa layouts..."
                        style={{
                          width: '100%',
                          padding: '14px 16px 14px 42px',
                          borderRadius: '12px',
                          border: '1.5px solid #cbd5e1',
                          background: '#ffffff',
                          color: '#0f172a',
                          fontSize: '14px',
                          fontWeight: '600',
                          outline: 'none',
                          transition: 'all 0.25s ease',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}
                      />
                      <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0284c7', fontSize: '15px', pointerEvents: 'none' }} />
                    </div>

                    {showSuggestions && (
                      <ul
                        className="homepage-hero-search-suggestions"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: '#ffffff',
                          borderRadius: '14px',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.22), 0 6px 16px rgba(2, 132, 199, 0.15)',
                          border: '1.5px solid rgba(56, 189, 248, 0.4)',
                          listStyle: 'none',
                          // padding: '6px 0',
                          // margin: '8px 0 0',
                          maxHeight: '205px',
                          overflowY: 'scroll',
                          WebkitOverflowScrolling: 'touch',
                          overscrollBehavior: 'contain',
                          touchAction: 'pan-y',
                          zIndex: 9999
                        }}
                      >
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((srv, idx) => (
                            <li
                              key={srv.id || idx}
                              onClick={() => handleSelectSuggestion(srv)}
                              style={{
                                padding: '10px 16px',
                                fontSize: '13.5px',
                                fontWeight: '600',
                                color: '#1e293b',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottom: idx < filteredSuggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                                transition: 'background 0.2s, color 0.2s'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f9ff'; e.currentTarget.style.color = '#0284c7'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#1e293b'; }}
                            >
                              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', marginRight: '8px' }}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {srv.title || srv.service}
                                </span>
                                {srv.location && (
                                  <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '600', marginTop: '2px' }}>
                                    📍 {srv.location}
                                  </span>
                                )}
                              </div>
                              <span style={{ fontSize: '10.5px', background: 'rgba(56, 189, 248, 0.12)', color: '#0284c7', padding: '3px 8px', borderRadius: '12px', fontWeight: '700', flexShrink: 0 }}>
                                {srv.category || 'Service'}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li
                            style={{
                              padding: '14px 16px',
                              fontSize: '13.5px',
                              fontWeight: '600',
                              color: '#ef4444',
                              textAlign: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              userSelect: 'none'
                            }}
                          >
                            <span>⚠️</span>
                            <span>No services found</span>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="homepage-hero-search-btn"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(56, 189, 248, 0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(2, 132, 199, 0.35)'; }}
                  >
                    <FaSearch style={{ fontSize: '16px' }} />
                    Search Services
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
