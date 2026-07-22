import React, { Fragment, Component, useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import Header from './../../Layout/Header';
import Footer2 from './../../Layout/Footer2';
import PageTitle from './../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';

import gallery1 from './../../../images/gallery/pic1.jpg';
import gallery2 from './../../../images/gallery/pic2.jpg';
import gallery3 from './../../../images/gallery/pic3.jpg';
import gallery4 from './../../../images/gallery/pic4.jpg';
import gallery5 from './../../../images/gallery/pic5.jpg';
import gallery6 from './../../../images/gallery/pic6.jpg';

const masonryOptions = {                                          
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

const TagLi = ({ name, handlesettag, tagActive }) => {
  return (
    <li 
      style={{ 
        display: 'inline-block', 
        margin: '5px 8px', 
        cursor: 'pointer' 
      }} 
      onClick={() => handlesettag(name)}
    >
      <span
        style={{
          display: 'inline-block',
          padding: '8px 24px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          background: tagActive ? '#c8902a' : '#ffffff',
          color: tagActive ? '#ffffff' : '#333333',
          border: tagActive ? '1px solid #c8902a' : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: tagActive ? '0 5px 15px rgba(200, 144, 42, 0.25)' : 'none',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
      >
        {name}
      </span>
    </li>
  );
};

function ProjectCard({ item, index, onClick, isFullSize }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <li 
      data-category="abstract" 
      className={`card-container ${!isFullSize ? 'col-lg-3 col-md-4 col-sm-6' : 'col-lg-4 col-md-6 col-sm-12'} abstract`}
      style={{}}
    >
      <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
        style={{ 
          cursor: 'pointer',
          borderRadius: '8px',
          overflow: 'hidden',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
          position: 'relative',
          background: 'transparent'
        }}
      >
        <div style={{ 
          position: 'relative', 
          display: 'block', 
          overflow: 'hidden', 
          width: '100%',
          height: isFullSize ? '400px' : 'unset',
          aspectRatio: isFullSize ? 'unset' : '1 / 1',
          background: 'transparent',
        }}>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ 
              position: isFullSize ? 'static' : 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%',
              objectFit: isFullSize ? 'contain' : 'cover',
              transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }} 
          />

          {/* Gold Overlay with + symbol on hover - only for completed projects */}
          {!isFullSize && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: hovered ? 'rgba(212, 175, 55, 0.55)' : 'rgba(212, 175, 55, 0)',
              transition: 'all 0.4s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}>
              <span style={{
                color: '#ffffff',
                fontSize: '52px',
                fontWeight: '300',
                lineHeight: 1,
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'scale(1)' : 'scale(0.5)',
                transition: 'all 0.35s ease',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                userSelect: 'none',
              }}>+</span>
            </div>
          )}

        </div>
      </div>
    </li>
  );
}



const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class Portfolio2 extends Component {
  componentDidMount() {
    this.applyMetaTags();
  }

  async applyMetaTags() {
    const fallbackTitle = "Our Best Projects | Empire Estates Portfolio";
    const fallbackDesc = "Explore Empire Estates portfolio. View our premium residential and commercial plot developments.";
    await applyMetaTags(fallbackTitle, fallbackDesc);
  }

  render() {
    return (
      <Fragment>	
        <Header isTransparent={true} />
        <div className="page-content bg-white">
          <PageTitle motherMenu="Project" activeMenu="Project " placement="Projects Page Banner" />
          <PortfolioItem />
        </div>	
        <Footer2 />
      </Fragment>			
    )
  }
} 



