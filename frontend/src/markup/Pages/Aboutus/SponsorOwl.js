import React, { Component } from 'react'
import Slider from "react-slick";
import logo1 from './../../../images/logo/logo1.jpg';
import logo2 from './../../../images/logo/logo2.jpg';
import logo3 from './../../../images/logo/logo3.jpg';
import logo4 from './../../../images/logo/logo4.jpg';
import logo5 from './../../../images/logo/logo5.jpg';
import logo6 from './../../../images/logo/logo6.jpg';

const aboutBlog = [
    {  image: logo1,  },
    {  image: logo2,  },
    {  image: logo3,  },
    {  image: logo4,  },
    {  image: logo5,  },
    {  image: logo6,  },  
    {  image: logo2,  },  
]

/* function SampleNextArrow(props) {
  const { onClick } = props;
  return (
  	<div className="owl-nav">
		<div className="owl-next fa fa-angle-right "  onClick={onClick}/>
	</div>	
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
	<div className="owl-nav">
   <div className=" owl-prev fa fa-angle-left " onClick={onClick}/>
	</div>
  );
}
 */
class Detail3Owl extends Component {

    render() {
        var settings = {
            dots: false,
			arrows: false,
            slidesToShow: 6,
            infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 5,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 5,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 4,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				},
				{
				  breakpoint: 576,
				  settings: {
					slidesToShow: 2,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 5000,
				  }
				}
			]
        };
        return (
            <>		
				<Slider className="client-logo owl-carousel owl-none" {...settings}>
					{aboutBlog.map((item, index) => (
						<div className="item">
							<div className="client-logo-inner">
								<img src={item.image} alt="" />
							</div>
						</div>	
					))}
				</Slider>	
			</>
        )
    }
}
export default Detail3Owl;