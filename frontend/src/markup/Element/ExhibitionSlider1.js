import React, {Component} from 'react';
import Slider from "react-slick";


import  galery1 from './../../images/gallery/gallery-6/pic1.jpg';
import  galery2 from './../../images/gallery/gallery-6/pic2.jpg';
import  galery3 from './../../images/gallery/gallery-6/pic3.jpg';
import  galery4 from './../../images/gallery/gallery-6/pic4.jpg';


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

class ExhibitionSlider1 extends Component{
	
	render(){
		var settings = {		
			arrows: true,
			dots: true,
            slidesToShow: 1,			
            infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 1,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 576,
				  settings: {
					slidesToShow: 1,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				}
			]
        };
		return(
			
				<Slider className="exhibition-carousel owl-carousel owl-none m-b30 " {...settings}>
					<div className="item"><img className="w-100" src={galery1} alt="" /></div>
					<div className="item"><img className="w-100" src={galery2} alt="" /></div>
					<div className="item"><img className="w-100" src={galery3} alt="" /></div>
					<div className="item"><img className="w-100" src={galery4} alt="" /></div>
				</Slider>
				
				
				
		)
		
	}
	
}

export default ExhibitionSlider1;