import React,{Fragment ,Component} from 'react';
import {Link} from 'react-router-dom';
import TestimonialsSlider from './../../Element/TestimonialsSlider';


class TestimonialsSection extends Component{
	render(){
		return(
			<Fragment>
				{/* Testimonials Section Start */}				
				<div className="container">
					<div className="row align-items-end section-head">
					<div className="col-md-12 text-center">
						<h2 className="title">Client Testimonials</h2>
						<div className="dlab-separator bg-primary" style={{margin: '0 auto'}}></div>
						<p className="mb-3 mb-md-0">See why our residents and investors call our communities home. Read stories of trust, quality infrastructure, and clear legal approvals.</p>
					</div>
				</div>
					{/* Testimonials Carousel Start */}	
						<TestimonialsSlider />
					{/* Testimonials Carousel End */}	
				</div>
				{/* Testimonials Section End */}
			</Fragment>
		)
	}
}
export default TestimonialsSection;
