import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox';
import {SRLWrapper, useLightbox} from 'simple-react-lightbox'; 
import { FaPlay } from '../../../icons';

//Light Gallery on icon click 
const Iconimage = props => {
	const { openLightbox } = useLightbox()
	
  return (
    <Link  to={"#"} onClick={() => openLightbox(props.imageToOpen)} className="lightimg " >
      <i className="ti-zoom-in icon-bx-xs"></i>
    </Link>
  )
}


const BlogPage =({imageType})=>{
	return(
		<>
			<div className="dlab-media dlab-img-overlay1 dlab-img-effect"> 
				<img src={imageType} alt="" /> 
				<div className="overlay-bx">
					<Iconimage />
				</div>
			</div>
		</>
	)
}


class Data extends Component{
	render(){
		return(
			<Fragment>
			</Fragment>
		)
	}
} 

const detailBlog = [
	{icon: <i className="ti ti-user" />, 			title:'CLIENT',    subtitle: 'Martin Stewart' },	
	{icon: <i className="ti ti-user" />, 			title:'ARCHITECT', subtitle: 'Jimmy Smith' },	
	{icon: <i className="ti ti-location-pin" />, 	title:'LOCATION',  subtitle: 'London, UK' },	
	{icon: <i className="ti ti-ruler-alt-2" />, 	title:'SIZE',      subtitle: '1,200m' },		
	{icon: <i className="ti ti-home" />, 			title:'TYPE',      subtitle: 'Residential Project' },	
];

function ProDetail(){
	return(
		<>
			{detailBlog.map((data,index)=>(
				<div className="col p-lr0" key={index}>
					<div className="pro-details">{data.icon}<strong>{data.title}</strong> {data.subtitle}</div>
				</div>
			))}	
		</>
	)
}

function ButtonPara(){
	return(
		<>
			<div className="row">
				<div className="col-lg-6 m-b30">
					<p className="m-b0">
						Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Drinking vinegar jean vinegar stumptown yr pop-up artisan.
					</p>
				</div>
				<div className="col-lg-6 m-b30">
					<p className="m-b0">
						Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Drinking vinegar jean vinegar stumptown yr pop-up artisan.
					</p>
				</div>
			</div>
			<div className="text-center">
				<a href="https://www.youtube.com/watch?v=Dj6CKxQue7U" className="popup-youtube m-r20 video btn btn-primary btn-video">
					<FaPlay /><span></span>
				</a>
				<Link to={"/contact-us-1"} className="btn btn-primary">Contact us<span></span></Link>
			</div>
		</>
	)
}

export {ProDetail, ButtonPara, BlogPage};
export default Data; 