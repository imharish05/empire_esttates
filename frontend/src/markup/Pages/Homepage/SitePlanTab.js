import React,{Fragment,  useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import icon1 from './../../../images/icons/icon-1.png';
import icon2 from './../../../images/icons/icon-2.png';
import icon3 from './../../../images/icons/icon-3.png';
import icon4 from './../../../images/icons/icon-4.png';
import plan1 from './../../../images/plan/pic1.jpg';
import plan2 from './../../../images/plan/pic2.jpg';
import { FaPhoneVolume } from '../../../icons';

const SitePlanTab = (props) => {
	const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
	
	 let resizeMargin = () => {
		//var  containerSize = document.querySelector('.container');
		 //alert(window.innerWidth);	
		
		//var elmnt = document.getElementsByClassName('container');
		var screenWidth = window.innerWidth;
		if(screenWidth >= 1280 ){
			var elmnt = document.querySelector('.container');
			var containerSize = elmnt.offsetWidth;
			//var containerSize = elmnt.clientWidth;
			
			//alert(screenWidth+' '+containerSize);
			var getMargin = (screenWidth - containerSize)/2;
			//$('.setResizeMargin').css('margin-left',getMargin);
			document.getElementsByClassName('setResizeMargin')[0].setAttribute("style", 'margin-left:'+getMargin+'px'); 
		}
	};
		/*window.innerWidth.length>0 && window.innerWidth >= 1280
		
		
		var getMargin = (screenWidth - containerSize)/2;
		
		('.setResizeMargin').css('margin-left',getMargin);
	};*/
	 useEffect(() => {
		resizeMargin();
	  }, []); 
	  
	  
	return(
		<Fragment>
			<div className="setResizeMargin master-plan">
				<div className="row">
					<div className="col-md-12 col-lg-6">
						<div className="section-head">
							<h2 className="title" >SITE PLAN & MASTER PLAN</h2>
							<div className="dlab-separator bg-primary"></div>
							<p>With premium finishes and wide-open spaces, each floor plan brings you unparalleled luxury without sacrificing on comfort. Floor plans are artist’s rendering. All dimensions are approximate.</p>
						</div>	
						<div className="row">
							<div className="col-md-4 col-sm-4">
								<ul className="nav plan-tabs"  id="myTab" role="tablist">
									<li	className="nav-item " >
										<a className= {classnames({ active : activeTab === '1' }) + ' nav-link'}  onClick={() => { toggle('1'); }}	
										id="main-tab" data-toggle="tab"  role="tab" aria-controls="main" aria-selected="true">40’ x 90’ East</a>
									</li>
									 <li className="nav-item">
										<a	className={classnames({ active: activeTab === '2' }) + ' nav-link'} onClick={() => { toggle('2'); }}  
											id="profile-tab" data-toggle="tab"  role="tab" aria-controls="profile" 	aria-selected="false">35’ x 70’ East
										</a>
									</li>
									 <li className="nav-item">
										<a className={classnames({ active: activeTab === '3' }) + ' nav-link'} 	onClick={() => { toggle('3'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">35’ x 70, West</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '4' }) + ' nav-link'} 	onClick={() => { toggle('4'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">Master Plan</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '5' }) + ' nav-link'} 	onClick={() => { toggle('5'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">50’ x 100’ East</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '6' }) + ' nav-link'} 	onClick={() => { toggle('6'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">40’ x 70’ East</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '7' }) + ' nav-link'} 	onClick={() => { toggle('7'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">40’ x 70’ East</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '8' }) + ' nav-link'} 	onClick={() => { toggle('8'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">40’ x 70’ East</a>
									</li>
									<li className="nav-item">
										<a className={classnames({ active: activeTab === '9' }) + ' nav-link'} 	onClick={() => { toggle('9'); }} 
										 id="contact-tab" data-toggle="tab"  role="tab" aria-controls="contact" aria-selected="false">40’ x 70’ East</a>
									</li>
								</ul>
							</div>
							<div className="col-md-8 col-sm-8">
								<TabContent activeTab={activeTab}>
									<TabPane tabId="1">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">39.7 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1125.25 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low.</p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1814.73</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>02</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>02</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>	
									<TabPane tabId="2">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">32.8 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1280.87 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low.</p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1550.15</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>02</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>01</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="3">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">31.9 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1198.36 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low. </p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1235.45</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>03</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>02</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>01</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="4">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">31.9 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">3 BHK Type-1 Unit Plan, SBUA = 1425.65 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low. </p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1510.24</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>03</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>02</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="5">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">45.2 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">4 BHK Type-1 Unit Plan, SBUA = 1590.85 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low. </p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1595.73</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>04</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>03</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="6">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">45.2 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">4 BHK Type-1 Unit Plan, SBUA = 1165.28 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low. </p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1165.55</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>02</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>02</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>01</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="7">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">32.8 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1280.87 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low.</p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1550.15</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>02</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>01</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="8">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">31.9 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1198.36 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low. </p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1235.45</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>03</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>02</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>01</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
									<TabPane tabId="9">
										<div className="plan-contant ">
											<div className="section-head">
												<h2 className="title">39.7 Lac</h2>
												<h4 className="mb-lg-2 mb-xl-4">2 BHK Type-1 Unit Plan, SBUA = 1125.25 SQ.FT</h4>
												<p>USP: Reduced energy usage and costs, Reduced water usage through low flow fixtures, Improved indoor air quality through the usage of low.</p>
											</div>
											<ul className="flat-plan">
												<li>
													<img src={icon1} alt=""/>
													<h3>1814.73</h3>
													<span>Square Feet</span>
												</li>
												<li>
													<img src={icon2} alt=""/>
													<h3>02</h3>
													<span>Bathrooms</span>
												</li>
												<li>
													<img src={icon3} alt=""/>
													<h3>03</h3>
													<span>Bedrooms</span>
												</li>
												<li>
													<img src={icon4} alt=""/>
													<h3>02</h3>
													<span>Balcony</span>
												</li>
											</ul>
											<Link to={"#"} className="call-planner"><FaPhoneVolume />0800-123456</Link>
										</div>
									</TabPane>
								</TabContent>	
							</div>
						</div>
					</div>
					<div className="col-md-12 col-lg-6">
						<TabContent activeTab={activeTab} className="plan-preview" >
							<TabPane tabId="1">
								<div className="tab-pane fade show active"  role="tabpanel" aria-labelledby="main-tab">
									<img src={plan1} alt=""/>
								</div>
							</TabPane>	
							<TabPane tabId="2">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="profile-tab">
									<img src={plan2} alt=""/>
								</div>
							</TabPane>	
							<TabPane tabId="3">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan1} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="4">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan2} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="5">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan1} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="6">
								<div className="tab-pane fade show" role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan2} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="7">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan1} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="8">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan2} alt=""/>
								</div>
							</TabPane>
							<TabPane tabId="9">
								<div className="tab-pane fade show"  role="tabpanel" aria-labelledby="contact-tab">
									<img src={plan1} alt=""/>
								</div>
							</TabPane>
								
						</TabContent>	
					</div>
				</div>
			</div>
		</Fragment>
	)
	
}	
export default SitePlanTab;