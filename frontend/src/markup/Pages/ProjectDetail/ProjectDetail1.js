import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'; 
import Header from './../../Layout/Header';
import Footer2 from './../../Layout/Footer2';
import PageTitle from './../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';
import { VideoPopup2 } from './../../Element/VideoPopup';

// Static fallbacks
import img2Fallback from './../../../images/projects/img2.jpg';
import pic2Fallback from './../../../images/gallery/pic5.jpg';
import gallery3Fallback from './../../../images/gallery/gallery-6/pic3.jpg';
import gallery4Fallback from './../../../images/gallery/gallery-6/pic4.jpg';
import img3Fallback from './../../../images/projects/img3.jpg';
import { FaPlay } from '../../../icons';

// Light Gallery on icon click 
const Iconimage = props => {
  const { openLightbox } = useLightbox();
  return (
    <Link to={"#"} onClick={() => openLightbox(props.imageToOpen)} className="lightimg">
      <i className="ti-zoom-in icon-bx-xs"></i>
    </Link>
  );
};

const OverlayBlog = ({ imageType }) => {
  return (
    <div className="dlab-box gallery-box-2">
      <div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
        <img src={imageType} alt="" style={{ height: '550px', width: '100%', objectFit: 'cover' }} /> 
        <div className="overlay-bx">
          <Iconimage imageToOpen={imageType} />
        </div>
      </div>
    </div>
  );
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ProjectDetail1() {
  const [project, setProject] = useState(null);

  // Load project details dynamically
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const slug = searchParams.get('slug');
    if (!slug) return;

    const fetchProjectDetails = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects/slug/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
          return;
        } else {
          throw new Error('Backend failed to return project details');
        }
      } catch (err) {
        console.error('Error fetching project by slug from backend API. Trying localStorage fallback.', err);
      }

      // LocalStorage / hardcoded fallbacks
      const saved = localStorage.getItem('ee_projects_v3');
      let loadedProjects = [];
      if (saved) {
        try {
          loadedProjects = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse projects from localStorage", e);
        }
      }

      if (!loadedProjects || loadedProjects.length === 0) {
        loadedProjects = [
          { 
            id: 1, 
            name: 'The Sovereign Residences', 
            location: 'Manhattan, NY', 
            status: 'ACTIVE', 
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
            client: 'Martin Stewart',
            architect: 'Jimmy Smith',
            size: '1,200 m²',
            type: 'Residential Project',
            slug: 'the-sovereign-residences'
          }
        ];
      }

      let currentProj = loadedProjects.find(p => p.slug === slug);
      if (!currentProj) {
        currentProj = loadedProjects[0];
      }

      setProject(currentProj);
    };

    fetchProjectDetails();
  }, []);

  useEffect(() => {
    if (project) {
      const fallbackTitle = `${project.name} | Empire Estates`;
      const fallbackDesc = project.description || '';
      applyMetaTags(fallbackTitle, fallbackDesc);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="font-semibold text-neutral-400">Loading dynamic listing details...</p>
      </div>
    );
  }

  const detailBlog = [
    { icon: <i className="ti ti-user" />, title: 'CLIENT', subtitle: project.client || 'N/A' },
    { icon: <i className="ti ti-user" />, title: 'ARCHITECT', subtitle: project.architect || 'N/A' },
    { icon: <i className="ti ti-location-pin" />, title: 'LOCATION', subtitle: project.location || 'N/A' },
    { icon: <i className="ti ti-ruler-alt-2" />, title: 'SIZE', subtitle: project.size || 'N/A' },
    { icon: <i className="ti ti-home" />, title: 'TYPE', subtitle: project.type || 'N/A' },
  ];

  return (
    <Fragment>
      <Header isTransparent={true} />
      <div className="page-content bg-white" id="lightgallery">
        <PageTitle motherMenu="Project Detail" activeMenu={project.name} />
        
        <SimpleReactLightbox>
          <SRLWrapper>
            {/* Banner Media Block */}
            <div className="section-full content-inner-1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 mfp-gallery">
                    <OverlayBlog imageType={project.image} />
                  </div>
                </div>
              </div>
            </div>

            {/* Video Callout Block */}
            <section className="section-full content-inner-2 overlay-black-middle video-bx" style={{ backgroundImage: "url(" + img2Fallback + ")", backgroundSize: "cover" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 text-center text-white">
                    <div className="video-play">
                      <VideoPopup2 />
                    </div>
                    <h2 className="video-title text-white">{project.name}</h2>
                    <p className="video-content">Experience bespoke architectural design, structured layouts, and top-tier interior styling.</p>
                    <Link to={"/contact-us-1"} className="btn btn-primary radius-xl"><span className="text-black">Contact us</span></Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Additional Project Gallery Decoration */}
            <div className="section-full content-inner-2">
              <div className="container">
                <div className="row our-gallery mfp-gallery">
                  <div className="col-lg-12 col-md-12 col-sm-12 m-b30">
                    <div className="dlab-box gallery-box-2">
                      <div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
                        <img src={pic2Fallback} alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} /> 
                        <div className="overlay-bx">
                          <Iconimage imageToOpen={pic2Fallback} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 m-sm-b30">
                    <div className="dlab-box gallery-box-2">
                      <div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
                        <img src={gallery3Fallback} alt="" style={{ height: '280px', width: '100%', objectFit: 'cover' }} /> 
                        <div className="overlay-bx">
                          <Iconimage imageToOpen={gallery3Fallback} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 m-sm-b30">
                    <div className="dlab-box gallery-box-2">
                      <div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
                        <img src={gallery4Fallback} alt="" style={{ height: '280px', width: '100%', objectFit: 'cover' }} /> 
                        <div className="overlay-bx">
                          <Iconimage imageToOpen={gallery4Fallback} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Structured Specifications & Descriptive Texts Block */}
            <section className="section-full content-inner">
              <div className="container">
                <div className="row">
                  <div className="col-lg-5 m-b30">
                    <div className="section-head mb-3 text-left">
                      <p className="text-[#B8860B] font-bold uppercase text-xs tracking-wider">PROJECT DETAILS</p>
                      <h4 className="title font-bold text-neutral-900 leading-tight">
                        Authentic Specifications for {project.name}
                      </h4>
                    </div>
                    <p className="m-b40 text-left text-neutral-600">
                      This dynamic estate listing features ultra-luxury materials, high-quality finishes, and curated floorplans. Managed and verified by the Empire Estates registry.
                    </p>
                    <div className="text-left">
                      <a href="https://www.youtube.com/watch?v=Dj6CKxQue7U" className="popup-youtube m-r20 video btn btn-primary btn-video">
                        <FaPlay /><span></span>
                      </a>
                      <Link to={"/contact-us-1"} className="btn btn-primary">Contact us</Link>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="m-b30 mfp-gallery">
                      <div className="dlab-box gallery-box-2">
                        <div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
                          <img src={img3Fallback} alt="" style={{ height: '400px', width: '100%', objectFit: 'cover' }} /> 
                          <div className="overlay-bx">
                            <Iconimage imageToOpen={img3Fallback} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Specifications Grid */}
                    <div className="row widget widget_getintuch widget_getintuch-pro-details m-lr0 select-none">
                      {detailBlog.map((data, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-4 col-sm-6 p-lr0" key={index}>
                          <div className="pro-details text-left">
                            {data.icon}
                            <strong className="text-neutral-400 font-bold uppercase tracking-wider block text-[10px]">{data.title}</strong> 
                            <span className="text-neutral-800 text-xs font-semibold">{data.subtitle}</span>
                          </div>
                        </div>
                      ))}	
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </SRLWrapper>
        </SimpleReactLightbox>
      </div>	
      <Footer2 />		
    </Fragment>
  );
}

export function GallerySection() {
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 m-b30" >
        <OverlayBlog imageType={pic2Fallback} />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 m-sm-b30 " >
        <OverlayBlog imageType={gallery3Fallback} />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 m-sm-b30 " >
        <OverlayBlog imageType={gallery4Fallback} />
      </div>
    </>
  );
}
