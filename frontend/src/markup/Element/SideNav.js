import React,{Component} from 'react';
import { Link } from "react-scroll";

class SideNav extends Component{
	render(){
		return(
			<>
				<ul className="navbar">
					<li>
						<Link
							activeClass="active"  to="sidenav_home" smooth={true} offset={-70} duration={500} className="scroll nav-link " >
							<SideNavIcon type="home" /> <span className="text-white">Home</span>
						</Link>
					</li>
					<li>	
						<Link 
							activeClass="active" to="sidenav_specifications" className="scroll nav-link" smooth={true} offset={-70} duration={500}>
							<SideNavIcon type="file" /> <span className="text-white">specifications</span>
						</Link>
					</li>
					<li>
						<Link 
							activeClass="active" to="sidenav_aboutUs" className="scroll nav-link "  smooth={true} offset={-70} duration={500} >
							<SideNavIcon type="user" /> <span className="text-white">ABOUT US</span>
						</Link>
					</li>

					<li>
						<Link 
							activeClass="active" to="sidenav_mainGallery" className="scroll nav-link"  smooth={true} offset={-70} duration={500} >
							<SideNavIcon type="image" /> <span className="text-white">Gallery</span>
						</Link>
					</li>
					<li>
						<Link 
							activeClass="active" to="sidenav_ourServices" className="scroll nav-link"  smooth={true} offset={-70} duration={500} >
							<SideNavIcon type="cog" /> <span className="text-white">Our Services</span>
						</Link>
					</li>
					<li>
						<Link 
							activeClass="active" to="sidenav_blogs" className="scroll nav-link"  smooth={true} offset={-70} duration={500}  >
							<SideNavIcon type="blog" /> <span className="text-white">Blogs</span>
						</Link>
					</li>
					<li>
						<Link 
							activeClass="active" to="sidenav_footer" className="scroll nav-link"  smooth={true} offset={-70} duration={500} >
							<SideNavIcon type="phone" /> <span className="text-white">Contact Us</span>
						</Link>
					</li>
				</ul>
			</>
		)
	}
}

const SideNavIcon = ({ type }) => {
	const common = {
		width: 18,
		height: 18,
		viewBox: '0 0 24 24',
		fill: 'none',
		xmlns: 'http://www.w3.org/2000/svg',
		style: { color: '#fff', flexShrink: 0 },
		'aria-hidden': true,
	};

	const icons = {
		home: <path d="M4 10.5 12 4l8 6.5V20h-5v-5H9v5H4v-9.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
		file: <path d="M7 3h7l4 4v14H7V3z M14 3v5h5 M9.5 12h5 M9.5 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
		user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M5 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
		image: <path d="M4 5h16v14H4V5z M7 16l3.5-4 3 3 2-2.5L19 16 M8 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
		cog: <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z M19 12a7 7 0 0 0-.1-1.1l2-1.5-2-3.4-2.4 1a7.6 7.6 0 0 0-1.9-1.1L14.2 3h-4.4l-.4 2.9A7.6 7.6 0 0 0 7.5 7L5.1 6l-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.1l-2 1.5 2 3.4 2.4-1c.6.5 1.2.8 1.9 1.1l.4 2.9h4.4l.4-2.9c.7-.3 1.3-.6 1.9-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1.1z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />,
		blog: <path d="M5 4h14v16H5V4z M8 8h8 M8 12h8 M8 16h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
		phone: <path d="M6.5 4h3l1.5 4-2 1.2c1 2 2.7 3.7 4.8 4.8L15 12l4 1.5v3c0 1-.8 1.8-1.8 1.8C10 18.3 4.7 13 4.7 5.8 4.7 4.8 5.5 4 6.5 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
	};

	return <svg {...common}>{icons[type]}</svg>;
};

export default SideNav;
