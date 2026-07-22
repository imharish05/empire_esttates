import React, { Fragment, useState, useEffect } from 'react';
import WOW from 'wowjs';
import Header from './../../Layout/Header';
import Footer2 from './../../Layout/Footer2';
import PageTitle from './../../Layout/PageTitle';
import { applyMetaTags } from '../../../utils/meta';
import { footerConfig } from './../../Layout/footerConfig';
import { FaMapMarkerAlt, FaRegEnvelope, FaPhone } from '../../../icons';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactUs1 = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        projectIdea: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        new WOW.WOW().init();
        applyMetaTags("Contact Us | Empire Estates", "Get in touch with Empire Estates for premium residential and commercial plot developments.");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
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

        try {
            const response = await fetch(`${API_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMessage({ text: 'Thank you! Your inquiry has been sent successfully.', type: 'success' });
                setFormData({ firstName: '', lastName: '', phone: '', email: '', projectIdea: '' });
                
                // Hide the message after 2 seconds
                setTimeout(() => {
                    setMessage({ text: '', type: '' });
                }, 2000);
            } else {
                setMessage({ text: 'Failed to send inquiry. Please try again later.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'An error occurred. Please check your connection and try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <Header isTransparent={true} />
            <div className="page-content bg-white">
                <PageTitle motherMenu="Contact Us" activeMenu="Contact Us" placement="Contact Us Banner" />
                {/*  Inner Page Banner */}
                <section className="content-inner-1" data-content="ABOUT US">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="section-head m-b30">
                                    <h2 className="title">Do You Have Any Question?</h2>
                                    <div className="dlab-separator bg-primary"></div>
                                    <h5 className="title-small">CONTACT US</h5>
                                </div>
                                <ul className="contact-question">
                                    <li>
                                        <div className="d-flex align-items-center mb-2" style={{ gap: '10px' }}>
                                            <FaMapMarkerAlt style={{ color: '#c8902a', fontSize: '20px' }} />
                                            <h4 className="title m-b0">Address</h4>
                                        </div>
                                        <p style={{ marginLeft: '30px' }}>{footerConfig.contact.address}</p>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center mb-2" style={{ gap: '10px' }}>
                                            <FaRegEnvelope style={{ color: '#c8902a', fontSize: '20px' }} />
                                            <h4 className="title m-b0">Email</h4>
                                        </div>
                                        <p style={{ marginLeft: '30px' }}>{footerConfig.contact.email}</p>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center mb-2" style={{ gap: '10px' }}>
                                            <FaPhone style={{ color: '#c8902a', fontSize: '20px' }} />
                                            <h4 className="title m-b0">Phone</h4>
                                        </div>
                                        <p style={{ marginLeft: '30px' }}>+91 {footerConfig.contact.phone}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-8 col-md-7 col-sm-12 m-b30">
                                <form className="contact-box dzForm p-a30 border-1" onSubmit={handleSubmit}>
                                    <h3 className="title-box">Write us a few words about your project and we’ll prepare a proposal for you within 24 hours</h3>
                                    
                                    {message.text && (
                                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} m-b20`}>
                                            {message.text}
                                        </div>
                                    )}

                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" required className="form-control" placeholder="First Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" required className="form-control" placeholder="Last Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="phone" value={formData.phone} onChange={handleChange} type="text" required className="form-control" placeholder="Phone" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <input name="email" value={formData.email} onChange={handleChange} type="email" className="form-control" required placeholder="Your Email Id" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <textarea name="projectIdea" value={formData.projectIdea} onChange={handleChange} rows="4" className="form-control" required placeholder="Tell us about your project or idea"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                                                {loading ? 'Sending...' : 'Get A Free Quote!'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Map Section */}
                <div className="map-iframe">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.4355240286336!2d80.11904173850938!3d13.043879096819543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261c78bae601f%3A0xca3348e9562b4b31!2sAudco%20Nagar%2C%20Trunk%20Rd%2C%20Murugapillai%20Nagar%2C%20Kattupakkam%2C%20Chennai%2C%20Kattuppakkam%2C%20Tamil%20Nadu%20600056!5e0!3m2!1sen!2sin!4v1784180063729!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0, marginBottom: '-7px', width: '100%' }} allowFullScreen="" loading="lazy" title="Empire Estates Location"></iframe>
                </div>
            </div>
            <Footer2 />
        </Fragment>
    );
};

export default ContactUs1;