function PortfolioItem() {
  const [tag, setTag] = useState('All');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (location.pathname === '/ongoing-projects' || params.get('filter') === 'ongoing') {
      setTag('Ongoing Projects');
      setTimeout(() => {
        const el = document.getElementById('portfolio-gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else if (location.pathname === '/projects' || params.get('filter') === 'completed') {
      setTag('All');
      setTimeout(() => {
        const el = document.getElementById('portfolio-gallery');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [location.search, location.pathname]);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i - 1 + filteredProjects.length) % filteredProjects.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i + 1) % filteredProjects.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + filteredProjects.length) % filteredProjects.length);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % filteredProjects.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredProjects.length]);

  useEffect(() => {
    const loadProjectsData = async () => {
      let loadedProjects = [];
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (res.ok) {
          loadedProjects = await res.json();
          try {
            localStorage.setItem('ee_projects_v3', JSON.stringify(loadedProjects));
          } catch (e) {
            console.warn("Failed to cache projects to localStorage:", e);
          }
        } else {
          throw new Error('Backend returned non-OK status');
        }
      } catch (err) {
        console.error("Failed to fetch from backend, using localStorage fallback", err);
        const saved = localStorage.getItem('ee_projects_v3');
        if (saved) {
          try { loadedProjects = JSON.parse(saved); } catch (e) {}
        }
      }

      // Fallback removed to strictly use backend data
      if (!loadedProjects) {
        loadedProjects = [];
      }

      setProjects(loadedProjects);
    };

    loadProjectsData();
  }, []);

  // Filter by category for completed projects gallery
  useEffect(() => {
    if (tag === 'All') {
      setFilteredProjects(projects.filter(p => (p.category || '').toLowerCase() !== 'ongoing project'));
    } else if (tag === 'Ongoing Projects') {
      setFilteredProjects(projects.filter(p => (p.category || '').toLowerCase() === 'ongoing project'));
    } else {
      setFilteredProjects(projects.filter(p => 
        (p.category || 'Living Room').toLowerCase() === tag.toLowerCase() && (p.category || '').toLowerCase() !== 'ongoing project'
      ));
    }
  }, [tag, projects]);

  // Build unique category list from loaded projects
  const availableCategories = ['All', ...new Set(projects.filter(p => (p.category || '').toLowerCase() !== 'ongoing project').map(p => p.category || 'Living Room'))];

  return (
    <>
      <style>{`
        .card-container {
          padding: 12px !important;
        }
        .portbox1:hover .plus-overlay {
          opacity: 1 !important;
        }
        .dlab-media,
        .dlab-img-overlay1,
        .dlab-img-effect,
        .portbox1,
        .dlab-media img,
        .dlab-img-overlay1 img,
        .dlab-img-effect img,
        .portbox1 img,
        .dlab-media:hover,
        .dlab-img-overlay1:hover,
        .dlab-img-effect:hover,
        .portbox1:hover,
        .dlab-media:hover img,
        .dlab-img-overlay1:hover img,
        .dlab-img-effect:hover img,
        .portbox1:hover img {
          transform: none !important;
          -webkit-transform: none !important;
          transition: none !important;
          -webkit-transition: none !important;
        }
        @keyframes pulseDot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(255, 59, 48, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <section id="portfolio-gallery" className="content-inner-2" data-content="PROJECT" style={{ paddingBottom: '30px' }}>										
        <div className="container">
          <div className="section-head text-center" style={{ marginBottom: '50px' }}>
            <p
              style={{
                color: '#c8932e',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}
            >
              OUR WORKS
            </p>
            <h2
              className="title"
              style={{
                fontSize: '40px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                lineHeight: 1.2,
                margin: 0,
                marginBottom: '24px',
                color: '#1a1a1a',
                textTransform: 'uppercase'
              }}
            >
              {tag === 'Ongoing Projects' ? 'Ongoing Projects' : 'Best Designs'}
            </h2>
            <span
              style={{
                display: 'inline-block',
                width: '60px',
                height: '3px',
                background: '#c8932e',
                borderRadius: '2px',
              }}
            />
          </div>
          {tag !== 'Ongoing Projects' && (
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="site-filters filter-style1 clearfix m-b20">
                  <ul className="filters" data-toggle="buttons">
                    {availableCategories.map(cat => (
                      <TagLi key={cat} name={cat} handlesettag={setTag} tagActive={tag === cat} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}	
        </div>
        <div className="clearfix">
          {tag === 'Ongoing Projects' ? (
            <ul 
              className="gallery text-center portfolio-bx p-l0"
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: '30px', 
                padding: '20px 40px'
              }}
            >
              {filteredProjects.map((item, index) => (	
                <ProjectCard 
                  key={item.id || index}
                  item={item}
                  index={index}
                  isFullSize={true}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLightboxIndex(index);
                  }}
                />
              ))}	
            </ul>
          ) : (
            <ul className="gallery text-center portfolio-bx p-l0">
              <Masonry
                className={'my-gallery-class'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
                imagesLoadedOptions={imagesLoadedOptions}
              >
                {filteredProjects.map((item, index) => (	
                  <ProjectCard 
                    key={item.id || index}
                    item={item}
                    index={index}
                    isFullSize={false}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLightboxIndex(index);
                    }}
                  />
                ))}	
              </Masonry>
            </ul>
          )}
          {filteredProjects.length === 0 && (
            <div className="text-center py-5 text-muted">
              No projects found in this category.
            </div>
          )}
        </div>	
      </section>

      {lightboxIndex !== null && filteredProjects[lightboxIndex] && (
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
          {/* Top Header Bar with Counter and Close Button */}
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
              {lightboxIndex + 1} / {filteredProjects.length}
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

          {/* Previous Arrow Button */}
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

          {/* Centered Image */}
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
              key={filteredProjects[lightboxIndex].id || lightboxIndex}
              src={filteredProjects[lightboxIndex].image}
              alt={filteredProjects[lightboxIndex].name || 'Project image'}
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

          {/* Next Arrow Button */}
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
    </>
  );
}

export { PortfolioItem };
export default Portfolio2;