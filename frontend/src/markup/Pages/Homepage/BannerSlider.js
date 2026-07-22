import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import  bnr3 from './../../../images/main-slider/slide3.jpg';
import  bnr4 from './../../../images/main-slider/slide4.jpg';
import Carousel from 'react-bootstrap/Carousel'

class BannerSlider extends Component{	
	render(){
		return(
			<Carousel
				controls={false}
				className="home-slider-2" 
				autoplay={true}
				interval={5000}
				slideshowSpeed={5000}
			>
					
				<Carousel.Item>
					<div className="overlay-black-middle ">
						<div className="project-media">
							<img src={bnr3} alt="" style={{width:"100%" }}/>
						</div>
						<div className="slider-content ">
							<div className="slide-content-box container-fluid">
								<div className="slide-content-area">
									<h2 className="slider-title text-white">APARTMENTS</h2>
									<p className="">
										Industry is ready to help you in making unique-looking and best website in a moment.
									</p>
									<Link to={"/contact-us"} className="btn-transparent">
										<span>Read More</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Carousel.Item>
				<Carousel.Item>
					<div className="overlay-black-middle ">
						<div className="project-media">
							<img src={bnr4} alt="" style={{width:"100%" }}/>
						</div>
						
						<div className="slider-content ">
							<div className="slide-content-box container-fluid">
								<div className="slide-content-area">
									<h2 className="slider-title text-white">MODERN HOME</h2>
									<p className="">
										Industry is ready to help you in making unique-looking and best website in a moment.
									</p>
									<Link to={"/contact-us"} className="btn-transparent">
										<span>Read More</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Carousel.Item>
					
			</Carousel>
		)
		
	}
	
}

export default BannerSlider;