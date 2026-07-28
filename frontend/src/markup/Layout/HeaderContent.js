import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../images/logo.png';
import MenuLinks from './MenuLinks';
import { footerConfig } from './footerConfig';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from '../../icons';

export default function HeaderContent({ isFixed }) {
  const [mobileOpen, setMobileOpen] = useState(false);
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
<<<<<<< HEAD
    <div className={`single-header-wrapper ${isFixed ? 'is-fixed-sticky' : ''}`}>
      <div className="single-header-container">
        {/* Left: Logo */}
        <div className="single-header-logo">
=======
    <div className={`studio1-header-container${isFixed ? ' is-fixed-sticky' : ''}`}>

      {/* ── TOP ROW ── */}
      <div
        className="studio1-top-row"
        style={isMobile ? {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          padding: '10px 16px',
          marginBottom: 0,
          gap: '8px',
        } : undefined}
      >
        {/* Logo */}
        <div
          className="studio1-logo"
          style={isMobile ? {
            marginLeft: 0,
            flexShrink: 0,
            flexGrow: 0,
          } : undefined}
        >
          <Link to="/">
            <img
              src={logo}
              alt="Empire Estates"
              style={isMobile ? { height: '38px', width: 'auto', maxHeight: '42px' } : undefined}
            />
          </Link>
        </div>

        {/* Branch info block — hidden on mobile via inline style */}
        <div className="studio1-branches" style={isMobile ? { display: 'none' } : undefined}>

          {/* Address */}
          <div className="studio1-branch-item">
            <span className="studio1-branch-icon">
              <svg style={{ width: '18px', height: '18px', fill: '#c8902a' }} viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </span>
            <div>
              <span className="studio1-branch-title">Address:</span>
              <span>{footerConfig.contact.address}</span>
            </div>
          </div>

          {/* Socials */}
          <div className="studio1-branch-item">
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {socials.map(({ href, Icon, hover }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={socialStyle}
                  onMouseEnter={e => (e.currentTarget.style.background = hover)}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                >
                  <Icon style={{ fontSize: '14px' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Phone */}
          <a
            href="tel:8825471748"
            className="studio1-branch-item"
            style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <span className="studio1-branch-icon">
              <svg style={{ width: '18px', height: '18px', fill: '#c8902a' }} viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </span>
            <div>
              <span className="studio1-branch-title">Call Us Today:</span>
              <span>88254 71748</span>
            </div>
          </a>

        </div>

        {/* ── HAMBURGER BUTTON (mobile only) ── */}
        <button
          className={`mobile-hamburger${mobileOpen ? ' is-open' : ''}`}
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── DESKTOP PILL NAVBAR — hidden on mobile ── */}
      <div className="studio1-nav-pill-wrapper" style={isMobile ? { display: 'none' } : undefined}>
        <div className="studio1-nav-pill">
          <MenuLinks />
        </div>
      </div>

      {/* ── STICKY SCROLL HEADER (desktop only — hamburger removed, shared from top row) ── */}
      <div className="studio1-sticky-bar">
        <div className="studio1-sticky-logo">
>>>>>>> d561b4e1d65a38ef2b932f5dd23a886820b149f0
          <Link to="/">
            <img src={logo} alt="Empire Estates" />
          </Link>
        </div>

        {/* Center: Desktop Navigation Menu */}
        <div className="single-header-nav">
          <MenuLinks />
        </div>



        {/* Mobile Hamburger Button */}
        <button
          className={`mobile-hamburger ${mobileOpen ? 'is-open' : ''}`}
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span /><span /><span />
        </button>
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
<<<<<<< HEAD
          <p className="mobile-nav-drawer__phone">
            <svg viewBox="0 0 24 24" fill="#3b46a2" width="16" height="16">
=======
          <a
            href="tel:8825471748"
            className="mobile-nav-drawer__phone"
            style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.75)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg viewBox="0 0 24 24" fill="#c8902a" width="16" height="16">
>>>>>>> d561b4e1d65a38ef2b932f5dd23a886820b149f0
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            88254 71748
          </a>
        </div>
      </nav>
    </div>
  );
}
