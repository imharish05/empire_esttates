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
					@media only screen and (max-width: 575px) {
						.home-section-wrap {
							padding-top: 30px !important;
							padding-bottom: 30px !important;
						}
					}
					@media only screen and (max-width: 480px) {
						.home-section-wrap {
							padding-top: 20px !important;
							padding-bottom: 20px !important;
						}
					}
				`}</style>

					
					{/* Section-3 (About Us - Investment Benefits) */}
					<section className="content-inner about-box home-section-wrap" data-content="ABOUT US" id="sidenav_aboutUs" style={{background: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden'}}>
						<div className="container" style={{position: 'relative', zIndex: 1}}>
							<div className="row align-items-center">
								{/* Left Content - Benefits */}
								<div className="col-md-7 col-lg-7" style={{paddingRight: '40px'}}>
									<h2 style={{color: '#1a1a2e', fontSize: '42px', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px'}}>
										Invest In Land,<br/><span style={{color: '#c8902a'}}>Invest In Your Future</span>
									</h2>
									<div style={{width: '60px', height: '4px', background: 'linear-gradient(90deg, #c8902a, #e8b84b)', borderRadius: '2px', marginBottom: '20px'}}></div>
									<h5 style={{color: '#c8902a', fontWeight: '700', letterSpacing: '1.5px', marginBottom: '30px', textTransform: 'uppercase', fontSize: '13px'}}>Premium Plots <span style={{margin: '0 8px', color: '#1a1a2e'}}>|</span> Trusted Legacy <span style={{margin: '0 8px', color: '#1a1a2e'}}>|</span> Brighter Tomorrow</h5>
									
									<div className="row mb-4">
										{[
											{ icon: <FaChartLine/>, title: 'HIGH APPRECIATION', desc: 'Land value appreciates consistently over time.' },
											{ icon: <FaShieldAlt/>, title: 'SAFE & SECURE INVESTMENT', desc: 'Land is a tangible asset with minimum risk.' },
											{ icon: <FaHome/>, title: 'BUILD YOUR DREAM HOME', desc: 'Create a space that reflects your lifestyle.' },
											{ icon: <FaMoneyBillWave/>, title: 'LONG-TERM WEALTH CREATION', desc: 'A smart investment today for a better tomorrow.' },
											{ icon: <FaFileContract/>, title: 'CLEAR LEGAL DOCUMENTATION', desc: '100% Transparency with clear titles.' },
											{ icon: <FaUniversity/>, title: 'BANK LOAN ASSISTANCE', desc: 'Easy financing options to make your investment simple.' }
										].map((item, index) => (
											<div className="col-md-6 mb-4" key={index} style={{display: 'flex', gap: '15px'}}>
												<div style={{minWidth: '45px', height: '45px', background: 'rgba(200, 144, 42, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8902a', fontSize: '20px'}}>
													{item.icon}
												</div>
												<div>
													<h5 style={{color: '#1a1a2e', fontSize: '14px', fontWeight: '800', marginBottom: '4px'}}>{item.title}</h5>
													<p style={{color: '#666', fontSize: '13px', lineHeight: '1.5', margin: 0}}>{item.desc}</p>
												</div>
											</div>
										))}
									</div>

									<Link to={"/about-us"} style={{display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(90deg, #c8902a, #e8b84b)', color: '#fff', padding: '14px 32px', borderRadius: '4px', fontWeight: '700', textDecoration: 'none', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s'}}>
										Discover More <FaArrowRight />
									</Link>
								</div>

								{/* Right Image */}
								<div className="col-md-5 col-lg-5 mt-5 mt-md-0" style={{position: 'relative', paddingLeft: '20px'}}>
									<div style={{position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.5)'}}>
										<img src={aboutImg} alt="About Empire Estates" style={{width: '100%', height: '520px', objectFit: 'cover', display: 'block'}} />
										<div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,52,96,0.6) 0%, transparent 60%)'}}></div>
									</div>
									{/* Floating Badge */}
									<div style={{position: 'absolute', bottom: '30px', left: '40px', background: 'rgba(255,255,255,0.95)', borderRadius: '10px', padding: '14px 20px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '12px'}}>
										<div style={{width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #c8902a, #e8b84b)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
											<FaShieldAlt style={{color: '#fff', fontSize: '20px'}} />
										</div>
										<div>
											<div style={{fontWeight: '800', fontSize: '16px', color: '#1a1a2e'}}>CMDA & RERA APPROVED</div>
											<div style={{fontSize: '12px', color: '#888'}}>100% Legal & Verified</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>




					{/* Our Services Section Start */}
					<section className="content-inner-2 home-section-wrap" data-content="SERVICES" id="sidenav_services" style={{ padding: '80px 0' }}>
						<div className="container">
							<div className="row align-items-center" style={{ marginBottom: '50px' }}>
								<div className="col-lg-8 col-md-12 mb-4 mb-lg-0 text-left">
									<p style={{ color: '#c8932e', fontSize: '15px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>WHAT WE DO</p>
									<h2 className="title" style={{ fontSize: '40px', fontWeight: 700, color: '#1a1a1a' }}>Our Premium Services</h2>
									<div className="dlab-separator bg-primary" style={{ margin: 0 }}></div>
								</div>
								{this.state.servicesList && this.state.servicesList.length > 3 && (
									<div className="col-lg-4 col-md-12 text-lg-right" style={{ textAlign: 'right' }}>
										<Link to="/services-details" style={{
											display: 'inline-block',
											background: '#c8902a',
											color: '#fff',
											padding: '12px 30px',
											borderRadius: '4px',
											fontWeight: 700,
											fontSize: '16px',
											textDecoration: 'none',
											boxShadow: '0 4px 15px rgba(200, 144, 42, 0.3)'
										}}>
											View All <FaArrowRight style={{ marginLeft: '8px' }} />
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
									<div className="col-lg-4 col-md-6 mb-5" key={service.id || index}>
										<style>{`
											.service-card-modern:hover .service-img-modern {
												transform: scale(1.1);
											}
										`}</style>
										<div className="service-card-modern" style={{
											background: '#fff',
											borderRadius: '12px',
											boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
											overflow: 'hidden',
											transition: 'all 0.4s ease',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											borderBottom: '4px solid transparent'
										}}
										onMouseEnter={(e) => { 
											e.currentTarget.style.transform = 'translateY(-10px)';
											e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
											e.currentTarget.style.borderBottom = '4px solid #c8902a';
										}}
										onMouseLeave={(e) => { 
											e.currentTarget.style.transform = 'translateY(0)';
											e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
											e.currentTarget.style.borderBottom = '4px solid transparent';
										}}>
											<Link to={`/services-details/${service.slug}`} style={{textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%'}}>
												{/* Card Image Header */}
												<div style={{
													height: '240px',
													width: '100%',
													position: 'relative',
													overflow: 'hidden',
													background: sImage ? '#f9f9f9' : 'linear-gradient(135deg, #1a1a2e 0%, #2c2c44 100%)'
												}}>
													{sImage ? (
														<img src={sImage} alt={service.title || service.service} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'}} className="service-img-modern" />
													) : (
														<div style={{
															width: '100%', height: '100%',
															color: '#c8902a',
															display: 'flex', alignItems: 'center', justifyContent: 'center',
															fontSize: '72px',
															transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)'
														}} className="service-img-modern">
															{icon}
														</div>
													)}
													{/* Overlay gradient at bottom of image */}
													<div style={{
														position: 'absolute',
														bottom: 0, left: 0, right: 0,
														height: '100px',
														background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)'
													}}></div>
												</div>
												
												{/* Card Content */}
												<div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
													<h4 style={{ 
														fontSize: '22px', 
														fontWeight: 800, 
														color: '#1a1a2e', 
														marginBottom: '15px',
														lineHeight: '1.3'
													}}>
														{service.title || service.service}
													</h4>
													
													<p style={{ 
														color: '#666', 
														fontSize: '15px', 
														lineHeight: '1.6', 
														margin: 0,
														textAlign: 'justify',
														display: '-webkit-box',
														WebkitLineClamp: 3,
														WebkitBoxOrient: 'vertical',
														overflow: 'hidden',
														flex: 1
													}}>
														{service.description || service.consultationRequirement || 'Discover premium real estate solutions tailored to your unique requirements.'}
													</p>
													
													<div style={{
														marginTop: '25px',
														display: 'flex',
														alignItems: 'center',
														color: '#c8902a',
														fontWeight: 700,
														fontSize: '14px',
														textTransform: 'uppercase',
														letterSpacing: '1px',
														transition: 'color 0.3s'
													}}>
														Read More <FaArrowRight style={{marginLeft: '8px'}} />
													</div>
												</div>
											</Link>
										</div>
									</div>
								)})}
							</div>
						</div>
					</section>
					{/* Our Services Section End */}

					{/* Custom Highlights Section */}
					<style>{`
						.custom-flip-card {
							background-color: transparent;
							perspective: 1000px;
							height: 320px;
							width: 100%;
						}
						.custom-flip-card-inner {
							position: relative;
							width: 100%;
							height: 100%;
							text-align: center;
							transition: transform 0.6s;
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
							border-radius: 8px;
							padding: 40px 30px;
							box-shadow: 0 10px 30px rgba(0,0,0,0.1);
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
							background: rgba(26, 26, 34, 0.7); /* Dark overlay */
							border-radius: 8px;
							z-index: 1;
						}
						.custom-flip-content {
							position: relative;
							z-index: 2;
						}
						.custom-flip-back {
							transform: rotateY(180deg);
							border-bottom: 3px solid #c8902a;
							background-color: #2c2c39; /* Solid dark color on the back */
						}
					`}</style>
					<section className="content-inner-2 home-section-wrap" style={{ padding: '80px 0 60px' }}>
						<div className="container">
							{/* Header Row */}
							<div className="row align-items-center" style={{ marginBottom: '50px' }}>
								<div className="col-lg-8 col-md-12 mb-4 mb-lg-0">
									<h2 className="title" style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a1a', marginBottom: '10px' }}>
										Find Your Dream Plot & Build Your Future Today!
									</h2>
									<p style={{ fontSize: '16px', color: '#666', margin: 0 }}>
										Let us do what we do best — helping you secure the perfect land for your unique vision.
									</p>
								</div>
								<div className="col-lg-4 col-md-12 text-lg-right" style={{ textAlign: 'right' }}>
									<Link to="/projects" style={{
										display: 'inline-block',
										background: '#c8902a',
										color: '#fff',
										padding: '12px 30px',
										borderRadius: '4px',
										fontWeight: 700,
										fontSize: '16px',
										textDecoration: 'none',
										boxShadow: '0 4px 15px rgba(200, 144, 42, 0.3)'
									}}>
										Explore <FaArrowRight style={{ marginLeft: '8px' }} />
									</Link>
								</div>
							</div>
							
							{/* Cards Row */}
							<div className="row">
								{/* Card 1 */}
								<div className="col-lg-4 col-md-6 mb-4">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services1})` }}>
												<div className="custom-flip-content">
													<div style={{ marginBottom: '25px' }}>
														<FaMapMarkedAlt style={{ fontSize: '60px', color: '#c8902a' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>Strategic Locations</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#c8902a', fontSize: '22px', fontWeight: 700, marginBottom: '15px' }}>Strategic Locations</h4>
													<p style={{ color: '#e8e8e8', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>We select the most high-growth areas to ensure maximum appreciation and convenience for your investment.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								{/* Card 2 */}
								<div className="col-lg-4 col-md-6 mb-4">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services2})` }}>
												<div className="custom-flip-content">
													<div style={{ marginBottom: '25px' }}>
														<FaShieldAlt style={{ fontSize: '60px', color: '#c8902a' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>CMDA & RERA APPROVED</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#c8902a', fontSize: '22px', fontWeight: 700, marginBottom: '15px' }}>CMDA & RERA APPROVED</h4>
													<p style={{ color: '#e8e8e8', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>Every plot comes with 100% clear titles, proper legal documentation, and full CMDA & RERA approval for complete peace of mind.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								{/* Card 3 */}
								<div className="col-lg-4 col-md-6 mb-4">
									<div className="custom-flip-card">
										<div className="custom-flip-card-inner">
											<div className="custom-flip-front" style={{ backgroundImage: `url(${services3})` }}>
												<div className="custom-flip-content">
													<div style={{ marginBottom: '25px' }}>
														<FaHome style={{ fontSize: '60px', color: '#c8902a' }} />
													</div>
													<h4 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>Ready to Build</h4>
												</div>
											</div>
											<div className="custom-flip-back">
												<div className="custom-flip-content">
													<h4 style={{ color: '#c8902a', fontSize: '22px', fontWeight: 700, marginBottom: '15px' }}>Ready to Build</h4>
													<p style={{ color: '#e8e8e8', fontSize: '15px', margin: 0, lineHeight: '1.6' }}>Our layouts feature wide blacktop roads, streetlights, and gated security, making them perfectly ready for immediate villa construction.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Custom Highlights Section End */}

					{/* Projects Section Start */}
					<section className="content-inner-2" style={{ padding: '0 0 60px' }}>
						<div className="section-head text-center" style={{marginBottom: '30px'}}>
							<h2 className="title" style={{fontSize: '40px', fontWeight: 700, color: '#1a1a1a'}}>Our Projects</h2>
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
															objectFit: 'cover',
															transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
															transform: isHovered ? 'scale(1.08)' : 'scale(1)'
														}} 
													/>
													<div
														style={{
															position: 'absolute',
															inset: 0,
															background: 'rgba(200, 144, 42, 0.7)',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															opacity: isHovered ? 1 : 0,
															transition: 'opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
															zIndex: 2
														}}
													>
														<span style={{ color: '#ffffff', fontSize: '64px', fontWeight: '300', userSelect: 'none' }}>+</span>
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>
					{/* Projects Section End */}

					{/* Section-8 (Latest Blogs) Start */}
					<section className="content-inner-2 home-section-wrap" data-content="BLOGS" id="sidenav_blogs" style={{padding: '80px 0'}}>
						<div className="container">
							<div className="section-head text-center" style={{marginBottom: '50px'}}>
								<p style={{color: '#c8932e', fontSize: '15px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px'}}>OUR INSIGHTS</p>
								<h2 className="title" style={{fontSize: '40px', fontWeight: 700, letterSpacing: '0.5px', margin: 0, marginBottom: '24px', color: '#1a1a1a'}}>Latest Blogs & News</h2>
								<div className="dlab-separator bg-primary" style={{margin: '0 auto'}}></div>
							</div>
							<div className="blog-slider-wrapper">
								<Slider className="blog-carousel owl-carousel owl-btn-center-lr owl-btn-out" {...blogSliderSettings}>
								{(this.state.blogsList || []).map((blog, idx) => {
									const isHovered = this.state.hoveredBlogIndex === idx;
									return (
										<div key={blog.id || idx} className="item p-3">
											<div style={{
												background: '#fff',
												borderRadius: '4px',
												overflow: 'hidden',
												boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
												height: '100%',
												display: 'flex',
												flexDirection: 'column',
												transition: 'transform 0.3s ease, box-shadow 0.3s ease',
												transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
											}}
											onMouseEnter={() => this.setState({ hoveredBlogIndex: idx })}
											onMouseLeave={() => this.setState({ hoveredBlogIndex: null })}
											>
												<div style={{ height: '220px', overflow: 'hidden', background: '#e8e8e8' }}>
													{blog.image ? (
														<img src={blog.image} alt={blog.title || blog.heading} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
													) : (
														<div style={{
															width: '100%', height: '100%', display: 'flex',
															alignItems: 'center', justifyContent: 'center',
															background: 'linear-gradient(135deg, #2c2c2c 0%, #444 100%)'
														}}>
															<i className="fa fa-newspaper" style={{ fontSize: '52px', color: '#c8902a', opacity: 0.6 }} />
														</div>
													)}
												</div>
												<div style={{ padding: '22px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
													<h4 style={{
														fontSize: '18px', fontWeight: 700, color: '#1a1a1a',
														lineHeight: '1.45', marginBottom: '20px', flex: 1,
														display: '-webkit-box', WebkitLineClamp: 2,
														WebkitBoxOrient: 'vertical', overflow: 'hidden',
														minHeight: '53px'
													}}>
														{blog.title || blog.heading}
													</h4>
													<Link to={`/blogs/${blog.slug}`} style={{
														display: 'inline-block',
														background: '#c8902a',
														color: '#fff',
														border: 'none',
														borderRadius: '3px',
														padding: '10px 22px',
														fontWeight: 700,
														fontSize: '14px',
														cursor: 'pointer',
														letterSpacing: '0.5px',
														textDecoration: 'none',
														textAlign: 'center',
														transition: 'background 0.3s'
													}}>
														READ MORE
													</Link>
												</div>
											</div>
										</div>
									)
								})}
								</Slider>
							</div>
						</div>
					</section>
					{/* Section-8 (Latest Blogs) End */}

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