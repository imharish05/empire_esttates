import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import CountUp from 'react-countup';
import Header from './../../Layout/Header';
import Footer2 from './../../Layout/Footer2';
import PageTitle from './../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';
import ScrollRevealInit from '../../../utils/ScrollRevealInit';

//Images
import about1 from './../../../images/about/about1.png';
import about2 from './../../../images/about/about2.png';
import about3 from './../../../images/about/about3.png';
import { FaAward, FaMapMarkedAlt, FaUserFriends, FaShieldAlt, FaBullseye, FaEye, FaFileContract, FaCheckCircle, FaHandHoldingUsd, FaRoad } from '../../../icons';

const counterBlog = [
	{icon: <FaAward style={{ fontSize: '40px', color: '#0284c7' }} />, num: 23,  title: 'Years of Excellence',},
	{icon: <FaMapMarkedAlt style={{ fontSize: '40px', color: '#0284c7' }} />, num: 15,    title: 'High-Growth Locations',},
	{icon: <FaUserFriends style={{ fontSize: '40px', color: '#0284c7' }} />, num: 250,   title: 'Units Completed',},
	{icon: <FaShieldAlt style={{ fontSize: '40px', color: '#0284c7' }} />, num: 100, title: 'Clear Legal Titles %',},
];

const timelineItems = [
	{ year: '2001', text: 'THIRUVERKADU, POONAMALLEE', tag: '' },
	{ year: '2004', text: 'MUGALIVAKKAM', tag: '' },
	{ year: '2005', text: 'VALASARAVAKKAM', tag: '' },
	{ year: '2007', text: 'MUGALIVAKKAM, VALASARAVAKKAM', tag: '' },
	{ year: '2008', text: 'AVADI', tag: '' },
	{ year: '2009', text: 'KANDSWAMY NAGAR, PONNIAMMAN NAGAR', tag: '' },
	{ year: '2010-2011', text: 'KALAIMAGAL NAGAR, JAMES STREET, PORUR, GOVINDARAJ NAGAR', tag: '' },
	{ year: '2012', text: 'KARUNAGARAN NAGAR, DHARANI NAGAR, AMBAL NAGAR', tag: '' },
	{ year: '2014', text: 'ETTIANNAL NAGAR', tag: '' },
	{ year: '2015-2016', text: 'PRITHIVI NAGAR, POONAMALLEE', tag: '' },
	{ year: '2017-2018', text: 'POLIWAKKAM, THIRUVALLUR, POONAMALLEE', tag: '' },
	{ year: '2019', text: 'VGN AVENUE', tag: '' },
	{ year: '2020', text: 'POLIWAKKAM, POONAMALLEE', tag: '' },
	{
		year: '2021–2025',
		items: [
			'THIRUNINDRAVUR',
			'ROYAL ENCLAVE – POONAMALLE PHASE I',
			'MANGADU KAMATCHI AMMAN NAGAR PHASE I',
			'KANNAPALAYAM PHASE I',
			'KANNAPALAYAM PHASE II',
			'CHEMBARABAKKAM PHASE I',
			'PARIVAKKAM',
		]
	},
	{
		year: '2026',
		items: [
			'KANNAPALAYAM PHASE III',
			'THIRUNINDRAVUR',
			'SORANJERI',
			'KUTHAMPAKKAM',
			'PADAPAI',
		]
	},
];

