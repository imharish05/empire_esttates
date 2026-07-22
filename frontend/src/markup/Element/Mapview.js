import React,{Fragment, Component } from 'react';
import map from './../../images/map.jpg';
import sitemap from './../../images/sitemap.jpg';


class Mapview extends Component{
	render(){
		return(
			<Fragment>
			<div className="map-view">
				<div className="row spno">
					<div className="col-md-6"><img src={map} alt=""/></div>
					<div className="col-md-6"><img src={sitemap} alt=""/></div>
				</div>
			</div>	
			</Fragment>
		)
	}
}
export default Mapview;