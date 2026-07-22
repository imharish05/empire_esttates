import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Module-level cache — fetched once, reused instantly on re-renders
let homeBannersCache = null;
try {
  const saved = localStorage.getItem('ee_home_banners');
  if (saved) {
    homeBannersCache = JSON.parse(saved);
  }
} catch (e) {}

function filterHomeBanners(data) {
  return data.filter(b => b.active && (
    !b.placement ||
    b.placement === 'Homepage Hero' ||
    b.placement === 'homepage-hero' ||
    b.placement === 'home' ||
    b.placement === 'Home Page Slider'
  ));
}

export default function HomeSlider() {
  const [banners, setBanners] = useState(() => {
    if (homeBannersCache) return homeBannersCache;
    return [];
  });

  useEffect(() => {
    // If already cached, nothing to do
    if (homeBannersCache) return;

    const fetchBanners = async () => {
      try {
        const res = await fetch(`${API_URL}/banners`);
        if (res.ok) {
          const data = await res.json();
          const activeBanners = filterHomeBanners(data);
          if (activeBanners.length > 0) {
            homeBannersCache = activeBanners;
            setBanners(activeBanners);
            try {
              localStorage.setItem('ee_home_banners', JSON.stringify(activeBanners));
            } catch (e) {}
          }
          return;
        }
      } catch (err) {
        console.error('Error fetching banners from backend:', err);
      }
    };

    fetchBanners();
  }, []);

  return (
    <Carousel
      controls={true}
      indicators={true}
      className="home-slider-1"
      interval={5000}
      fade={true}
    >
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <div
            className="banner-three overlay-black-middle"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="container">
              <div className="row align-items-center banner-inner">
                <div className="col-md-6">
                  <div className="content-blog">
                    <div className="banner-content">
                      <h1
                        className="title text-white m-b0"
                        dangerouslySetInnerHTML={{ __html: banner.title.replace(/\n/g, '<br/>') }}
                      />
                    </div>
                    <p
                      className="text-white m-b20"
                      style={{fontSize: "1.1rem", opacity: "0.9", lineHeight: "1.6", marginTop: "25px"}}
                    >
                      {banner.subtitle}
                    </p>
                    <div className="m-b0">
                      <Link to={banner.ctaLink || "/contact-us-1"} className="btn btn-primary">
                        {banner.ctaText || "Learn More"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
