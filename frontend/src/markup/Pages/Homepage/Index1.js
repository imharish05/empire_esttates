import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import WOW from 'wowjs';


import Header from './../../Layout/Header';
import Footer2 from './../../Layout/Footer2';
import { applyMetaTags } from '../../../utils/meta';



import Specifications from './Specifications';
import HomeSlider from './../../Element/HomeSlider';
import aboutImg from './../../../images/about/about.png';
import spec1 from './../../../images/specifications/pic6.jpg';
import spec2 from './../../../images/specifications/pic5.jpg';
import spec3 from './../../../images/specifications/pic4.jpg';

import services1 from './../../../images/projects/gated_plots_aerial.png';
import services2 from './../../../images/projects/plots_entrance.png';
import services3 from './../../../images/projects/plots_park_layout.png';
import services4 from './../../../images/services/pic4.jpg';
import services5 from './../../../images/services/pic5.jpg';
import services6 from './../../../images/services/pic6.jpg';
import services7 from './../../../images/services/pic7.jpg';
import services8 from './../../../images/services/pic8.jpg';
import services9 from './../../../images/services/pic9.jpg';
import services10 from './../../../images/services/pic10.jpg';
import { FaArrowRight, FaShieldAlt, FaRegCalendarAlt, FaMapMarkedAlt, FaHome, FaChartLine, FaMoneyBillWave, FaFileContract, FaUniversity, FaMapMarkerAlt, FaRoad, FaLightbulb, FaTree, FaPhoneAlt, FaStar, FaThumbsUp, FaHandshake, FaClipboardCheck } from 'react-icons/fa';


const getImagesArray = (imagesVal) => {
  if (!imagesVal) return [];
  if (Array.isArray(imagesVal)) return imagesVal;
  if (typeof imagesVal === 'string') {
    try {
      const parsed = JSON.parse(imagesVal);
      if (Array.isArray(parsed)) return parsed;
      return [parsed];
    } catch (e) {
      if (imagesVal.trim().startsWith('data:image/')) {
        return [imagesVal];
      }
      if (imagesVal.trim().startsWith('[')) {
        return [];
      }
      return [imagesVal];
    }
  }
  return [];
};



