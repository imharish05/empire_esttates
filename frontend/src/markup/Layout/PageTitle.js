import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Module-level cache — fetched once, reused on every page navigation
let bannersCache = null;
try {
  const cached = localStorage.getItem('ee_banners');
  if (cached) {
    bannersCache = JSON.parse(cached);
  }
} catch (e) {}

function findBanner(allBanners, placement, motherMenu) {
  const liveBanners = allBanners.filter(b => b.active !== false);
  const matched = liveBanners.find(b => {
    const bPlace = (b.placement || '').toLowerCase();
    const pReq = (placement || '').toLowerCase();
    const mReq = (motherMenu || '').toLowerCase();

    if (pReq && bPlace === pReq) return true;
    if (mReq && bPlace.includes(mReq)) return true;
    if (mReq && bPlace.includes('project') && mReq.includes('project')) return true;
    if (mReq && bPlace.includes('about') && mReq.includes('about')) return true;
    if (mReq && bPlace.includes('service') && mReq.includes('service')) return true;
    if (mReq && bPlace.includes('contact') && mReq.includes('contact')) return true;
    if (mReq && bPlace.includes('layout') && mReq.includes('layout')) return true;
    return false;
  });

  if (matched) return matched;

  return null;
}

const PageTitle = ({ motherMenu, activeMenu, placement }) => {
  // If cache already available, resolve banner immediately (no loading flash)
  const [banner, setBanner] = useState(() => {
    if (bannersCache) return findBanner(bannersCache, placement, motherMenu);
    return null;
  });
  const [loading, setLoading] = useState(!bannersCache);

  useEffect(() => {
    // If we have cache, we already set it in useState.
    // Now, fetch latest from background silently to keep it fresh.
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_URL}/banners`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            bannersCache = data;
            try {
              localStorage.setItem('ee_banners_v2', JSON.stringify(data));
            } catch (e) {}
            const matched = findBanner(data, placement, motherMenu);
            // Always set banner after fetch to get new updates
            setBanner(matched || null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch page banner from backend:", err);
      } finally {
        setLoading(false);
      }
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