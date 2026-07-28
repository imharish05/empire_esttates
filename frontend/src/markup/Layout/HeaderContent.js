import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../images/logo.png';
import MenuLinks from './MenuLinks';
import { footerConfig } from './footerConfig';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from '../../icons';
import { FaPaperPlane } from 'react-icons/fa';
import EnquiryModal from '../Element/EnquiryModal';

export default function HeaderContent({ isFixed, isHeaderVisible = true }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const drawerRef = useRef(null);

  // Close drawer on outside click
  useEffect(() => {
    function handleOutside(e) {
      if (
        mobileOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        !e.target.closest('.mobile-hamburger')
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [mobileOpen]);

  const closeDrawer = () => setMobileOpen(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const socials = [
    { href: footerConfig.socials.facebook,  Icon: FaFacebookF,  hover: '#3b5998' },
    { href: footerConfig.socials.instagram, Icon: FaInstagram,  hover: '#e1306c' },
    { href: footerConfig.socials.whatsapp,  Icon: FaWhatsapp,   hover: '#25d366' },
    { href: footerConfig.socials.youtube,   Icon: FaYoutube,    hover: '#ff0000' },
  ];

  return (
    <>
      <div
        className={`single-header-wrapper ${isFixed ? 'is-fixed-sticky' : ''} ${isHeaderVisible ? 'is-scroll-visible' : 'is-scroll-hidden'}`}
      >
        <div className="single-header-container">
          {/* Left: Logo */}
          <div className="single-header-logo">
            <Link to="/" className="single-header-logo-link" aria-label="Empire Estates home">
              <img src={logo} alt="Empire Estates" />
            </Link>
          </div>

          {/* Center: Desktop Navigation Menu */}
          <div className="single-header-nav">
            <MenuLinks />
          </div>

          {/* Right: CTA Button & Mobile Hamburger */}
          <div className="single-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              className="header-cta-btn"
              onClick={() => setModalOpen(true)}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 22px',
                fontWeight: '700',
                fontSize: '13px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0369a1';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(2, 132, 199, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0284c7';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(2, 132, 199, 0.3)';
              }}
            >
              <FaPaperPlane style={{ fontSize: '12px' }} />
              <span>Enquire Now</span>
            </button>

            <button
              className={`mobile-hamburger ${mobileOpen ? 'is-open' : ''}`}
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle navigation menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileOpen && (
          <div className="mobile-nav-overlay" onClick={closeDrawer} />
        )}

        {/* Mobile Drawer */}
        <nav
          ref={drawerRef}
          className={`mobile-nav-drawer ${mobileOpen ? 'mobile-nav-drawer--open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <div className="mobile-nav-drawer__header">
            <Link to="/" onClick={closeDrawer}>
              <img src={logo} alt="Empire Estates" className="mobile-nav-drawer__logo" />
            </Link>
            <button
              onClick={closeDrawer}
              aria-label="Close menu"
              className="mobile-nav-drawer__close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="mobile-nav-drawer__body" onClick={closeDrawer}>
            <MenuLinks mobileMode />
            <button
              onClick={(e) => { e.stopPropagation(); closeDrawer(); setModalOpen(true); }}
              style={{
                width: '100%',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)'
              }}
            >
              <FaPaperPlane style={{ fontSize: '13px' }} />
              <span>Enquire Now</span>
            </button>
          </div>

          <div className="mobile-nav-drawer__footer">
            <p className="mobile-nav-drawer__footer-label">Follow Us</p>
            <div className="mobile-nav-drawer__socials">
              {socials.map(({ href, Icon, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-drawer__social-btn"
                  style={{ '--hover-bg': hover }}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="mobile-nav-drawer__phone">
              <svg viewBox="0 0 24 24" fill="#0284c7" width="16" height="16">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              88254 71748
            </p>
          </div>
        </nav>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