class Index1 extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			servicesList: [],
			blogsList: [],
			projectsList: [],
			hoveredServiceIndex: null,
			hoveredProjectIndex: null,
			hoveredBlogIndex: null,
			lightboxIndex: null
		};
	}

	componentDidMount(){
		new WOW.WOW().init();
		applyMetaTags("Empire Estates | Premium Land Developments", "Empire Estates offers premium gated community plots, villa layouts, and commercial space developments.");
		
		const API_BASE = process.env.REACT_APP_API_URL || 'https://empireesttatesapi.freshmindz.in';
		const API_URL = `${API_BASE}`;

		// ── Scroll Reveal (IntersectionObserver) ──────────────────────────
		const revealSelectors = [
			'.reveal-up', '.reveal-left', '.reveal-right',
			'.reveal-scale', '.reveal-fade', '.reveal-img',
			'.reveal-badge', '.reveal-line', '.reveal-wipe'
		].join(',');

		this._revealObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					this._revealObserver.unobserve(entry.target);
				}
			});
		}, { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

		// Observe all reveal elements that exist now
		document.querySelectorAll(revealSelectors).forEach(el => this._revealObserver.observe(el));

		// Also observe any that are added dynamically after data loads
		this._revealMutationObserver = new MutationObserver(() => {
			document.querySelectorAll(`${revealSelectors}:not(.is-visible)`).forEach(el => {
				this._revealObserver.observe(el);
			});
		});
		this._revealMutationObserver.observe(document.body, { childList: true, subtree: true });
		// ─────────────────────────────────────────────────────────────────
		
		fetch(`${API_URL}/services`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch services');
				return res.json();
			})
			.then(data => {
				this.setState({ servicesList: data });
			})
			.catch(err => {
				console.error("Error fetching services from backend:", err);
				// Fallback static list in case backend/DB is not accessible
				const fallback = [
					{ id: 1, title: 'Plot Sales & Acquisitions', description: 'Discover premium plots in prime locations with high ROI potential and rapid appreciation.', slug: 'plot-sales' },
					{ id: 2, title: 'Legal & Documentation', description: '100% clear titles, CMDA & RERA approvals, and hassle-free, transparent registration processes.', slug: 'legal-docs' },
					{ id: 3, title: 'Bank Loan Assistance', description: 'Seamless financing options with fast approvals, tied up with top nationalized banks.', slug: 'loan-assistance' },
					{ id: 4, title: 'Infrastructure Development', description: 'Fully developed layouts with blacktop roads, streetlights, and 24/7 gated security.', slug: 'infrastructure' },
					{ id: 5, title: 'Villa Construction', description: 'Turnkey construction services to help you build your custom dream home effortlessly.', slug: 'villa-construction' },
					{ id: 6, title: 'Property Management', description: 'End-to-end maintenance and management of your valuable assets to ensure peace of mind.', slug: 'property-management' }
				];
				this.setState({ servicesList: fallback });
			});

		fetch(`${API_URL}/projects`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch projects');
				return res.json();
			})
			.then(data => {
				const filteredData = (data && Array.isArray(data)) ? data.filter(p => p.category !== 'Ongoing Project') : [];
				this.setState({ projectsList: filteredData.slice(0, 8) });
			})
			.catch(err => {
				console.error("Error fetching projects from backend:", err);
				// Fallback to localStorage if available
				try {
					const saved = localStorage.getItem('ee_projects_v3');
					if (saved) {
						const parsed = JSON.parse(saved);
						const filteredSaved = parsed.filter(p => p.category !== 'Ongoing Project');
						this.setState({ projectsList: filteredSaved.slice(0, 8) });
					}
				} catch (e) {}
			});

		fetch(`${API_URL}/blogs`)
			.then(res => {
				if (!res.ok) throw new Error('Failed to fetch blogs');
				return res.json();
			})
			.then(data => {
				this.setState({ blogsList: data && Array.isArray(data) ? data.slice(0, 10) : [] });
			})
			.catch(err => {
				console.error("Error fetching blogs from backend:", err);
				this.setState({ blogsList: [] });
			});
		
		var GalleryCategory = document.querySelectorAll('.gallery-category .items');
        var GalelryMedia = document.querySelectorAll('.gallery-img img');
       
		var fch = [].slice.call(GalleryCategory);
		var fcMedia = [].slice.call(GalelryMedia);
		
		
        for (var y = 0; y < fch.length; y++) {
            fch[y].addEventListener('click', function () { 
				galleryActive(this);
			});
        }
        
		function galleryActive(current) 
		{
            fcMedia.forEach(el => el.classList.remove('active'));
			
			setTimeout(() => {
				var dataImageBx = current.getAttribute('data-image-bx'); 
				document.querySelector('#'+dataImageBx).classList.add('active');
			}, 100);
		}

		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
		if (this._revealObserver) this._revealObserver.disconnect();
		if (this._revealMutationObserver) this._revealMutationObserver.disconnect();
	}

	handleKeyDown = (e) => {
		const { lightboxIndex, projectsList } = this.state;
		if (lightboxIndex === null) return;
		const list = projectsList || [];
		if (e.key === 'Escape') this.closeLightbox();
		if (e.key === 'ArrowLeft') this.setState(prev => ({ lightboxIndex: (prev.lightboxIndex - 1 + list.length) % list.length }));
		if (e.key === 'ArrowRight') this.setState(prev => ({ lightboxIndex: (prev.lightboxIndex + 1) % list.length }));
	};

	closeLightbox = () => this.setState({ lightboxIndex: null });

	showPrev = (e) => {
		if (e) e.stopPropagation();
		const list = this.state.projectsList || [];
		this.setState(prev => ({ lightboxIndex: (prev.lightboxIndex - 1 + list.length) % list.length }));
	};

	showNext = (e) => {
		if (e) e.stopPropagation();
		const list = this.state.projectsList || [];
		this.setState(prev => ({ lightboxIndex: (prev.lightboxIndex + 1) % list.length }));
	};
	render(){
		const blogSliderSettings = {
			dots: true,
			arrows: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
				{ breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
				{ breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
			]
		};

		return(
			<Fragment>
					
				<Header isTransparent={false} />
				{/* <!-- Main Slider --> */}
				<div className="page-content bg-white" data-content="HOME" id="sidenav_home">
					<HomeSlider />
					{/* <!-- Main Slider End--> */}
					<style>{`
						.about-title-responsive {
							color: #000;
							font-size: 42px;
							font-weight: 800;
							line-height: 1.2;
							margin-bottom: 16px;
						}
						.about-img-responsive {
							width: 100%;
							height: 520px;
							object-fit: cover;
							display: block;
						}
						.about-badge-responsive {
							position: absolute;
							bottom: 30px;
							left: 40px;
							background: rgba(255,255,255,0.96);
							backdrop-filter: blur(10px);
							border-radius: 12px;
							padding: 14px 20px;
							box-shadow: 0 15px 40px rgba(2, 132, 199, 0.2);
							display: flex;
							align-items: center;
							gap: 12px;
							border: 1px solid rgba(56, 189, 248, 0.3);
						}
						.section-title-responsive {
							font-size: 40px;
							font-weight: 800;
							color: #0f172a;
						}
						@media only screen and (max-width: 991px) {
							.about-title-responsive {
								font-size: 32px !important;
							}
							.about-img-responsive {
								height: 380px !important;
							}
							.about-badge-responsive {
								left: 20px !important;
								bottom: 20px !important;
							}
							.section-title-responsive {
								font-size: 32px !important;
							}
							.about-content-col {
								padding-right: 15px !important;
							}
							.about-img-col {
								padding-left: 15px !important;
							}
						}
						@media only screen and (max-width: 575px) {
							.home-section-wrap {
								padding-top: 35px !important;
								padding-bottom: 35px !important;
							}
							.about-title-responsive {
								font-size: 26px !important;
							}
							.about-img-responsive {
								height: 280px !important;
							}
							.about-badge-responsive {
								position: relative !important;
								bottom: auto !important;
								left: auto !important;
								margin-top: 15px;
								width: 100%;
								justify-content: center;
							}
						}
					`}</style>

					{/* Section-3 (About Us - Investment Benefits) */}
					<section className="content-inner about-box home-section-wrap" data-content="ABOUT US" id="sidenav_aboutUs" style={{background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)', padding: '90px 0', position: 'relative', overflow: 'hidden'}}>
						<div className="container" style={{position: 'relative', zIndex: 1}}>
							<div className="row align-items-center">
								{/* Left Content - Benefits */}
								<div className="col-md-7 col-lg-7 about-content-col" style={{paddingRight: '40px'}}>
									<div style={{display: 'inline-block', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '6px 16px', borderRadius: '30px', fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px'}}>
										WHY INVEST WITH US
									</div>
									<h2 className="about-title-responsive reveal-left">
										Invest In Land,<br/><span style={{color: '#0284c7'}}>Invest In Your Future</span>
									</h2>
									<div className="reveal-line" style={{marginBottom: '20px', background: '#0284c7', height: '4px', width: '70px', borderRadius: '2px'}}></div>
									<h5 className="reveal-fade delay-2" style={{color: '#0284c7', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '30px', textTransform: 'uppercase', fontSize: '13px'}}>Premium Plots <span style={{margin: '0 8px', color: '#0284c7'}}>|</span> Trusted Legacy <span style={{margin: '0 8px', color: '#0284c7'}}>|</span> Brighter Tomorrow</h5>
									
									<div className="row mb-4">
										{[
											{ icon: <FaChartLine/>, title: 'HIGH APPRECIATION', desc: 'Land value appreciates consistently over time.' },
											{ icon: <FaShieldAlt/>, title: 'SAFE & SECURE INVESTMENT', desc: 'Land is a tangible asset with minimum risk.' },
											{ icon: <FaHome/>, title: 'BUILD YOUR DREAM HOME', desc: 'Create a space that reflects your lifestyle.' },
											{ icon: <FaMoneyBillWave/>, title: 'LONG-TERM WEALTH CREATION', desc: 'A smart investment today for a better tomorrow.' },
											{ icon: <FaFileContract/>, title: 'CLEAR LEGAL DOCUMENTATION', desc: '100% Transparency with clear titles.' },
											{ icon: <FaUniversity/>, title: 'BANK LOAN ASSISTANCE', desc: 'Easy financing options to make your investment simple.' }
										].map((item, index) => (
											<div className={`col-md-6 mb-4 reveal-up delay-${index + 1}`} key={index} style={{display: 'flex', gap: '15px'}}>
												<div style={{minWidth: '46px', height: '46px', background: '#0284c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '18px', flexShrink: 0, boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)', transition: 'transform 0.3s'}}>
													{item.icon}
												</div>
												<div>
													<h5 style={{color: '#0f172a', fontSize: '14px', fontWeight: '800', marginBottom: '4px'}}>{item.title}</h5>
													<p style={{color: '#64748b', fontSize: '13px', lineHeight: '1.5', margin: 0}}>{item.desc}</p>
												</div>
											</div>
										))}
									</div>

									<Link to={"/about-us"} style={{display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#0284c7', color: '#fff', padding: '14px 34px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(2, 132, 199, 0.35)', transition: 'all 0.3s'}}>
										Discover More <FaArrowRight />
									</Link>
								</div>

								{/* Right Image */}
								<div className="col-md-5 col-lg-5 mt-5 mt-md-0 about-img-col reveal-right" style={{position: 'relative', paddingLeft: '20px'}}>
									<div className="img-zoom-wrap" style={{position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(2, 132, 199, 0.2)'}}>
										<img src={aboutImg} alt="About Empire Estates" className="about-img-responsive" />
										<div style={{position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)'}}></div>
									</div>
									{/* Floating Badge */}
									<div className="about-badge-responsive">
										<div style={{width: '46px', height: '46px', borderRadius: '50%', background: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)', flexShrink: 0}}>
											<FaShieldAlt style={{color: '#fff', fontSize: '20px'}} />
										</div>
										<div>
											<div style={{fontWeight: '800', fontSize: '15px', color: '#0f172a'}}>CMDA &amp; RERA APPROVED</div>
											<div style={{fontSize: '12px', color: '#0284c7', fontWeight: '700'}}>100% Legal &amp; Verified Titles</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Our Services Section (Clean Premium Light Theme) */}
					<section className="content-inner-2 home-section-wrap" data-content="SERVICES" id="sidenav_services" style={{ padding: '90px 0', background: '#ffffff', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
						<div className="container" style={{position: 'relative', zIndex: 1}}>
							<div className="row align-items-center" style={{ marginBottom: '50px' }}>
								<div className="col-lg-8 col-md-12 mb-4 mb-lg-0 text-left reveal-left">
									<p style={{ color: '#0284c7', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>WHAT WE DO</p>
									<h2 className="title" style={{ fontSize: '40px', fontWeight: 800, color: '#0f172a' }}>Our Premium Services</h2>
									<div className="reveal-line" style={{ margin: 0, background: 'linear-gradient(90deg, #0284c7, #0284c7)', height: '4px', width: '70px', borderRadius: '2px' }}></div>
								</div>
								{this.state.servicesList && this.state.servicesList.length > 3 && (
									<div className="col-lg-4 col-md-12 text-lg-right" style={{ textAlign: 'right' }}>
										<Link to="/services-details" style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: '8px',
											background: 'linear-gradient(135deg, #0284c7 0%, #0284c7 100%)',
											color: '#fff',
											padding: '12px 30px',
											borderRadius: '8px',
											fontWeight: 700,
											fontSize: '14px',
											letterSpacing: '0.5px',
											textDecoration: 'none',
											boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
											transition: 'all 0.3s'
										}}>
											View All Services <FaArrowRight />
										</Link>
									</div>
								)}
							</div>
							<div className="row">
								{(this.state.servicesList && this.state.servicesList.length > 0 ? this.state.servicesList : []).slice(0, 3).map((service, index) => {
									let icon = <FaStar />;
									const tLow = (service.title || service.service || '').toLowerCase();
									if (tLow.includes('plot') || tLow.includes('land')) icon = <FaMapMarkedAlt />;
									else if (tLow.includes('legal') || tLow.includes('document')) icon = <FaFileContract />;
									else if (tLow.includes('loan') || tLow.includes('financ')) icon = <FaUniversity />;
									else if (tLow.includes('infrastructure') || tLow.includes('road')) icon = <FaRoad />;
									else if (tLow.includes('construct') || tLow.includes('villa') || tLow.includes('home')) icon = <FaHome />;
									else if (tLow.includes('manage') || tLow.includes('maintain')) icon = <FaHandshake />;
									
									const sImages = getImagesArray(service.images);
									const sImage = sImages.length > 0 ? sImages[0] : null;

									return (
									<div className={`col-lg-4 col-md-6 mb-4 reveal-up delay-${index + 1}`} key={service.id || index}>
										<style>{`
											.service-card-modern:hover .service-img-modern {
												transform: scale(1.08);
											}
										`}</style>
										<div className="service-card-modern" style={{
											background: '#ffffff',
											borderRadius: '16px',
											border: '1px solid #e2e8f0',
											overflow: 'hidden',
											transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)'
										}}
										onMouseEnter={(e) => { 
											e.currentTarget.style.transform = 'translateY(-8px)';
											e.currentTarget.style.borderColor = '#0284c7';
											e.currentTarget.style.boxShadow = '0 20px 45px rgba(2, 132, 199, 0.18)';
										}}
										onMouseLeave={(e) => { 
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.borderColor = '#e2e8f0';
											e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 23, 42, 0.08)';
										}}>
											<Link to={`/services-details/${service.slug}`} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%'}}>
												{/* Card Image Header */}
												<div style={{
													height: '220px',
													width: '100%',
													position: 'relative',
													overflow: 'hidden',
													background: sImage ? '#f8fafc' : 'linear-gradient(135deg, #0284c7 0%, #0284c7 100%)'
												}}>
													{sImage ? (
														<img src={sImage} alt={service.title || service.service} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'}} className="service-img-modern" />
													) : (
														<div style={{
															width: '100%', height: '100%',
															color: '#0284c7',
															display: 'flex', alignItems: 'center', justifyContent: 'center',
															fontSize: '64px',
															transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
														}} className="service-img-modern">
															{icon}
														</div>
													)}
												</div>
												
												{/* Card Content */}
												<div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
													<h4 style={{ 
														fontSize: '20px', 
														fontWeight: 800, 
														color: '#0f172a',
														marginBottom: '12px',
														lineHeight: '1.3'
													}}>
														{service.title || service.service}
													</h4>
													
													<p style={{ 
														color: '#475569', 
														fontSize: '14px', 
														lineHeight: '1.6', 
														margin: 0,
														display: '-webkit-box',
														WebkitLineClamp: 3,
														WebkitBoxOrient: 'vertical',
														overflow: 'hidden',
														flex: 1
													}}>
														{service.description || service.consultationRequirement || 'Discover premium real estate solutions tailored to your unique requirements.'}
													</p>
													
													<div style={{
														marginTop: '22px',
														display: 'flex',
														alignItems: 'center',
														color: '#0284c7',
														fontWeight: 700,
														fontSize: '13px',
														textTransform: 'uppercase',
														letterSpacing: '1px'
													}}>
														Read Details <FaArrowRight style={{marginLeft: '8px'}} />
													</div>
												</div>
											</Link>
										</div>
									</div>
								)})}
							</div>
						</div>
					</section>

					{/* Custom Highlights Section (Warm Champagne & Gold Theme) */}
					<style>{`
						.custom-flip-card {
							background-color: transparent;
							perspective: 1000px;
							height: 330px;
							width: 100%;
						}
						.custom-flip-card-inner {
							position: relative;
							width: 100%;
							height: 100%;
							text-align: center;
							transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
							transform-style: preserve-3d;
						}
						.custom-flip-card:hover .custom-flip-card-inner {
							transform: rotateY(180deg);
						}
						.custom-flip-front, .custom-flip-back {
							position: absolute;
							width: 100%;
							height: 100%;
							-webkit-backface-visibility: hidden;
							backface-visibility: hidden;
							border-radius: 16px;
							padding: 35px 28px;
							box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							background-size: cover;
							background-position: center;
						}
						.custom-flip-front::before {
							content: "";
							position: absolute;
							inset: 0;
							background: linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.85) 100%);
							border-radius: 16px;
							z-index: 1;
						}
						.custom-flip-content {
							position: relative;
							z-index: 2;
						}
						.custom-flip-back {
							transform: rotateY(180deg);
							border-top: 4px solid #a4711e;
							background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
						}
					`}</style>
					<section className="content-inner-2 home-section-wrap" style={{ padding: '90px 0 70px', background: '#f8fafc' }}>
						<div className="container">
							{/* Header Row */}
							<div className="row align-items-center" style={{ marginBottom: '50px' }}>
								<div className="col-lg-8 col-md-12 mb-4 mb-lg-0 reveal-left">
									<div style={{display: 'inline-block', background: 'rgba(2, 132, 199, 0.1)', color: '#0284c7', padding: '6px 16px', borderRadius: '30px', fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px'}}>
										OUR ADVANTAGES
									</div>
									<h2 className="title" style={{ fontSize: '38px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
										Find Your Dream Plot &amp; Build Your Future
									</h2>
									<p className="reveal-fade delay-2" style={{ fontSize: '16px', color: '#64748b', margin: 0 }}>
										Helping you secure high-appreciation land for your unique residential vision.
									</p>
								</div>
								<div className="col-lg-4 col-md-12 text-lg-right" style={{ textAlign: 'left' }}>
									<Link to="/projects" style={{
										display: 'inline-flex',
										alignItems: 'center',
										gap: '8px',
										background: '#0284c7',
										color: '#fff',
										padding: '12px 30px',
										borderRadius: '8px',
										fontWeight: 700,
										fontSize: '14px',
										textDecoration: 'none',
										boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)'
									}}>
										Explore Projects <FaArrowRight />
									</Link>
								</div>
							</div>
							
							{/* Cards Row */}
							<div className="row">
								{/* Card 1 */}
								<div className="col-lg-4 col-md-6 mb-4 reveal-scale delay-1">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services1})` }}>
												<div className="custom-flip-content">
													<div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
														<FaMapMarkedAlt style={{ fontSize: '32px', color: '#38bdf8' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: 0 }}>Strategic Locations</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 800, marginBottom: '14px' }}>Strategic Locations</h4>
													<p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>We select high-growth infrastructure corridors to ensure rapid appreciation and maximum ROI.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								{/* Card 2 */}
								<div className="col-lg-4 col-md-6 mb-4 reveal-scale delay-2">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services2})` }}>
												<div className="custom-flip-content">
													<div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
														<FaShieldAlt style={{ fontSize: '32px', color: '#c9953a' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: 0 }}>CMDA &amp; RERA Approved</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#c9953a', fontSize: '20px', fontWeight: 800, marginBottom: '14px' }}>CMDA &amp; RERA Approved</h4>
													<p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>100% clear titles, verified legal documentation, and full government approval guarantee complete security.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								{/* Card 3 */}
								<div className="col-lg-4 col-md-6 mb-4 reveal-scale delay-3">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services3})` }}>
												<div className="custom-flip-content">
													<div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
														<FaHome style={{ fontSize: '32px', color: '#38bdf8' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, margin: 0 }}>Ready to Build</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#38bdf8', fontSize: '20px', fontWeight: 800, marginBottom: '14px' }}>Ready to Build</h4>
													<p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>Blacktop roads, streetlights, and gated security make every layout fully ready for immediate home construction.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Projects Section (Clean Modern Portfolio) */}
					<section className="content-inner-2" style={{ padding: '90px 0 60px', background: '#ffffff' }}>
						<div className="section-head text-center reveal-up" style={{marginBottom: '40px'}}>
							<span style={{ color: '#0284c7', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>PORTFOLIO</span>
							<h2 className="title" style={{fontSize: '40px', fontWeight: 800, color: '#0f172a'}}>Featured Land Developments</h2>
							<div style={{ margin: '15px auto 0', background: 'linear-gradient(90deg, #0284c7, #0284c7)', height: '4px', width: '60px', borderRadius: '2px' }}></div>
						</div>
						<div className="container-fluid px-0">
							<div className="row m-0 g-0" style={{ rowGap: '16px' }}>
								{(this.state.projectsList && this.state.projectsList.length > 0 ? this.state.projectsList : []).map((project, idx) => {
									const isHovered = this.state.hoveredProjectIndex === idx;
									return (
										<div className="col-12 col-sm-6 col-md-4 col-lg-3 p-0" key={project.id || idx} style={{ fontSize: 0, lineHeight: 0 }}>
											<div 
												onClick={() => this.setState({ lightboxIndex: idx })}
												style={{ display: 'block', fontSize: 0, lineHeight: 0 }}>
												<div 
													onMouseEnter={() => this.setState({ hoveredProjectIndex: idx })}
													onMouseLeave={() => this.setState({ hoveredProjectIndex: null })}
													style={{
														overflow: 'hidden',
														height: '300px',
														cursor: 'pointer',
														position: 'relative'
													}}>
													<img 
														src={project.image} 
														alt={project.name || 'Project'} 
														style={{ 
															display: 'block',
															width: '100%', 
															height: '100%', 
															objectFit: 'cover'
														}}
													/>
													<div
														style={{
															position: 'absolute',
															inset: 0,
															background: 'rgba(15, 23, 42, 0.8)',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															opacity: isHovered ? 1 : 0,
															transition: 'opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
															zIndex: 2
														}}
													>
														<span style={{ color: '#ffffff', fontSize: '56px', fontWeight: '300', userSelect: 'none' }}>+</span>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>

					{/* Section-8 (Latest Blogs - Slate Blue Carousel Section) */}
					<section className="content-inner-2 home-section-wrap" data-content="BLOGS" id="sidenav_blogs" style={{padding: '90px 0', background: '#f8fafc'}}>
						<div className="container">
							<div className="section-head text-center reveal-up" style={{marginBottom: '50px'}}>
								<span style={{color: '#0284c7', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>OUR INSIGHTS</span>
								<h2 className="title" style={{fontSize: '40px', fontWeight: 800, color: '#0f172a', margin: 0}}>Latest Blogs &amp; Market News</h2>
								<div style={{margin: '15px auto 0', background: '#0284c7', height: '4px', width: '60px', borderRadius: '2px'}}></div>
							</div>
							<div className="blog-slider-wrapper">
								<Slider className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-out" {...blogSliderSettings}>
								{(this.state.blogsList || []).map((blog, idx) => {
									const isHovered = this.state.hoveredBlogIndex === idx;
									return (
										<div key={blog.id || idx} className="item p-3">
											<div style={{
												background: '#ffffff',
												borderRadius: '16px',
												overflow: 'hidden',
												boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
												border: '1px solid rgba(226, 232, 240, 0.8)',
												height: '100%',
												display: 'flex',
												flexDirection: 'column',
												transition: 'all 0.35s ease',
												transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
											}}
											onMouseEnter={() => this.setState({ hoveredBlogIndex: idx })}
											onMouseLeave={() => this.setState({ hoveredBlogIndex: null })}
											>
												<div style={{ height: '210px', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
													{blog.image ? (
														<img src={blog.image} alt={blog.title || blog.heading} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease', transform: isHovered ? 'scale(1.06)' : 'scale(1)' }} />
													) : (
														<div style={{
															width: '100%', height: '100%', display: 'flex',
															alignItems: 'center', justifyContent: 'center',
															background: '#0284c7'
														}}>
															<i className="fa fa-newspaper" style={{ fontSize: '48px', color: '#ffffff', opacity: 0.8 }} />
														</div>
													)}
												</div>
												<div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
													<h4 style={{
														fontSize: '18px', fontWeight: 800, color: '#0f172a',
														lineHeight: '1.4', marginBottom: '18px', flex: 1,
														display: '-webkit-box', WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical', overflow: 'hidden',
														minHeight: '50px'
													}}>
														{blog.title || blog.heading}
													</h4>
													<Link to={`/blogs/${blog.slug}`} style={{
														display: 'inline-flex',
														alignItems: 'center',
														justifyContent: 'center',
														gap: '8px',
														background: '#0284c7',
														color: '#fff',
														border: 'none',
														borderRadius: '8px',
														padding: '12px 20px',
														fontWeight: 700,
														fontSize: '13px',
														letterSpacing: '0.5px',
														textDecoration: 'none',
														textAlign: 'center',
														boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
														transition: 'all 0.3s'
													}}>
														READ ARTICLE <FaArrowRight />
													</Link>
												</div>
											</div>
										</div>
									);
								})}
								</Slider>
							</div>
						</div>
					</section>

				</div>
				<Footer2 />	

				{/* Lightbox Modal */}
				{this.state.lightboxIndex !== null && this.state.projectsList[this.state.lightboxIndex] && (
					<div
						onClick={this.closeLightbox}
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
								{this.state.lightboxIndex + 1} / {this.state.projectsList.length}
							</span>

							<button
								onClick={this.closeLightbox}
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
							onClick={this.showPrev}
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
								key={this.state.projectsList[this.state.lightboxIndex].id || this.state.lightboxIndex}
								src={this.state.projectsList[this.state.lightboxIndex].image}
								alt={this.state.projectsList[this.state.lightboxIndex].name || 'Project image'}
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
							onClick={this.showNext}
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
			</Fragment>
		)
	}
}

export default Index1;
