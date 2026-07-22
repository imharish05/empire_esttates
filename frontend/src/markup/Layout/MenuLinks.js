import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE}`;

export default function MenuLinks({ mobileMode }) {
  const [categories, setCategories] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch services');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const uniqueCategories = [];
          const seen = new Set();
          for (const srv of data) {
            const catName = srv.category || srv.estate || 'Other';
            if (!seen.has(catName)) {
              seen.add(catName);
              uniqueCategories.push({
                name: catName,
                slug: srv.slug || (srv.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
              });
            }
          }
          if (uniqueCategories.length > 0) {
            setCategories(uniqueCategories);
          }
        }
      })
      .catch(err => {
        console.error("Error fetching services for navbar:", err);
      });
  }, []);

  // Reset dropdown when route changes
  useEffect(() => {
    setServicesOpen(false);
    setProjectsOpen(false);
  }, [location.pathname, location.search]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  if (mobileMode) {
    // ── Mobile accordion-style links ──
    return (
      <ul className="mobile-nav-links">
        <li>
          <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/about-us" className={isActive('/about') ? 'active' : ''}>About</Link>
        </li>
        <li className="mobile-nav-links__has-sub">
          <button
            className={`mobile-nav-links__toggle${servicesOpen ? ' is-open' : ''}`}
            onClick={(e) => { e.stopPropagation(); setServicesOpen(o => !o); }}
            aria-expanded={servicesOpen}
          >
            <span>Services</span>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <ul className={`mobile-nav-links__sub${servicesOpen ? ' is-open' : ''}`}>
            {categories.map((cat, idx) => (
              <li key={idx}>
                <Link to={`/services-details/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mobile-nav-links__has-sub">
          <button
            className={`mobile-nav-links__toggle${projectsOpen ? ' is-open' : ''}`}
            onClick={(e) => { e.stopPropagation(); setProjectsOpen(o => !o); }}
            aria-expanded={projectsOpen}
          >
            <span>Projects</span>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          <ul className={`mobile-nav-links__sub${projectsOpen ? ' is-open' : ''}`}>
            <li>
              <Link to="/projects?filter=completed">All Projects</Link>
            </li>
            <li>
              <Link to="/projects?filter=ongoing">Ongoing Projects</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/layouts" className={isActive('/layouts') ? 'active' : ''}>Layouts</Link>
        </li>
        <li>
          <Link to="/elevation" className={isActive('/elevation') ? 'active' : ''}>Elevation</Link>
        </li>
        <li>
          <Link to="/blogs" className={isActive('/blogs') ? 'active' : ''}>Blogs</Link>
        </li>
        <li>
          <Link to="/contact-us" className={isActive('/contact') ? 'active' : ''}>Contact Us</Link>
        </li>
      </ul>
    );
  }

  // ── Desktop hover-style links ──
  return (
    <ul className="nav navbar-nav navbar">
      {/* Home */}
      <li className={isActive('/') ? 'active' : ''}>
        <Link to="/">Home</Link>
      </li>

      {/* About */}
      <li className={isActive('/about') ? 'active' : ''}>
        <Link to="/about-us">About</Link>
      </li>

      {/* Services - Dropdown */}
      <li className={isActive('/services') ? 'active' : ''}>
        <Link to="#">
          Services{' '}
          <svg style={{ width: '12px', height: '12px', marginLeft: '4px', fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </Link>
        <ul className="sub-menu">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <Link to={`/services-details/${cat.slug}`}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Projects - Dropdown */}
      <li className={isActive('/projects') ? 'active' : ''}>
        <Link to="#">
          Projects{' '}
          <svg style={{ width: '12px', height: '12px', marginLeft: '4px', fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }} viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </Link>
        <ul className="sub-menu">
          <li>
            <Link to="/projects">All Projects</Link>
          </li>
          <li>
            <Link to="/ongoing-projects">Ongoing Projects</Link>
          </li>
        </ul>
      </li>
      
      {/* Layouts */}
      <li className={isActive('/layouts') ? 'active' : ''}>
        <Link to="/layouts">Layouts</Link>
      </li>

      {/* Elevations */}
      <li className={isActive('/elevation') ? 'active' : ''}>
        <Link to="/elevation">Elevation</Link>
      </li>

      {/* Blogs */}
      <li className={isActive('/blogs') ? 'active' : ''}>
        <Link to="/blogs">Blogs</Link>
      </li>

      {/* Contact Us */}
      <li className={isActive('/contact') ? 'active' : ''}>
        <Link to="/contact-us">Contact Us</Link>
      </li>
      
      {/* Sub-menu override styles */}
      <style>{`
        /* Normal State Dropdown (Grey) */
        .studio1-nav-pill .sub-menu {
          background-color: #2c323f !important;
          border-radius: 4px;
        }
        .studio1-nav-pill .sub-menu li a {
          color: #ffffff !important;
          font-weight: 500 !important;
        }
        .studio1-nav-pill .sub-menu li a::before {
          background: #ffffff !important;
        }
        .studio1-nav-pill .sub-menu li a:hover {
          color: #c8902a !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .studio1-nav-pill .sub-menu li:hover > a::before {
          background: #c8902a !important;
        }

        /* Fixed Sticky State Dropdown (Gold) */
        .studio1-sticky-menu .sub-menu {
          background-color: #c8902a !important;
          border-radius: 4px;
        }
        .studio1-sticky-menu .sub-menu li a {
          color: #111111 !important;
          font-weight: 600 !important;
        }
        .studio1-sticky-menu .sub-menu li a::before {
          background: #111111 !important;
        }
        .studio1-sticky-menu .sub-menu li a:hover {
          color: #ffffff !important;
          background-color: rgba(0, 0, 0, 0.1) !important;
        }
        .studio1-sticky-menu .sub-menu li:hover > a::before {
          background: #ffffff !important;
        }
      `}</style>
    </ul>
  );
}
