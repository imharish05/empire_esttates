import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUser, FaRegCommentAlt, FaTimes, FaPaperPlane } from 'react-icons/fa';

const API_PRIMARY = process.env.REACT_APP_API_URL || 'https://empireesttatesapi.freshmindz.in/api';

export default function EnquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    projectIdea: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ text: 'Please enter a valid 10-digit phone number.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    // Endpoints to attempt sequentially in case of CORS / local dev vs prod differences
    const endpoints = Array.from(new Set([
      API_PRIMARY,
      'https://empireesttatesapi.freshmindz.in/api',
      'http://localhost:5000/api'
    ]));

    let success = false;
    let lastResponseMsg = '';

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${endpoint}/contacts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          success = true;
          break;
        } else {
          lastResponseMsg = `Server error (${response.status})`;
        }
      } catch (error) {
        console.warn(`Attempt failed for endpoint ${endpoint}:`, error);
        lastResponseMsg = 'Connection issue';
      }
    }

    if (success) {
      setMessage({ text: 'Thank you! Your enquiry has been sent successfully. Our team will contact you shortly.', type: 'success' });
      setFormData({ firstName: '', lastName: '', phone: '', email: '', projectIdea: '' });

      setTimeout(() => {
        setMessage({ text: '', type: '' });
        onClose();
      }, 2200);
    } else {
      setMessage({ text: `Failed to send enquiry (${lastResponseMsg}). Please try again later.`, type: 'error' });
    }

    setLoading(false);
  };

  return (
    <div
      className="enquiry-modal-backdrop"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <style>{`
        @keyframes modalPopIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .enquiry-modal-card {
          animation: modalPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          display: flex;
          flex-direction: column;
          max-height: calc(90vh - 20px);
          max-height: calc(90dvh - 20px);
          width: 100%;
          max-width: 560px;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }
        .enquiry-modal-header {
          padding: 24px 28px 20px;
          flex-shrink: 0;
          position: relative;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
        }
        .enquiry-modal-body {
          padding: 24px 28px 28px;
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 575px) {
          .enquiry-modal-backdrop {
            padding: 10px !important;
          }
          .enquiry-modal-card {
            max-height: calc(100vh - 20px) !important;
            max-height: calc(100dvh - 20px) !important;
            border-radius: 16px !important;
          }
          .enquiry-modal-header {
            padding: 16px 18px 14px !important;
          }
          .enquiry-modal-header h3 {
            font-size: 18px !important;
            margin-bottom: 4px !important;
          }
          .enquiry-modal-header p {
            font-size: 12px !important;
          }
          .enquiry-modal-body {
            padding: 16px 16px 20px !important;
          }
          .enquiry-field-group {
            margin-bottom: 12px !important;
          }
          .enquiry-field-group label {
            font-size: 11px !important;
            margin-bottom: 4px !important;
          }
          .enquiry-field-group input,
          .enquiry-field-group textarea {
            font-size: 13px !important;
            padding-top: 8px !important;
            padding-bottom: 8px !important;
          }
        }
      `}</style>

      <div
        className="enquiry-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="enquiry-modal-header">
          <button
            onClick={onClose}
            aria-label="Close Enquiry Modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              zIndex: 2
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
          >
            <FaTimes style={{ fontSize: '15px' }} />
          </button>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '20px',
            padding: '3px 10px',
            marginBottom: '8px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }}></span>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#38bdf8', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              GET QUICK ENQUIRY
            </span>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#ffffff', paddingRight: '30px' }}>
            Book a Free Site Visit
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.45 }}>
            Fill in your details below. Our property experts will get back to you within 24 hours.
          </p>
        </div>

        {/* Scrollable Modal Body / Form */}
        <form onSubmit={handleSubmit} className="enquiry-modal-body">
          {message.text && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '13px',
              fontWeight: '600',
              lineHeight: 1.45,
              background: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
              color: message.type === 'success' ? '#166534' : '#991b1b',
              border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
            }}>
              {message.text}
            </div>
          )}

          <div className="row">
            {/* First Name */}
            <div className="col-sm-6 enquiry-field-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                First Name *
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '13px' }} />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="col-sm-6 enquiry-field-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                Last Name *
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '13px' }} />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="col-sm-6 enquiry-field-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                Phone Number *
              </label>
              <div style={{ position: 'relative' }}>
                <FaPhoneAlt style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '12px' }} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-sm-6 enquiry-field-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                Email Address *
              </label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '12px' }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@mail.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>

            {/* Message / Requirement */}
            <div className="col-12 enquiry-field-group mb-3">
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' }}>
                Your Requirements / Message
              </label>
              <div style={{ position: 'relative' }}>
                <FaRegCommentAlt style={{ position: 'absolute', left: '14px', top: '12px', color: '#94a3b8', fontSize: '13px' }} />
                <textarea
                  name="projectIdea"
                  value={formData.projectIdea}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Mention location preference, budget, or plot size..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0284c7'}
                  onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#0284c7',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)',
              transition: 'all 0.25s ease',
              opacity: loading ? 0.8 : 1,
              marginTop: '4px'
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#0369a1'; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#0284c7'; }}
          >
            {loading ? (
              <span>Sending Enquiry...</span>
            ) : (
              <>
                <span>Submit Enquiry</span>
                <FaPaperPlane style={{ fontSize: '14px' }} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
