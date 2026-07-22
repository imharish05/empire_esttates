import React from 'react';
import { Link } from 'react-router-dom';
import { footerConfig } from './footerConfig';
import logowhite from './../../images/logo.png'; 
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
const Footer2 = () => {
    return (
        <footer className="site-footer modern-footer" id="footer" style={{ background: '#2c323f', color: 'rgba(255, 255, 255, 0.9)', paddingTop: '0px', borderTop: '4px solid rgba(0,0,0,0.15)' }}>
            {/* Middle Section: Multi-column Links */}
            <div className="footer-middle-section" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
                <div className="container-fluid" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                    <div className="row">
                        {/* Column 1: Logo */}
                        <div className="col-lg col-md-6 mb-4 mb-lg-0">
                            <div className="footer-logo mb-4" style={{ maxWidth: '200px' }}>
                                <Link to="/"><img src={logowhite} alt="Empire Estates Logo" style={{ width: '180px', borderRadius: '6px', filter: 'none' }} /></Link>
                            </div>
                            <p style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                fontSize: '14px', 
                                lineHeight: '1.6', 
                                marginTop: '15px',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}>
                                {footerConfig.about.description}
                            </p>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="col-lg col-md-6 mb-4 mb-lg-0 pl-lg-4">
                            <h5 style={{ color: '#fff', fontWeight: '600', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '15px' }}>Quick Navigation</h5>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {footerConfig.quickLinks.map((link, index) => (
                                    <li key={index} style={{ marginBottom: '12px' }}>
                                        <Link 
                                            to={link.url} 
                                            style={{ 
                                                color: 'rgba(255, 255, 255, 0.8)', 
                                                textDecoration: 'none', 
                                                fontSize: '14px', 
                                                transition: 'color 0.3s',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                            onMouseEnter={(e) => e.target.style.color = '#ffe8cf'}
                                            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Column 4: Contact Details */}
                        <div className="col-lg col-md-6 mb-4 mb-lg-0">
                            <h5 style={{ color: '#fff', fontWeight: '600', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '15px' }}>Contact Details</h5>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px', fontSize: '14px', lineHeight: '1.5', color: 'rgba(255, 255, 255, 0.8)' }}>
                                    <FaMapMarkerAlt style={{ color: '#c8902a', fontSize: '18px', marginRight: '12px', marginTop: '3px', minWidth: '18px' }} />
                                    <span>{footerConfig.contact.address}</span>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '14px' }}>
                                    <FaPhoneAlt style={{ color: '#c8902a', fontSize: '16px', marginRight: '12px', minWidth: '16px' }} />
                                    <a href={`tel:${footerConfig.contact.phone}`} style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffe8cf'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>+91 {footerConfig.contact.phone}</a>
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', fontSize: '14px' }}>
                                    <FaEnvelope style={{ color: '#c8902a', fontSize: '16px', marginRight: '12px', minWidth: '16px' }} />
                                    <a href={`mailto:${footerConfig.contact.email}`} style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#ffe8cf'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>{footerConfig.contact.email}</a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 5: Social Media */}
                        <div className="col-lg col-md-12">
                            <h5 style={{ color: '#fff', fontWeight: '600', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '15px' }}>Social Media</h5>
                            <div className="footer-socials d-flex flex-wrap" style={{ gap: '10px' }}>
                                <a href={footerConfig.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#3b5998'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}><SocialIcon type="facebook" /></a>
                                <a href={footerConfig.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e1306c'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}><SocialIcon type="instagram" /></a>
                                <a href={footerConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#25d366'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}><SocialIcon type="whatsapp" /></a>
                                <a href={footerConfig.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon-btn" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'all 0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#ff0000'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; }}><SocialIcon type="youtube" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright, Payment Icons */}
            <div className="footer-bottom-section" style={{ padding: '30px 0', fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <div className="container-fluid" style={{ paddingLeft: '5%', paddingRight: '5%' }}>
                    <div className="row align-items-center">
                        {/* Copyright */}
                        <div className="col-12 text-center">
                            <span>
                                &copy; {new Date().getFullYear()} {footerConfig.about.logoText}. All Rights Reserved.
                                <span style={{ margin: '0 10px', opacity: 0.5 }}>|</span>
                                Crafted with ❤️ by <a target="_blank" rel="noopener noreferrer" href={footerConfig.designedBy.url} style={{ color: '#fff', textDecoration: 'underline', fontWeight: '500' }} onMouseEnter={(e) => e.target.style.color = '#ffe8cf'} onMouseLeave={(e) => e.target.style.color = '#fff'}>{footerConfig.designedBy.text}</a>
                            </span>
                        </div>


                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ type }) => {
    const common = {
        width: 20,
        height: 20,
        viewBox: '0 0 24 24',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        style: { display: 'block' },
        'aria-hidden': true,
    };

    if (type === 'facebook') {
        return (
            <svg {...common}>
                <path d="M14 8.2V6.9c0-.7.3-1.1 1.2-1.1h1.5V3.2c-.7-.1-1.5-.2-2.2-.2-2.3 0-3.9 1.4-3.9 4v1.2H8v2.9h2.6V21H14v-9.9h2.4l.4-2.9H14z" fill="currentColor" />
            </svg>
        );
    }

    if (type === 'instagram') {
        return (
            <svg {...common}>
                <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="2" />
                <circle cx="16.7" cy="7.3" r="1.1" fill="currentColor" />
            </svg>
        );
    }

    if (type === 'whatsapp') {
        return (
            <svg {...common}>
                <path d="M5.2 19l1-3.3A7.5 7.5 0 1 1 9 18.2L5.2 19z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9.2 8.4c.2-.4.4-.5.8-.5h.5c.2 0 .5.1.6.5l.6 1.4c.1.3 0 .6-.2.8l-.5.5c.7 1.2 1.7 2.2 3 2.8l.6-.6c.2-.2.5-.3.8-.1l1.4.7c.3.2.4.4.4.7v.4c0 .5-.3.9-.8 1-3 .5-7.4-3.4-7.7-6.5 0-.4.2-.8.5-1.1z" fill="currentColor" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <rect x="3" y="6" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M10 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" />
        </svg>
    );
};

export default Footer2;