class Aboutus extends Component{
	componentDidMount() {
		applyMetaTags("About Us | Empire Estates", "Learn about Empire Estates, our legacy, our mission, and our vision.");
	}
	render(){
		return(
			<Fragment>
				<ScrollRevealInit />
				<Header isTransparent={true} />
				<div className="page-content bg-white">
					<PageTitle
						motherMenu="About Us"
						activeMenu="About Us"
						placement="About Us Banner"
						className="about-page-banner"
					/>
					
					{/* Section-0: Introduction */}
					<section className="content-inner bg-white" style={{ padding: '80px 0 40px 0' }}>
						<div className="container">
							<div className="row align-items-center">
								{/* Left Content */}
								<div className="col-lg-6 col-md-12 m-b30 reveal-left">
									<p className="font-16 m-b20" style={{ lineHeight: '1.8', fontSize: '18px', color: '#0f172a', background: '#f0f9ff', padding: '16px 24px', borderLeft: '5px solid #0284c7', borderRadius: '0 10px 10px 0', width: '100%', border: '1px solid rgba(56, 189, 248, 0.3)', borderLeftWidth: '5px' }}>
										<strong style={{ fontSize: '20px', color: '#0284c7', fontWeight: '800', letterSpacing: '0.5px' }}>1000+ Houses Successfully Constructed</strong>
									</p>
									<div className="section-head style-1">
										<span className="text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '2px', color: '#0284c7 !important', fontSize: '13px' }}>WELCOME TO EMPIRE ESTATES</span>
										<h2 className="title font-weight-700 m-b20" style={{ color: '#0f172a', fontSize: '36px' }}>Empire Esttates: Civil Engineering & Contracting Excellence.</h2>
										<div className="dlab-separator bg-primary m-b20" style={{ width: '60px', height: '4px', background: '#0284c7', borderRadius: '2px' }}></div>
									</div>
									<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#475569', fontSize: '16px', textAlign: 'justify' }}>
										We are <strong>Empire Esttates</strong>, a well-established firm of civil engineers and contractors dedicated to residential development in Chennai. Founded in 2001 by T. Karthik Pragass, a civil engineer with extensive experience in the construction industry, our primary objective is to promote and develop high-quality Residential Apartments and Individual Houses.
									</p>
									<p className="font-16 text-black m-t20" style={{ lineHeight: '1.8', color: '#475569', fontSize: '16px' }}>
										<strong>Key Highlights:</strong><br/>
										<strong>Expertise:</strong> Civil Engineering, Contracting, and Residential Development<br/>
										<strong>Core Focus Areas:</strong> Chennai (specifically in and around Poonamallee, Valasaravakkam, Porur, Avadi, & Thiruvallur)
									</p>

								</div>
								{/* Right Image */}
								<div className="col-lg-6 col-md-12 m-b30 reveal-right">
									<div className="about-img text-center img-zoom-wrap" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(2, 132, 199, 0.15)' }}>
										<img src={about1} alt="About Empire Estates" className="radius-sm img-cover shadow-sm" style={{ maxHeight: '420px', width: '100%', objectFit: 'cover', borderRadius: '16px' }} />
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Section-1: Professional Strengths */}
					<section className="content-inner bg-light" style={{ padding: '80px 0' }}>
						<div className="container">
							<div className="section-head text-center style-1 reveal-up" style={{ marginBottom: '50px' }}>
								<span className=" text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '2px', color: '#0284c7' }}>OUR STRENGTHS</span>
								<h2 className="title font-weight-700 m-b15" style={{ color: '#0f172a', fontSize: '36px' }}>Professional Strengths &amp; Additional Points</h2>
								<div className="reveal-line mx-auto" style={{ margin: '0 auto' }}></div>
							</div>
							
							<div className="row justify-content-center">
								{/* Item 1 */}
								<div className="col-lg-3 col-md-6 col-sm-6 mb-4 reveal-up delay-1">
									<div className="icon-bx-wraper style-1 text-center p-a30 bg-white radius-sm shadow-sm h-100 transition-all hover-up premium-card-hover" style={{ padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
										<div className="icon-lg text-primary m-b20" style={{ display: 'inline-flex', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.12)', alignItems: 'center', justifyContent: 'center' }}>
											<FaCheckCircle style={{ color: '#0284c7', fontSize: '24px' }} />
										</div>
										<div className="icon-content">
											<h4 className="dlab-tilte m-b10 font-weight-600" style={{ fontSize: '18px', color: '#0f172a' }}>Commitment to Quality</h4>
											<p className="m-b0" style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>Projects adhering to the highest standards of structural integrity, engineering excellence, and safety.</p>
										</div>
									</div>
								</div>

								{/* Item 2 */}
								<div className="col-lg-3 col-md-6 col-sm-6 mb-4 reveal-up delay-2">
									<div className="icon-bx-wraper style-1 text-center p-a30 bg-white radius-sm shadow-sm h-100 transition-all hover-up premium-card-hover" style={{ padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
										<div className="icon-lg text-primary m-b20" style={{ display: 'inline-flex', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
											<FaUserFriends style={{ color: '#0284c7', fontSize: '24px' }} />
										</div>
										<div className="icon-content">
											<h4 className="dlab-tilte m-b10 font-weight-600" style={{ fontSize: '18px', color: '#0f172a' }}>Client-Centric Approach</h4>
											<p className="m-b0" style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>Transparent communication, timely delivery, and solutions meeting specific budget and design requirements.</p>
										</div>
									</div>
								</div>

								{/* Item 3 */}
								<div className="col-lg-3 col-md-6 col-sm-6 mb-4 reveal-up delay-3">
									<div className="icon-bx-wraper style-1 text-center p-a30 bg-white radius-sm shadow-sm h-100 transition-all hover-up premium-card-hover" style={{ padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
										<div className="icon-lg text-primary m-b20" style={{ display: 'inline-flex', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
											<FaMapMarkedAlt style={{ color: '#0284c7', fontSize: '24px' }} />
										</div>
										<div className="icon-content">
											<h4 className="dlab-tilte m-b10 font-weight-600" style={{ fontSize: '18px', color: '#0f172a' }}>Area Specialization</h4>
											<p className="m-b0" style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>Two decades of deep understanding of local real estate and regulatory landscapes.</p>
										</div>
									</div>
								</div>

								{/* Item 4 */}
								<div className="col-lg-3 col-md-6 col-sm-6 mb-4 reveal-up delay-4">
									<div className="icon-bx-wraper style-1 text-center p-a30 bg-white radius-sm shadow-sm h-100 transition-all hover-up premium-card-hover" style={{ padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
										<div className="icon-lg text-primary m-b20" style={{ display: 'inline-flex', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', alignItems: 'center', justifyContent: 'center' }}>
											<FaAward style={{ color: '#0284c7', fontSize: '24px' }} />
										</div>
										<div className="icon-content">
											<h4 className="dlab-tilte m-b10 font-weight-600" style={{ fontSize: '18px', color: '#0f172a' }}>Project Portfolio</h4>
											<p className="m-b0" style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>A reliable builder with a track record of completing various residential projects.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Section-2: Quality Design & Execution */}
					<section className="content-inner bg-white" style={{ padding: '80px 0 40px 0' }}>
						<div className="container">
							<div className="row align-items-center">
								{/* Left Image */}
								<div className="col-lg-6 col-md-12 m-b30">
									<div className="about-img text-center">
										<img src={about2} alt="Interior Design" className="radius-sm img-cover shadow-sm" style={{ maxHeight: '420px', width: '100%', objectFit: 'cover', borderRadius: '12px' }} />
									</div>
								</div>
								{/* Right Content */}
								<div className="col-lg-6 col-md-12 m-b30">
									<div className="section-head style-1">
										<span className="text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '1.5px', color: '#0284c7' }}>Quality Design & Execution</span>
										<h2 className="title font-weight-700 m-b20" style={{ color: '#0f172a', fontSize: '36px' }}>Focused. Professional. Statement. Proven Track Record.</h2>
										<div className="dlab-separator bg-primary m-b20" style={{ width: '60px', height: '4px', background: '#0284c7', borderRadius: '2px' }}></div>
									</div>
									<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#555', fontSize: '16px', textAlign: 'justify' }}>
										Our two decades in the industry have resulted in the successful completion of approximately 250 residential units, a balanced mix of apartments and individual houses. This volume of work is a testament to the trust placed in us. We are proud of our established reputation for delivering high-quality construction at a reasonable cost, consistently meeting deadlines.
									</p>
									<ul className="list-check primary m-b30 m-t20">
										<li className="m-b10" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'justify' }}>
											<strong>Structural Integrity:</strong> All projects feature a consultant-designed framed structure, ensuring long-term safety and engineering precision.
										</li>
										<li className="m-b10" style={{ fontSize: '16px', fontWeight: '500', textAlign: 'justify' }}>
											<strong>Aesthetic Appeal:</strong> We integrate aesthetic elevations crafted by our own team of architects, ensuring visually distinctive and modern homes.
										</li>
									</ul>
								</div>
							</div>
						</div>
					</section>

					{/* Section-3: Mission & Vision */}
					<section className="content-inner bg-light" style={{ padding: '80px 0' }}>
						<div className="container">
							<div className="row justify-content-center">
								{/* Mission Card */}
								<div className="col-lg-6 col-md-12 m-b30">
									<div className="icon-bx-wraper style-1 p-a40 bg-white radius-sm h-100 shadow-sm transition-all hover-up" style={{ borderTop: '4px solid #0284c7', padding: '40px' }}>
										<div className="d-flex align-items-center m-b20 text-primary" style={{ gap: '15px' }}>
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
												<FaBullseye style={{ color: '#0284c7', fontSize: '45px' }} />
											</div>
											<h3 className="title font-weight-700 m-b0" style={{ fontSize: '24px', color: '#0f172a', whiteSpace: 'nowrap' }}>Our Mission</h3>
										</div>
										<div className="icon-content">
											<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
												Our mission is to be the preferred choice for residential construction in Chennai by consistently delivering safe, high-quality, and affordable homes built on trust. We commit to:
											</p>
											<ul className="list-circle primary m-t10" style={{ paddingLeft: '20px' }}>
												<li className="m-b5" style={{ textAlign: 'justify' }}><strong>Quality & Technology:</strong> Utilizing the latest construction technologies and superior materials.</li>
												<li className="m-b5" style={{ textAlign: 'justify' }}><strong>Affordability:</strong> Achieving the best possible value for our customers.</li>
												<li className="m-b5" style={{ textAlign: 'justify' }}><strong>Trust & Service:</strong> Guaranteeing timely project handover and reliable after-sales support.</li>
											</ul>
										</div>
									</div>
								</div>

								{/* Vision Card */}
								<div className="col-lg-6 col-md-12 m-b30">
									<div className="icon-bx-wraper style-1 p-a40 bg-white radius-sm h-100 shadow-sm transition-all hover-up" style={{ borderTop: '4px solid #0284c7', padding: '40px' }}>
										<div className="d-flex align-items-center m-b20 text-primary" style={{ gap: '15px' }}>
											<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
												<FaEye style={{ color: '#0284c7', fontSize: '45px' }} />
											</div>
											<h3 className="title font-weight-700 m-b0" style={{ fontSize: '24px', color: '#0f172a', whiteSpace: 'nowrap' }}>Our Vision</h3>
										</div>
										<div className="icon-content">
											<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
												Our vision is to become the preferred and most trusted residential developer in Chennai, serving a wide customer base that seeks an unparalleled combination of international-standard quality construction at a truly affordable cost.
											</p>
											<ul className="list-circle primary m-t10" style={{ paddingLeft: '20px' }}>
												<li className="m-b5" style={{ textAlign: 'justify' }}><strong>Technology Integration:</strong> Adopting the latest materials meeting global benchmarks.</li>
												<li className="m-b5" style={{ textAlign: 'justify' }}><strong>Customer-Centric:</strong> Valuing trust and ensuring a satisfying homeownership journey.</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Section-4: Image Banner */}
					<section className="content-inner bg-white" style={{ padding: '0 0 80px 0' }}>
						<div className="container">
							<div className="row">
								<div className="col-12 text-center">
									<img src={about3} alt="Architectural Exterior" className="radius-sm shadow-sm" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '12px' }} />
								</div>
							</div>
						</div>
					</section>

					{/* Section-4.5: Our Journey (Timeline - Leaf Eco Design in Single Solid Blue Color) */}
					<section className="content-inner" style={{ padding: '80px 0', background: '#f8fafc' }}>
						<style>
						{`
						.custom-leaf-timeline {
							position: relative;
							max-width: 1000px;
							margin: 0 auto;
							padding: 20px 0;
						}
						.custom-leaf-timeline::after {
							content: '';
							position: absolute;
							width: 5px;
							background: #0284c7;
							top: 0;
							bottom: 0;
							left: 50%;
							margin-left: -2.5px;
							border-radius: 5px;
						}
						.leaf-timeline-container {
							padding: 12px 40px;
							position: relative;
							width: 50%;
							margin-bottom: 25px;
							box-sizing: border-box;
						}
						.leaf-timeline-left {
							left: 0;
						}
						.leaf-timeline-right {
							left: 50%;
						}
						.leaf-node-pin {
							position: absolute;
							width: 38px;
							height: 38px;
							background: #ffffff;
							border: 3px solid #0284c7;
							top: 22px;
							border-radius: 50%;
							z-index: 2;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #0284c7;
							box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
							transition: all 0.3s ease;
						}
						.leaf-timeline-right .leaf-node-pin {
							border-color: #0284c7;
							color: #0284c7;
							box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
						}
						.leaf-timeline-left .leaf-node-pin {
							right: -19px;
						}
						.leaf-timeline-right .leaf-node-pin {
							left: -19px;
						}
						.leaf-timeline-left:hover .leaf-node-pin,
						.leaf-timeline-right:hover .leaf-node-pin {
							background: #0284c7;
							color: #ffffff;
							border-color: #0284c7;
							transform: scale(1.15) rotate(15deg);
							box-shadow: 0 6px 16px rgba(2, 132, 199, 0.4);
						}
						.leaf-card {
							padding: 24px 28px;
							background: #ffffff;
							position: relative;
							box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
							border: 1px solid rgba(2, 132, 199, 0.22);
							transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
							overflow: hidden;
						}
						.leaf-timeline-left .leaf-card,
						.leaf-timeline-right .leaf-card {
							border-top: 4px solid #0284c7;
							border-color: rgba(2, 132, 199, 0.22);
						}
						.leaf-timeline-left .leaf-card {
							border-radius: 36px 6px 36px 36px;
						}
						.leaf-timeline-right .leaf-card {
							border-radius: 6px 36px 36px 36px;
						}
						.leaf-card::before,
						.leaf-timeline-right .leaf-card::before {
							content: '';
							position: absolute;
							right: -15px;
							bottom: -15px;
							width: 90px;
							height: 90px;
							background: rgba(2, 132, 199, 0.05);
							border-radius: 50%;
							pointer-events: none;
						}
						.leaf-timeline-left:hover .leaf-card,
						.leaf-timeline-right:hover .leaf-card {
							transform: translateY(-6px);
							box-shadow: 0 16px 32px rgba(2, 132, 199, 0.18);
							border-color: #0284c7;
						}
						.leaf-year-badge,
						.leaf-timeline-right .leaf-year-badge {
							display: inline-flex;
							align-items: center;
							gap: 8px;
							padding: 6px 18px;
							background: #0284c7;
							color: #ffffff;
							font-weight: 800;
							font-size: 20px;
							border-radius: 20px;
							margin-bottom: 16px;
							box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);
						}
						.leaf-location-tag {
							display: inline-flex;
							align-items: center;
							gap: 6px;
							background: #ffffff;
							color: #0f172a;
							border: 1px solid rgba(56, 189, 248, 0.35);
							padding: 6px 14px;
							margin: 3px;
							border-radius: 20px;
							font-weight: 600;
							font-size: 13px;
							letter-spacing: 0.3px;
							box-shadow: 0 2px 5px rgba(0,0,0,0.03);
							transition: all 0.25s ease;
						}
						.leaf-location-tag svg,
						.leaf-timeline-right .leaf-location-tag svg {
							color: #0284c7;
						}
						.leaf-timeline-left .leaf-location-tag:hover,
						.leaf-timeline-right .leaf-location-tag:hover {
							background: #0284c7;
							color: #ffffff;
							border-color: #0284c7;
							transform: translateY(-2px);
							box-shadow: 0 4px 10px rgba(2, 132, 199, 0.25);
						}
						.leaf-timeline-left .leaf-location-tag:hover svg,
						.leaf-timeline-right .leaf-location-tag:hover svg {
							color: #ffffff;
						}
						@media screen and (max-width: 768px) {
							.custom-leaf-timeline::after {
								left: 24px;
							}
							.leaf-timeline-container {
								width: 100%;
								padding-left: 60px;
								padding-right: 15px;
								left: 0 !important;
								margin-bottom: 20px;
							}
							.leaf-timeline-left .leaf-node-pin,
							.leaf-timeline-right .leaf-node-pin {
								left: 5px !important;
								right: auto !important;
							}
							.leaf-timeline-left .leaf-card,
							.leaf-timeline-right .leaf-card {
								border-radius: 6px 28px 28px 28px !important;
							}
							.leaf-timeline-left:hover .leaf-card,
							.leaf-timeline-right:hover .leaf-card {
								transform: translateY(-4px) !important;
							}
						}
						`}
						</style>
						<div className="container">
							<div className="section-head text-center style-1" style={{ marginBottom: '60px' }}>
								<span className="text-primary text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '1.5px', color: '#0284c7' }}>Our Growth Journey</span>
								<h2 className="title font-weight-700 m-b15" style={{ color: '#0f172a', fontSize: '36px' }}>Milestones &amp; Expansions</h2>
								<div className="dlab-separator bg-primary m-b20 mx-auto" style={{ width: '60px', height: '4px', background: '#0284c7', borderRadius: '2px' }}></div>
							</div>
							
							<div className="custom-leaf-timeline">
								{timelineItems.map((item, idx) => {
									const isLeft = idx % 2 === 0;
									return (
										<div className={`leaf-timeline-container ${isLeft ? 'leaf-timeline-left' : 'leaf-timeline-right'}`} key={idx}>
											<div className="leaf-node-pin">
												<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
													<path d="M11 20A6.002 6.002 0 0 0 21 8a9.97 9.97 0 0 0-6.5-5.5A9.97 9.97 0 0 0 2 11a6.002 6.002 0 0 0 9 9z"/>
													<path d="M2 21c5.5-5.5 13-5 13-5"/>
												</svg>
											</div>
											<div className="leaf-card">
												<div className="leaf-year-badge">
													<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
														<path d="M17 8C8 10 5.9 16.5 3 22C3.8 17.5 7 13 12 10.5C14.5 9.2 18 8 17 8Z"/>
													</svg>
													{item.year}
												</div>
												{item.items ? (
													<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
														{item.items.map((t, i) => (
															<span key={i} className="leaf-location-tag">
																<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																	<path d="M11 20A6.002 6.002 0 0 0 21 8a9.97 9.97 0 0 0-6.5-5.5A9.97 9.97 0 0 0 2 11a6.002 6.002 0 0 0 9 9z"/>
																</svg>
																{t}
															</span>
														))}
													</div>
												) : (
													<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
														{item.text.split(', ').map((t, i) => (
															<span key={i} className="leaf-location-tag">
																<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
																	<path d="M11 20A6.002 6.002 0 0 0 21 8a9.97 9.97 0 0 0-6.5-5.5A9.97 9.97 0 0 0 2 11a6.002 6.002 0 0 0 9 9z"/>
																</svg>
																{t}
															</span>
														))}
													</div>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</section>

					{/* Section-5: Stats Counter */}
					<section className="bg-white content-inner" style={{ padding: '40px 0 80px 0' }}>
						<div className="container">
							<div className="row">
								{counterBlog.map((data,index)=>(
									<div className="col-lg-3 col-md-6 col-sm-6 col-6 m-b30" key={index}>
										<div className="counter-left archia-counter d-flex align-items-center justify-content-center">
											<div className="icon-lg pull-left m-r15">{data.icon}</div>
											<div className="clearfix">
												<div className="counter m-b5" style={{ fontSize: '32px', fontWeight: '800', color: '#0284c7' }}>
													<CountUp end={data.num} duration={4}/>{data.num === 100 ? '%' : '+'}
												</div>
												<span className="font-16 text-black" style={{ fontSize: '14px', color: '#666' }}>{data.title}</span> 
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Section-6: Call To Action */}
					<section className="content-inner bg-primary" style={{ padding: '60px 0', background: '#0284c7' }}>
						<div className="container">
							<div className="row align-items-center text-white text-center text-lg-left">
								<div className="col-lg-9 col-md-12 m-b20">
									<h2 style={{ color: '#fff', fontWeight: '800', marginBottom: '10px' }}>Ready to Invest in Your Future?</h2>
									<p style={{ color: '#fff', fontSize: '16px', opacity: 0.9, marginBottom: 0 }}>Get in touch with our experts today to schedule a site visit and secure your dream home.</p>
								</div>
								<div className="col-lg-3 col-md-12 text-center text-lg-right">
									<Link to="/contact-us" className="btn btn-white radius-md" style={{ background: '#fff', color: '#0284c7', fontWeight: '700', padding: '12px 30px', borderRadius: '4px', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}>
										Contact Us
									</Link>
								</div>
							</div>
						</div>
					</section>
				</div>
				<Footer2 />
			</Fragment>
		)
	}
}

export default Aboutus;
