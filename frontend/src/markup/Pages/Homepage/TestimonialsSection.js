import React, { Component } from 'react';
import TestimonialsSlider from './../../Element/TestimonialsSlider';

class TestimonialsSection extends Component {
	render() {
		return (
			<section className="content-inner" style={{ padding: '80px 0', background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)', borderTop: '1px solid rgba(2, 132, 199, 0.1)', borderBottom: '1px solid rgba(2, 132, 199, 0.1)' }}>
				<div className="container">
					<div className="section-head text-center style-1" style={{ marginBottom: '50px' }}>
						<span className="text-uppercase font-weight-600 m-b10 d-block" style={{ letterSpacing: '2px', color: '#0284c7', fontSize: '13px' }}>
							CLIENT TESTIMONIALS
						</span>
						<h2 className="title font-weight-700 m-b15" style={{ color: '#0f172a', fontSize: '36px' }}>
							What Our Valued Clients Say
						</h2>
						<p style={{ color: '#64748b', fontSize: '16px', maxWidth: '650px', margin: '0 auto 20px auto' }}>
							See why our residents and investors call our developments home. Read stories of trust, quality infrastructure, and clear legal titles.
						</p>
						<div className="dlab-separator bg-primary m-b20 mx-auto" style={{ width: '60px', height: '4px', background: '#0284c7', borderRadius: '2px' }}></div>
					</div>
					<TestimonialsSlider />
				</div>
			</section>
		);
	}
}

export default TestimonialsSection;
