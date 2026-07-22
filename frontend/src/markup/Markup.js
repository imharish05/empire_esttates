import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Index1 from './Pages/Homepage/Index1';
import Aboutus from './Pages/Aboutus/Aboutus';
import Portfolio2 from './Pages/Portfolio/Portfolio2';
import ProjectDetail1 from './Pages/ProjectDetail/ProjectDetail1';
import ServicesDetails from './Pages/ServicesDetails';
import ContactUs1 from './Pages/Contact/ContactUs1';
import BlogsPage from './Pages/Blogs/BlogsPage';
import Layouts from './Pages/Layouts';
import Elevations from './Pages/Elevations';

//ScrollToTop
import ScrollToTop from './Element/ScrollToTop';

class Markup extends Component{
	render(){
		return(
			<BrowserRouter basename="/">
                <div className="page-wraper">
                    <Switch>
                        <Route path='/' exact component={Index1} />
						<Route path='/about-us' exact component={Aboutus} />
						<Route path='/about us' exact component={Aboutus} />
						<Route path='/about%20us' exact component={Aboutus} />
						<Route path='/projects' exact component={Portfolio2} />
						<Route path='/ongoing-projects' exact component={Portfolio2} />
						<Route path='/project-detail-1' exact component={ProjectDetail1} />
						<Route path='/services' exact component={ServicesDetails} />
						<Route path='/services-details' exact component={ServicesDetails} />
						<Route path='/services-details/:slug' exact component={ServicesDetails} />
						<Route path='/contact-us' exact component={ContactUs1} />
						<Route path='/blogs' exact component={BlogsPage} />
						<Route path='/blogs/:slug' exact component={BlogsPage} />
						<Route path='/layouts' exact component={Layouts} />
						<Route path='/elevation' exact component={Elevations} />
					</Switch>
                </div>
				<ScrollToTop />
            </BrowserRouter>	
		)
	}
}

export default Markup;