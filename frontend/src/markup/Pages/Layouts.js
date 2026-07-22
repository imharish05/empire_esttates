import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer2';
import PageTitle from './../Layout/PageTitle';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LayoutCard = ({ item, index, openLightbox }) => {
  return (
    <div 
      className="dlab-box dlab-gallery-box"
      onClick={() => openLightbox(index)}
      style={{ cursor: 'pointer' }}
    >
      <div className="mb-3 text-center">
        <h4 className="dlab-title m-0" style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1a1a', textTransform: 'uppercase' }}>
          {item.title}
        </h4>
      </div>
      <div className="dlab-media rounded" style={{ position: 'relative', height: '320px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
        <img 
          src={item.image || require('./../../images/logo.png')} 
          alt={item.title} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        
      </div>
    </div>
  );
};

const Layouts = () => {
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/layouts`)
      .then(res => res.json())
      .then(data => {
        setLayouts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching layouts:", err);
        setLoading(false);
      });
  }, []);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % lightboxImages.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, lightboxImages.length]);

  return (
    <Fragment>
      <Header isTransparent={true} />
      <div className="page-content bg-white">
        <PageTitle motherMenu="Layouts" activeMenu="Layouts" placement="Layouts Page Banner" />
        
        <div className="content-block" id="page_wrapper">
          <div className="section-full content-inner-2 portfolio text-uppercase bg-gray" id="portfolio">
            <div className="container">
              <div className="site-filters clearfix center m-b40">
                <div className="section-head text-center" style={{ marginBottom: '50px' }}>
                  <p style={{ color: '#c8932e', fontSize: '15px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>
                    OUR LANDS
                  </p>
                  <h2 className="title" style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1.2, margin: 0, marginBottom: '24px', color: '#1a1a1a', textTransform: 'uppercase' }}>
                    EXPLORE LAYOUTS
                  </h2>
                  <span style={{ display: 'inline-block', width: '60px', height: '3px', background: '#c8932e', borderRadius: '2px' }} />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {layouts.length > 0 ? (
                    layouts.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-6 col-sm-6 m-b40">
                        <LayoutCard 
                          item={item}
                          index={index}
                          openLightbox={(idx) => {
                            const allImages = layouts.map(l => ({
                              src: l.image || require('./../../images/logo.png'),
                              title: l.title
                            }));
                            setLightboxImages(allImages);
                            setLightboxIndex(idx);
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted py-5">
                      No layouts found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {lightboxIndex !== null && lightboxImages[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000000',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 25px',
              zIndex: 1000000,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
            }}
          >
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '14px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                letterSpacing: '1px',
                fontWeight: 500,
              }}
            >
              {lightboxIndex + 1} / {lightboxImages.length}
            </span>
            <button
              onClick={closeLightbox}
              aria-label="Close"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '28px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '5px 10px',
                transition: 'color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              &#10005;
            </button>
          </div>
          <button
            onClick={showPrev}
            aria-label="Previous"
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              zIndex: 1000000,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={lightboxImages[lightboxIndex].src}
              alt={lightboxImages[lightboxIndex].title}
              style={{
                maxHeight: '85vh',
                maxWidth: '90vw',
                objectFit: 'contain',
                borderRadius: '2px',
                boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
                transition: 'opacity 0.2s ease-in-out',
              }}
            />
          </div>
          <button
            onClick={showNext}
            aria-label="Next"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              zIndex: 1000000,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Layouts;
