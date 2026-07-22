import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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

const PageTitle = ({ motherMenu, activeMenu, placement }) => {
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

  const bgStyle = banner && banner.image ? {
    backgroundImage: `url(${getBannerUrl(banner.image)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  } : {};

  return (
    <div className="dlab-bnr-inr" style={{ position: 'relative', ...bgStyle }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        zIndex: 1,
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="dlab-bnr-inr-entry">
          <h1 style={{ color: '#c8902a' }}>{banner && banner.title ? banner.title : motherMenu}</h1>
          {banner && banner.subtitle && (
            <p style={{ color: '#ffffff', fontSize: '15px', marginTop: '6px', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
              {banner.subtitle}
            </p>
          )}
          <nav aria-label="breadcrumb" className="breadcrumb-row">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}><svg style={{ width: '14px', height: '14px', marginRight: '6px', fill: 'currentColor', display: 'inline-block', verticalAlign: '-1px' }} viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{activeMenu}</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;