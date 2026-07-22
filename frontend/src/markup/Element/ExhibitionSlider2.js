import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import  bnr2 from './../../images/banner/bnr2.jpg';
import  bnr3 from './../../images/banner/bnr3.jpg';
import Carousel from 'react-bootstrap/Carousel'

class ExhibitionSlider2 extends Component{
	  constructor(props) {
		  super(props);
            this.state = {
                index: 1, 
                direction: null ,
                nextIcon: <div>	<i className="fa fa-arrow-right" />Next</div>,
                prevIcon: <div>	<i className=" fa fa-arrow-left" />Prev</div>,
            }
        }
	
	render(){
		const {nextIcon,prevIcon}=this.state;
		return(
			<Carousel
				indicators= {false}
				className="project-carousel-1 project-style-2 owl-carousel " 
				nextIcon ={nextIcon} 
				prevIcon={prevIcon}
				autoplay={true}
				interval={5000}
			>
					
				<Carousel.Item>
					<div className="project-info-box ">
						<div className="project-media">
							<img src={bnr2} alt=""/>
						</div>
						<div className="project-content " >
							<ul className="list-details">
								<li>
									<strong>Clients:</strong>
									<span>Ethan Hunt</span>
								</li>
								<li>
									<strong>Completion:</strong>
									<span>February 5th, 2017</span>
								</li>
								<li>
									<strong>Project Type:</strong>
									<span>Villa, Residence</span>
								</li>
								<li>
									<strong>Architects:</strong>
									<span>Logan Cee</span>
								</li>
								<li>
									<Link to={"/project-1"} className="btn btn-primary">View Projects</Link>
								</li>
							</ul>
						</div>
					</div>	
				</Carousel.Item>
		
				<Carousel.Item>
					<div className="project-info-box ">
						<div className="project-media">
							<img src={bnr3} alt=""/>
						</div>
						<div className="project-content " >
							<ul className="list-details">
								<li>
									<strong>Clients:</strong>
									<span>Ethan Hunt</span>
								</li>
								<li>
									<strong>Completion:</strong>
									<span>February 5th, 2017</span>
								</li>
								<li>
									<strong>Project Type:</strong>
									<span>Villa, Residence</span>
								</li>
								<li>
									<strong>Architects:</strong>
									<span>Logan Cee</span>
								</li>
								<li>
									<Link to={"/project-1"} className="btn btn-primary">View Projects</Link>
								</li>
							</ul>
						</div>
					</div>
				</Carousel.Item>
					
			</Carousel>
		)
		
	}
	
}

export default ExhibitionSlider2;