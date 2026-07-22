import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";
import gatedPlotsAerial from './../../images/projects/gated_plots_aerial.png';
import villaPlotDesign from './../../images/projects/villa_plot_design.png';
import plotsEntrance from './../../images/projects/plots_entrance.png';
import plotsParkLayout from './../../images/projects/plots_park_layout.png';

const latestBlog = [
	{ 
		image: gatedPlotsAerial,
		title: "Gated Layout",
		icon: "ti-map-alt"
	},
	{ 
		image: villaPlotDesign,
		title: "Villa Design",
		icon: "ti-home"
	},
	{ 
		image: plotsEntrance,
		title: "Entrance Plaza",
		icon: "ti-layout"
	},
	{ 
		image: plotsParkLayout,
		title: "Landscaped Park",
		icon: "ti-location-pin"
	},
]
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
  	<div className="owl-nav">
		<div className="owl-next fa fa-angle-right"  onClick={onClick}/>
	</div>	
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
	<div className="owl-nav">
		<div className=" owl-prev fa fa-angle-left" onClick={onClick} style={{zIndex:1 }}/>
	</div>
  );
}

class Slider1 extends Component{
	render(){
		var settings = {		
			arrows: false,
			centerMode: true,
			centerPadding: "500px",
            slidesToShow: 1,
			speed: 1500,
			navSpeed: 3000,		
            infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
				  breakpoint: 1920,
				  settings: {
					slidesToShow: 1,
					centerPadding: "400px",
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
					centerPadding: "250px",
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 1,
					centerPadding: "250px",
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 1,
					centerPadding: "200px",
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 600,
				  settings: {
					slidesToShow: 1,
					centerPadding: "90px",
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				}
			]
        };
		return(
			
				<Slider className="amenities-carousel owl-carousel owl-btn-center-lr " {...settings}>
					{latestBlog.map((item, index) => (
						<div className="items" key={index}>
							<div className="amenit-box" >
								<div className="media">
									<Link to={"#"} style={{width:"100%" }}><img src={item.image} alt={item.title} style={{width:"100%" }}/></Link>
								</div>
								<div className="info">
									<h5 className="title">
										<i className={item.icon}></i>
										<span><Link to={"./project-detail-1"}>{item.title}</Link></span>
									</h5>
								</div>
							</div>
						</div>
					))}	
				</Slider>
			
				
		)
		
	}
	
}

export default Slider1;
						
						