import React, {Component} from 'react';
import Slider from "react-slick";
import  pic1 from './../../../images/gallery/carousel/pic1.jpg';

const galleryBlog = [
	{ image: pic1,	 },
	{ image: pic1,	 },
	{ image: pic1,	 },
]
class Siteslider extends Component{
	render(){
		var settings = {		
			arrows: false,
            slidesToShow: 1,			
            infinite: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 3,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 2,
				  }
				},
				{
				  breakpoint: 576,
				  settings: {
					slidesToShow: 1,
				  }
				}
			]
        };
		return(
			<Slider className="owl-carousel owl-theme owl-none owl-dots-none gallery-top " {...settings}>
				{galleryBlog.map((item, index) => (
					<div className="item" key={index}>
						<div className="gallery-media">
							<img src={item.image} alt=""  style={{width:"100%"}}  />
							<h4 className="title">40 X 70 East Side FF</h4>
						</div>
					</div>
				))}	
			</Slider>	
		)
	}
}
export default Siteslider;