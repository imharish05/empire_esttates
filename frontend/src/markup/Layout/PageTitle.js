import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import defaultFaqBanner from '../../images/banner/faq_banner.jpg';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Module-level cache — fetched once, reused on every page navigation
let bannersCache = null;
try {
  const cached = localStorage.getItem('ee_banners_v2') || localStorage.getItem('ee_banners');
  if (cached) {
    bannersCache = JSON.parse(cached);
  }
} catch (e) {}

function findBanner(allBanners, placement, motherMenu) {
  if (!Array.isArray(allBanners) || allBanners.length === 0) return null;
  const liveBanners = allBanners.filter(b => b && b.active !== false);

  // Search through liveBanners (or reverse if order is ASC)
  const matched = liveBanners.find(b => {
    const bPlace = (b.placement || '').trim().toLowerCase();
    const pReq = (placement || '').trim().toLowerCase();
    const mReq = (motherMenu || '').trim().toLowerCase();

    if (pReq && bPlace === pReq) return true;
    if (mReq && bPlace === mReq) return true;
    if (pReq && (pReq.includes('faq') || pReq.includes('faqs')) && (bPlace.includes('faq') || bPlace.includes('faqs'))) return true;
    if (pReq && pReq.includes('project') && bPlace.includes('project')) return true;
    if (pReq && pReq.includes('about') && bPlace.includes('about')) return true;
    if (pReq && pReq.includes('service') && bPlace.includes('service')) return true;
    if (pReq && pReq.includes('contact') && bPlace.includes('contact')) return true;
    if (pReq && pReq.includes('layout') && bPlace.includes('layout')) return true;
    if (pReq && pReq.includes('elevation') && bPlace.includes('elevation')) return true;
    if (pReq && pReq.includes('blog') && bPlace.includes('blog')) return true;
    if (mReq && bPlace.includes(mReq)) return true;
    return false;
  });

  return matched || null;
}

const PageTitle = ({ motherMenu, activeMenu, placement, className = '' }) => {
  // If cache already available, resolve banner immediately (no loading flash)
  const [banner, setBanner] = useState(() => {
    if (bannersCache) return findBanner(bannersCache, placement, motherMenu);
    return null;
  });
  const [loading, setLoading] = useState(!bannersCache);

  useEffect(() => {
    const fetchBanners = async () => {
      let data = null;
      try {
        const res = await fetch(`${API_URL}/banners`);
        if (res.ok) {
          data = await res.json();
        }
      } catch (err) {
        console.error("Failed to fetch page banner from backend:", err);
      }

      // If backend was unreachable or empty, fallback to local storage
      if (!Array.isArray(data) || data.length === 0) {
        try {
          const cached = localStorage.getItem('ee_banners_v2') || localStorage.getItem('ee_banners');
          if (cached) data = JSON.parse(cached);
        } catch (e) {}
      }

      if (Array.isArray(data) && data.length > 0) {
        bannersCache = data;
        try {
          localStorage.setItem('ee_banners_v2', JSON.stringify(data));
        } catch (e) {}
        const matched = findBanner(data, placement, motherMenu);
        setBanner(matched || null);
      }
      setLoading(false);
    };

    fetchBanners();
  }, [motherMenu, placement]);

  // Render immediately to prevent layout shift, background will update when fetched

  const getBannerUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http') || img.startsWith('data:')) return img;
    // ensure no double slashes if img starts with /
    return img.startsWith('/') ? `${API_URL}${img}` : `${API_URL}/${img}`;
  };

  let bgImageUrl = '';
  if (banner && banner.image) {
    bgImageUrl = getBannerUrl(banner.image);
  } else if (
    (placement && (placement.toLowerCase().includes('faq') || placement.toLowerCase().includes('faqs'))) ||
    (motherMenu && (motherMenu.toLowerCase().includes('faq') || motherMenu.toLowerCase().includes('faqs')))
  ) {
    bgImageUrl = defaultFaqBanner;
  }

  const bgStyle = bgImageUrl ? {
    backgroundImage: `url(${bgImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  } : {};

  return (
    <div className={`dlab-bnr-inr ${className}`.trim()} style={{ position: 'relative', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...bgStyle }}>
      {/* Light subtle gradient overlay for maximum image brightness */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.28) 0%, rgba(15, 23, 42, 0.15) 100%)',
        zIndex: 1,
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="dlab-bnr-inr-entry anim-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%' }}>
          
          {/* Light Blue Accent Pill Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '30px', padding: '5px 14px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#e0f2fe', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              EMPIRE ESTATES
            </span>
          </div>

          <h1 style={{ color: '#ffffff', fontSize: '38px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', textShadow: '0 4px 20px rgba(0,0,0,0.6)', textAlign: 'center', letterSpacing: '0.5px' }}>
            {banner && banner.title ? banner.title : motherMenu}
          </h1>

          {/* Gradient Divider */}
          <div style={{ width: '50px', height: '3px', background: 'linear-gradient(90deg, #38bdf8, #0284c7)', borderRadius: '2px', marginBottom: '14px' }}></div>

          {banner && banner.subtitle && (
            <p style={{ color: '#ffffff', fontSize: '15px', marginTop: '0', marginBottom: '16px', opacity: 0.95, textShadow: '0 1px 4px rgba(0,0,0,0.8)', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
              {banner.subtitle}
            </p>
          )}

          <nav aria-label="breadcrumb" className="breadcrumb-row" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <ul className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)', padding: '6px 20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.15)', margin: 0 }}>
              <li className="breadcrumb-item">
                <Link to={"/"} style={{ color: '#ffffff', textDecoration: 'none', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.8)', fontWeight: '500' }}>
                  <svg style={{ width: '14px', height: '14px', marginRight: '6px', fill: '#ffffff', display: 'inline-block', verticalAlign: '-1px' }} viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: '#38bdf8', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{activeMenu}</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
