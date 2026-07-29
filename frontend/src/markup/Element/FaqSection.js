import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaPhoneAlt, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';

const API_BASE = process.env.REACT_APP_API_URL || 'https://empireesttatesapi.freshmindz.in';
const API_URL = `${API_BASE}`;

const FALLBACK_FAQS = [
  {
    id: 1,
    question: 'Are all your plot layouts CMDA & RERA approved?',
    answer: 'Yes, 100% of our residential layout developments are fully approved by CMDA / DTCP and registered under RERA, ensuring clear legal titles, approved road widths, and hassle-free registration.',
    category: 'Legal & Approvals',
    active: true
  },
  {
    id: 2,
    question: 'Do you provide bank loan assistance for plot purchase?',
    answer: 'Absolutely! We have tie-ups with leading nationalized and private banks (including SBI, HDFC, ICICI, and Axis Bank) to provide quick and easy home/plot loan approvals up to 80-90% of the property value.',
    category: 'Financing & Loans',
    active: true
  },
  {
    id: 3,
    question: 'What amenities are included in your gated community layouts?',
    answer: 'Our developments feature blacktop avenue roads, LED street lighting, 24/7 security with CCTV monitoring, underground drainage, avenue trees, children park areas, and grand entrance archways.',
    category: 'Plots & Layouts',
    active: true
  },
  {
    id: 4,
    question: 'Can I construct a villa immediately after purchasing a plot?',
    answer: 'Yes! All our plot layouts are ready-to-build with clear demarcations, electricity connections, and water supply infrastructure ready for immediate residential construction.',
    category: 'Plots & Layouts',
    active: true
  },
  {
    id: 5,
    question: 'How do I schedule a site visit with Empire Estates?',
    answer: 'You can easily schedule a complimentary site visit by submitting our Enquire Now form, calling our dedicated support desk at +91 88254 71748, or sending us a message on WhatsApp.',
    category: 'General',
    active: true
  },
  {
    id: 6,
    question: 'Are there any hidden costs in property purchase?',
    answer: 'No. Empire Estates follows a 100% transparent pricing policy. All pricing breakdown including plot price, registration fees, and legal charges are clearly documented upfront.',
    category: 'Legal & Approvals',
    active: true
  }
];

export default function FaqSection({ limit, showHeader = true, title = "Frequently Asked Questions", subtitle = "GOT QUESTIONS? WE HAVE ANSWERS" }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/faqs?activeOnly=true`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch FAQs');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqs(data);
          setOpenId(data[0]?.id || null);
        } else {
          setFaqs(FALLBACK_FAQS);
          setOpenId(FALLBACK_FAQS[0]?.id || null);
        }
      })
      .catch(err => {
        console.error('Error fetching FAQs:', err);
        setFaqs(FALLBACK_FAQS);
        setOpenId(FALLBACK_FAQS[0]?.id || null);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayedFaqs = limit ? faqs.slice(0, limit) : faqs;

  const toggleAccordion = (id) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section className="faq-section-wrap" style={{ padding: '80px 0', background: '#f8fafc', position: 'relative' }}>
      <style>{`
        .faq-tab-btn {
          padding: 10px 22px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 13px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .faq-tab-btn:hover {
          border-color: #0284c7;
          color: #0284c7;
        }
        .faq-tab-btn.active {
          background: #0284c7;
          color: #ffffff;
          border-color: #0284c7;
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.3);
        }
        .faq-card-item {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }
        .faq-card-item:hover {
          border-color: #cbd5e1;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.07);
        }
        .faq-card-item.is-open {
          border-color: #0284c7;
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.12);
        }
        .faq-header-button {
          width: 100%;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          gap: 16px;
        }
        .faq-question-text {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          margin: 0;
          flex: 1;
        }
        .faq-card-item.is-open .faq-question-text {
          color: #0284c7;
        }
        .faq-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0284c7;
          transition: transform 0.3s ease, background-color 0.3s ease;
          flex-shrink: 0;
        }
        .faq-card-item.is-open .faq-icon-wrap {
          transform: rotate(180deg);
          background: #0284c7;
          color: #ffffff;
        }
        .faq-body-content {
          padding: 0 24px 22px 24px;
          color: #475569;
          font-size: 15px;
          line-height: 1.7;
          border-top: 1px solid transparent;
        }
        .faq-card-item.is-open .faq-body-content {
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
        }
      `}</style>

      <div className="container">
        {showHeader && (
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span style={{ color: '#0284c7', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {subtitle}
              </span>
              <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {title}
              </h2>
              <div style={{ margin: '15px auto 0', background: '#0284c7', height: '4px', width: '60px', borderRadius: '2px' }}></div>
            </div>
          </div>
        )}

        {/* Accordion List */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {loading ? (
              <div className="text-center py-5" style={{ color: '#64748b' }}>
                Loading FAQs...
              </div>
            ) : displayedFaqs.length === 0 ? (
              <div className="text-center py-5 bg-white rounded-3 shadow-sm border border-slate-200">
                <FaQuestionCircle style={{ fontSize: '36px', color: '#94a3b8', marginBottom: '12px' }} />
                <h5 style={{ color: '#0f172a', fontWeight: 700 }}>No matching questions found</h5>
                <p style={{ color: '#64748b', fontSize: '14px' }}>Try searching with different keywords or switch categories.</p>
              </div>
            ) : (
              displayedFaqs.map(faq => {
                const isOpen = openId === faq.id;
                return (
                  <div key={faq.id} className={`faq-card-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="faq-header-button"
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <div className="faq-icon-wrap">
                        <FaChevronDown style={{ fontSize: '12px' }} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="faq-body-content">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* View All button if limited */}
            {limit && faqs.length > limit && (
              <div className="text-center mt-4">
                <Link
                  to="/faqs"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0284c7',
                    color: '#ffffff',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                    transition: 'all 0.3s'
                  }}
                >
                  View All FAQs <FaArrowRight />
                </Link>
              </div>
            )}

            {/* Help & Contact Card */}
            {!limit && (
              <div
                style={{
                  marginTop: '40px',
                  background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  borderRadius: '16px',
                  padding: '36px 32px',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  boxShadow: '0 12px 35px rgba(15, 23, 42, 0.2)',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <h4 style={{ color: '#ffffff', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>
                    Still have questions?
                  </h4>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, maxWidth: '500px' }}>
                    Our property experts are available to guide you through site visits, documentation, and layout options.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a
                    href="tel:+918825471748"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#0284c7',
                      color: '#ffffff',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    <FaPhoneAlt style={{ fontSize: '13px' }} /> Call +91 88254 71748
                  </a>
                  <Link
                    to="/contact-us"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '700',
                      fontSize: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
