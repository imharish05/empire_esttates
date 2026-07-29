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
import founderImg from './../../../images/about/founder.jpg';
import signImg from './../../../images/sign.png';
import logo from './../../../images/logo.png';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaAward, FaMapMarkedAlt, FaUserFriends, FaShieldAlt, FaBullseye, FaEye, FaFileContract, FaCheckCircle, FaHandHoldingUsd, FaRoad, FaQuoteLeft, FaArrowRight } from '../../../icons';

const renderStatIcon = (iconName) => {
	const iconStyle = { fontSize: '24px', color: '#0284c7' };
	switch (iconName) {
		case 'FaAward':
			return <FaAward style={iconStyle} />;
		case 'FaMapMarkedAlt':
			return <FaMapMarkedAlt style={iconStyle} />;
		case 'FaUserFriends':
			return <FaUserFriends style={iconStyle} />;
		case 'FaShieldAlt':
			return <FaShieldAlt style={iconStyle} />;
		case 'FaBullseye':
			return <FaBullseye style={iconStyle} />;
		case 'FaEye':
			return <FaEye style={iconStyle} />;
		case 'FaFileContract':
			return <FaFileContract style={iconStyle} />;
		case 'FaCheckCircle':
			return <FaCheckCircle style={iconStyle} />;
		case 'FaRoad':
			return <FaRoad style={iconStyle} />;
		case 'FaHandHoldingUsd':
			return <FaHandHoldingUsd style={iconStyle} />;
		default:
			return <FaAward style={iconStyle} />;
	}
};

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
	state = {
		stats: [
			{ icon: 'FaAward', count: 20, suffix: '+', title: 'Years of Excellence' },
			{ icon: 'FaMapMarkedAlt', count: 13, suffix: '+', title: 'High-Growth Locations' },
			{ icon: 'FaUserFriends', count: 221, suffix: '+', title: 'Units Completed' },
			{ icon: 'FaShieldAlt', count: 88, suffix: '%', title: 'Clear Legal Titles %' },
		]
	};

	componentDidMount() {
		applyMetaTags("About Us | Empire Estates", "Learn about Empire Estates, our legacy, our mission, and our vision.");
		this.fetchStats();
	}

	fetchStats = async () => {
		try {
			const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
			const res = await fetch(`${API_URL}/stats?activeOnly=true`);
			if (res.ok) {
				const data = await res.json();
				if (Array.isArray(data) && data.length > 0) {
					this.setState({ stats: data });
				}
			}
		} catch (e) {
			console.log('Error fetching stats:', e);
		}
	};
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

					{/* Section-Founder: Founder Introduction */}
					<section className="content-inner bg-light overflow-hidden" style={{ padding: '50px 0 20px 0', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)', borderTop: '1px solid rgba(2, 132, 199, 0.1)', borderBottom: '1px solid rgba(2, 132, 199, 0.1)' }}>
						<div className="container">
							<div className="row align-items-center">
								{/* Founder / Managing Partner Card Column */}
								<div className="col-lg-5 col-md-12 m-b20 reveal-left">
									<div className="founder-img-wrapper" style={{ position: 'relative', margin: '0 auto', maxWidth: '440px' }}>
										{/* Ambient Backdrop Glow */}
										<div style={{ position: 'absolute', top: '-15px', left: '-15px', right: '-15px', bottom: '-15px', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', borderRadius: '24px', opacity: 0.15, filter: 'blur(20px)', zIndex: 0 }}></div>
										
										{/* Brand Executive Card */}
										<div className="founder-card" style={{ position: 'relative', zIndex: 1, borderRadius: '24px', overflow: 'hidden', border: '1.5px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.2)', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)', padding: '36px 28px', color: '#ffffff' }}>
											
											{/* Logo Container */}
											<div style={{ background: '#ffffff', borderRadius: '16px', padding: '18px 24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
												<img src={logo} alt="Empire Esttates" style={{ maxHeight: '65px', width: 'auto', objectFit: 'contain' }} />
											</div>

											{/* Name & Qualifications */}
											<div style={{ textAlign: 'center', marginBottom: '20px' }}>
												<h3 style={{ color: '#ffffff', fontWeight: '800', margin: '0 0 6px 0', fontSize: '24px' }}>T. Karthik Prakash</h3>
												<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
													<span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' }}>D.C.E.</span>
													<span style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px' }}>M.B.A.</span>
												</div>
												<span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>Managing Partner</span>
											</div>

											<div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', marginBottom: '20px' }}></div>

											{/* Contact Information Box */}
											<div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
												<a href="tel:+919841225401" style={{ color: '#e2e8f0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#38bdf8'} onMouseLeave={e => e.currentTarget.style.color='#e2e8f0'}>
													<div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>
														<FaPhoneAlt style={{ fontSize: '13px' }} />
													</div>
													<span>98412 25401 / 88254 71748</span>
												</a>

												<a href="mailto:empireesttates@gmail.com" style={{ color: '#e2e8f0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#38bdf8'} onMouseLeave={e => e.currentTarget.style.color='#e2e8f0'}>
													<div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0 }}>
														<FaEnvelope style={{ fontSize: '13px' }} />
													</div>
													<span>empireesttates@gmail.com</span>
												</a>

												<div style={{ color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '12px', lineHeight: '1.5' }}>
													<div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', flexShrink: 0, marginTop: '2px' }}>
														<FaMapMarkerAlt style={{ fontSize: '13px' }} />
													</div>
													<span>Plot No. 12 Audco Nagar 3rd Main Road, Kattupakkam, Poonamallee, Chennai - 600056</span>
												</div>
											</div>

										</div>

										{/* Floating Leadership Badge */}
										<div style={{ position: 'absolute', top: '-15px', right: '-10px', zIndex: 3, background: '#0284c7', color: '#ffffff', padding: '10px 18px', borderRadius: '50px', boxShadow: '0 10px 25px rgba(2, 132, 199, 0.4)', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #ffffff' }}>
											<FaAward style={{ fontSize: '20px', color: '#ffffff' }} />
											<div>
												<span style={{ fontSize: '15px', fontWeight: '800', display: 'block', lineHeight: 1 }}>23+ Years</span>
												<span style={{ fontSize: '9.5px', textTransform: 'uppercase', opacity: 0.9, letterSpacing: '0.5px' }}>Excellence</span>
											</div>
										</div>
									</div>
								</div>

								{/* Founder Content Column */}
								<div className="col-lg-7 col-md-12 m-b20 reveal-right" style={{ paddingLeft: '30px' }}>
									<div className="section-head style-1 m-b20">
										<span className="text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '2px', color: '#0284c7', fontSize: '13px' }}>MEET OUR MANAGING PARTNER</span>
										<h2 className="title font-weight-700 m-b10" style={{ color: '#0f172a', fontSize: '34px' }}>T. Karthik Prakash <span style={{ fontSize: '18px', color: '#64748b', fontWeight: '600' }}>D.C.E., M.B.A.</span></h2>
										<p style={{ color: '#0284c7', fontWeight: '700', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Managing Partner | Civil Engineer</p>
										<div className="dlab-separator bg-primary m-b20" style={{ width: '60px', height: '4px', background: '#0284c7', borderRadius: '2px' }}></div>
									</div>

									{/* Quote Banner */}
									<div className="m-b25" style={{ background: '#ffffff', padding: '20px 24px', borderLeft: '4px solid #0284c7', borderRadius: '0 12px 12px 0', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.08)' }}>
										<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
											<FaQuoteLeft style={{ color: '#0284c7', fontSize: '24px', flexShrink: 0, marginTop: '2px' }} />
											<p style={{ fontStyle: 'italic', color: '#1e293b', fontSize: '16px', lineHeight: '1.7', margin: 0, fontWeight: '500' }}>
												"Building a home is far more than an engineering project; it is about building trust, creating lasting family legacies, and giving every buyer absolute peace of mind with 100% legal title clarity and structural perfection."
											</p>
										</div>
									</div>

									{/* Detailed Bio Paragraphs */}
									<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#475569', fontSize: '15px', textAlign: 'justify', marginBottom: '15px' }}>
										Established in <strong>2001</strong> by <strong>T. Karthik Prakash (D.C.E., M.B.A.)</strong>, a seasoned civil engineer and business leader with extensive hands-on expertise in Chennai’s real estate and construction sectors, <strong>Empire Esttates</strong> was built on a foundation of structural integrity, engineering innovation, and customer-first ethics.
									</p>
									<p className="font-16 text-black" style={{ lineHeight: '1.8', color: '#475569', fontSize: '15px', textAlign: 'justify', marginBottom: '25px' }}>
										Under his visionary stewardship as Managing Partner over the past <strong>23+ years</strong>, Empire Esttates has successfully delivered over <strong>1000+ residential houses</strong> and <strong>250+ housing units</strong> across prime growth hubs including Kattupakkam, Poonamallee, Valasaravakkam, Porur, Avadi, and Thiruvallur. Mr. Karthik Prakash personally ensures that every layout, foundation, and structural slab adheres strictly to civil engineering benchmarks and DTCP/CMDA approvals.
									</p>

									{/* Core Leadership Highlights Grid */}
									<div className="row m-b10">
										<div className="col-sm-6 m-b15">
											<div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
												<div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0 }}>
													<FaCheckCircle style={{ fontSize: '18px' }} />
												</div>
												<div>
													<h6 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>D.C.E., M.B.A.</h6>
													<span style={{ fontSize: '12px', color: '#64748b' }}>Civil Engineering &amp; Management</span>
												</div>
											</div>
										</div>

										<div className="col-sm-6 m-b15">
											<div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
												<div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0 }}>
													<FaShieldAlt style={{ fontSize: '18px' }} />
												</div>
												<div>
													<h6 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>100% Legal Transparency</h6>
													<span style={{ fontSize: '12px', color: '#64748b' }}>Clear Titles &amp; CMDA Approvals</span>
												</div>
											</div>
										</div>

										<div className="col-sm-6 m-b15">
											<div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
												<div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0 }}>
													<FaAward style={{ fontSize: '18px' }} />
												</div>
												<div>
													<h6 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>1000+ Homes Built</h6>
													<span style={{ fontSize: '12px', color: '#64748b' }}>Proven Track Record</span>
												</div>
											</div>
										</div>

										<div className="col-sm-6 m-b15">
											<div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
												<div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0 }}>
													<FaUserFriends style={{ fontSize: '18px' }} />
												</div>
												<div>
													<h6 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Customer First</h6>
													<span style={{ fontSize: '12px', color: '#64748b' }}>On-Time &amp; Transparent</span>
												</div>
											</div>
										</div>
									</div>


								</div>
							</div>
						</div>
					</section>

					{/* Section-1: Professional Strengths */}
					<section className="content-inner bg-light" style={{ padding: '40px 0 60px 0' }}>
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
					<section className="bg-white content-inner" style={{ padding: '50px 0 70px 0' }}>
						<div className="container">
							<div className="row justify-content-center align-items-stretch">
								{this.state.stats.map((data, index) => {
									const total = this.state.stats.length;
									const colClass = total === 1 
										? 'col-lg-6 col-md-8 col-12 mb-4' 
										: total === 2 
										? 'col-lg-5 col-md-6 col-sm-6 col-12 mb-4' 
										: total === 3 
										? 'col-lg-4 col-md-4 col-sm-6 col-12 mb-4' 
										: 'col-lg-3 col-md-6 col-sm-6 col-12 mb-4';

									return (
										<div className={colClass} key={data.id || index}>
											<div 
												style={{
													height: '100%',
													maxWidth: '280px',
													margin: '0 auto',
													padding: '26px 20px',
													borderRadius: '16px',
													background: '#ffffff',
													border: '1.5px solid #e2e8f0',
													boxShadow: '0 4px 20px rgba(2, 132, 199, 0.06)',
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													justifyContent: 'center',
													textAlign: 'center',
													transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
												}}
												onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(2, 132, 199, 0.15)'; }}
												onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(2, 132, 199, 0.06)'; }}
											>
												<div 
													style={{ 
														width: '56px', 
														height: '56px', 
														borderRadius: '50%', 
														background: 'rgba(2, 132, 199, 0.1)', 
														display: 'flex', 
														alignItems: 'center', 
														justifyContent: 'center',
														marginBottom: '14px',
														flexShrink: 0
													}}
												>
													{renderStatIcon(data.icon)}
												</div>
												<div style={{ fontSize: '34px', fontWeight: '800', color: '#0284c7', lineHeight: '1.2', marginBottom: '6px' }}>
													<CountUp end={data.count !== undefined ? data.count : (data.num || 0)} duration={4}/>
													{data.suffix !== undefined ? data.suffix : (data.num === 100 ? '%' : '+')}
												</div>
												<span style={{ fontSize: '13px', fontWeight: '700', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>
													{data.title}
												</span>
											</div>
										</div>
									);
								})}
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
									<Link 
										to="/contact-us" 
										style={{ 
											display: 'inline-flex',
											alignItems: 'center',
											justifyContent: 'center',
											gap: '10px',
											backgroundColor: '#ffffff', 
											color: '#0284c7', 
											fontWeight: '800', 
											fontSize: '14px',
											padding: '14px 28px', 
											borderRadius: '50px', 
											textTransform: 'uppercase', 
											letterSpacing: '0.5px',
											textDecoration: 'none', 
											border: '2px solid #ffffff',
											boxShadow: '0 8px 25px rgba(0, 0, 0, 0.18)',
											transition: 'all 0.3s ease' 
										}}
										onMouseEnter={e => {
											e.currentTarget.style.backgroundColor = 'transparent';
											e.currentTarget.style.color = '#ffffff';
											e.currentTarget.style.borderColor = '#ffffff';
											e.currentTarget.style.transform = 'translateY(-2px)';
										}}
										onMouseLeave={e => {
											e.currentTarget.style.backgroundColor = '#ffffff';
											e.currentTarget.style.color = '#0284c7';
											e.currentTarget.style.borderColor = '#ffffff';
											e.currentTarget.style.transform = 'translateY(0)';
										}}
									>
										<span style={{ color: 'inherit' }}>Contact Us</span>
										<FaArrowRight style={{ fontSize: '13px', color: 'inherit' }} />
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
