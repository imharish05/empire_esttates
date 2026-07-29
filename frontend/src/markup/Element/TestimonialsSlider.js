import React, { Component } from 'react';
import Slider from "react-slick";

import grid1 from './../../images/blog/blog-grid/pic1.jpg';
import grid2 from './../../images/blog/blog-grid/pic2.jpg';
import grid3 from './../../images/blog/blog-grid/pic3.jpg';
import { FaQuoteLeft, FaStar } from '../../icons';

const defaultTestimonials = [
  {
    id: 1,
    author: 'Eleanor Vance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'The team at Empire Estates handled my family\'s heritage property with unprecedented grace and surgical precision. Their attention to legal detail and the personal touch they brought to the administration phase was truly world-class. I cannot recommend their concierge services enough.',
    tags: ['HERITAGE ESTATE', 'CONCIERGE CLIENT'],
    title: 'Bespoke heritage property administration and concierge management',
    date: 'June 12, 2026',
    slug: 'eleanor-vance',
    focusKeyphrase: 'heritage estate administration',
    seoTitle: 'Eleanor Vance Testimonial | Heritage Estate Administration',
    metaDescription: 'Read Eleanor Vance\'s review on Empire Estates\' concierge services, heritage estate management, and legal administration services.',
    metaKeywords: 'eleanor vance review, heritage estate management, concierge estate services',
    canonicalUrl: 'https://empire-estates.com/testimonials/eleanor-vance'
  },
  {
    id: 2,
    author: 'Arthur Penhaligon',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'The automated reporting for the estate\'s portfolio has given us incredible peace of mind. Truly a bespoke digital experience.',
    tags: ['DIGITAL INTEGRATION'],
    title: 'Automated estate portfolio reporting and Bespoke digital experiences',
    date: 'June 08, 2026',
    slug: 'arthur-penhaligon',
    focusKeyphrase: 'automated estate reporting',
    seoTitle: 'Arthur Penhaligon Testimonial | Bespoke Portfolio Reporting',
    metaDescription: 'Read Arthur Penhaligon\'s review of the automated estate portfolio reporting and bespoke digital integration provided by Empire Estates.',
    metaKeywords: 'arthur palhaligon review, estate reporting, bespoke digital integration',
    canonicalUrl: 'https://empire-estates.com/testimonials/arthur-penhaligon'
  },
  {
    id: 3,
    author: 'Catherine de\' Medici',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'Precise, punctual, and highly confidential. Empire Estates understands the value of privacy in administration.',
    tags: ['SECURE MANAGEMENT'],
    title: 'Highly secure, confidential, and punctual estate management',
    date: 'May 28, 2026',
    slug: 'catherine-de-medici',
    focusKeyphrase: 'confidential estate administration',
    seoTitle: 'Catherine de\' Medici Testimonial | Secure Estate Management',
    metaDescription: 'Read Catherine de\' Medici\'s client review of Empire Estates\' high confidentiality, secure management, and punctual estate administration.',
    metaKeywords: 'catherine de medici review, secure estate administration, confidential property management',
    canonicalUrl: 'https://empire-estates.com/testimonials/catherine-de-medici'
  },
  {
    id: 4,
    author: 'Sanjay Kumar',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'Our experience buying a plot with Empire Estates was amazing. The legal verification was clear and team supported us at every step.',
    tags: ['CLEAR TITLE', 'LEGAL VERIFICATION'],
    title: 'Legally transparent and secure investment. Highly satisfied with Empire Estates.',
    date: 'May 10, 2026',
    slug: 'sanjay-kumar',
    focusKeyphrase: 'legally transparent investment',
    seoTitle: 'Sanjay Kumar Testimonial | Clear Title Legal Plot Verification',
    metaDescription: 'Read Sanjay Kumar\'s review of his plot buying experience with Empire Estates, focusing on clear titles, legal verification, and end-to-end support.',
    metaKeywords: 'sanjay kumar review, clear title plot, legal land verification',
    canonicalUrl: 'https://empire-estates.com/testimonials/sanjay-kumar'
  },
  {
    id: 5,
    author: 'Priya Dharshini',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'The Kannapalayam layout features high-quality wide blacktop roads, secure gated fencing, street lights, and beautiful green parks. It is perfect for immediate villa construction.',
    tags: ['PREMIUM LAYOUT', 'VILLA PLOTS'],
    title: 'Beautiful layouts with ready-to-build premium villa plots.',
    date: 'June 08, 2026',
    slug: 'priya-dharshini',
    focusKeyphrase: 'ready to build villa plots',
    seoTitle: 'Priya Dharshini Testimonial | Ready-to-Build Villa Plots',
    metaDescription: 'Read Priya Dharshini\'s client review of Empire Estates\' premium layouts, secure gated community, parks, and ready-to-build residential plots.',
    metaKeywords: 'priya dharshini review, villa plots layout, gated community land',
    canonicalUrl: 'https://empire-estates.com/testimonials/priya-dharshini'
  },
  {
    id: 6,
    author: 'Amit Sharma',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'Empire Estates provided end-to-end bank loan assistance, helping us secure approval in just a few days. Very cooperative staff who handle everything with high professionalism.',
    tags: ['BANK LOAN', 'REGISTRY ASSISTANCE'],
    title: 'Exceptional support throughout the purchase and registration process.',
    date: 'May 28, 2026',
    slug: 'amit-sharma',
    focusKeyphrase: 'bank loan assistance real estate',
    seoTitle: 'Amit Sharma Testimonial | Fast Bank Loan & Registration Support',
    metaDescription: 'Read Amit Sharma\'s review of the end-to-end bank loan assistance, smooth property registration support, and professional staff at Empire Estates.',
    metaKeywords: 'amit sharma review, bank loan support, property registration assistant',
    canonicalUrl: 'https://empire-estates.com/testimonials/amit-sharma'
  },
  {
    id: 7,
    author: 'Vignesh & Sneha',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    content: 'We purchased two plots in their Padiyanallur layout. The pricing was fair, title deeds clear, and the customer service excellent. A highly recommended developer in Tamil Nadu!',
    tags: ['PADIYANALLUR PLOTS', 'TRUSTED DEVELOPER'],
    title: '100% transparent documentation and excellent location choices.',
    date: 'May 19, 2026',
    slug: 'vignesh-sneha',
    focusKeyphrase: 'trusted developer tamil nadu',
    seoTitle: 'Vignesh & Sneha Testimonial | Transparent Documentation & Fair Pricing',
    metaDescription: 'Read Vignesh & Sneha\'s client review of Empire Estates, highlighting transparent property documentation, clear title deeds, and fair land pricing.',
    metaKeywords: 'vignesh and sneha review, clear title deeds, trusted builder chennai',
    canonicalUrl: 'https://empire-estates.com/testimonials/vignesh-sneha'
  }
];

class TestimonialsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testimonials: defaultTestimonials
    };
  }

  async componentDidMount() {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    try {
      const response = await fetch(`${API_URL}/testimonials?activeOnly=true`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          this.setState({ testimonials: data });
          return;
        }
      }
    } catch (e) {
      console.warn("Backend API fetch for testimonials failed, loading local/fallback data.", e);
    }

    // Fallback logic
    let list = [];
    try {
      const saved = localStorage.getItem('ee_testimonials_v2');
      if (saved) {
        list = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse testimonials from localStorage", e);
    }

    if (!list || list.length === 0) {
      list = defaultTestimonials;
    }

    this.setState({ testimonials: list });
  }

  render() {
    const { testimonials } = this.state;

    const settings = {
      arrows: true,
      slidesToShow: 3,
      speed: 1500,
      navSpeed: 3000,
      infinite: testimonials.length > 3,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            infinite: testimonials.length > 3,
            autoplay: true,
            autoplaySpeed: 5000,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            infinite: testimonials.length > 2,
            autoplay: true,
            autoplaySpeed: 5000,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            infinite: testimonials.length > 1,
            autoplay: true,
            autoplaySpeed: 5000,
          }
        }
      ]
    };

    return (
      <Slider className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-out " {...settings}>
        {testimonials.map((item, index) => {
          return (
            <div className="item p-3" key={item.id || index}>
              <div 
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px 28px',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
                  border: '1px solid rgba(2, 132, 199, 0.12)',
                  height: '100%',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                className="testimonial-card-premium"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <FaQuoteLeft style={{ fontSize: '28px', color: '#0284c7', opacity: '0.3' }} />
                  </div>
                  {item.title && (
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '10px', lineHeight: '1.4' }}>
                      "{item.title}"
                    </h4>
                  )}
                  <p style={{ fontSize: '14px', color: '#475569', fontStyle: 'italic', lineHeight: '1.6', margin: 0, marginBottom: '20px' }}>
                    {item.content}
                  </p>
                </div>
                
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: 'auto' }}>
                  <h5 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{item.author}</h5>
                  <span style={{ fontSize: '12px', color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', display: 'block', marginTop: '3px' }}>
                    {item.designation || (Array.isArray(item.tags) && item.tags.length > 0
                      ? item.tags[0]
                      : typeof item.tags === 'string' && item.tags.trim()
                      ? item.tags.split(',')[0].trim()
                      : 'VERIFIED CLIENT')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    );
  }
}

export default TestimonialsSlider;
