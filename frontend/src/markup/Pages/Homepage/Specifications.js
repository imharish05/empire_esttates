import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import WOW from 'wowjs';
import { Accordion, Card } from 'react-bootstrap';


class Specifications extends Component{
	componentDidMount(){
		new WOW.WOW().init();	
		
		// SPECIFICATIONS Left Side hover 
		var faqCardHeader = document.querySelectorAll('.faqSpecifications .card-header a');
		var faqMedia = document.querySelectorAll('.faq-media img');
       
		var fch = [].slice.call(faqCardHeader);
		var fcMedia = [].slice.call(faqMedia);
		
        for (var y = 0; y < fch.length; y++) {
            fch[y].addEventListener('mouseenter', function () { 
				galleryActive(this);
			});
        }
        
		function galleryActive(current) {
            fcMedia.forEach(el => el.classList.remove('active'));
			setTimeout(() => {
				var dataImageBx = current.getAttribute('data-image-bx'); 
				document.querySelector('#'+dataImageBx).classList.add('active');
			}, 100);
		}

		// Auto scroll images
		var imageIds = ['Capmap1', 'Capmap2', 'Capmap3'];
		var currentIndex = 0;

		this.autoScrollInterval = setInterval(() => {
			fcMedia.forEach(el => el.classList.remove('active'));
			currentIndex = (currentIndex + 1) % imageIds.length;
			var nextImg = document.querySelector('#' + imageIds[currentIndex]);
			if (nextImg) {
				nextImg.classList.add('active');
			}
		}, 3000);
	}

	componentWillUnmount(){
		if (this.autoScrollInterval) {
			clearInterval(this.autoScrollInterval);
		}
	}

	render(){
		return(
			<Fragment>
				<div className="col-md-4 col-lg-4 col-xl-3 col-xxxl-2 faq-list">
					<Accordion defaultActiveKey="0" className="faqSpecifications">
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="0" data-image-bx="Capmap1">
									Our Story & Legacy
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="0" className="collapse faq-content">
								<Card.Body>At Empire Estates, we believe that land is more than just an asset — it is a legacy that grows with time. With over 5 years of excellence, we are a trusted name in premium plot development across Tamil Nadu.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="1" data-image-bx="Capmap2">
									CMDA & RERA APPROVED Plots
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="1" className="collapse faq-content">
								<Card.Body>100% legal, secured layouts ready for immediate villa construction or long-term investment growth. Our plots are carefully developed in high-growth locations including Padiyanallur, Kannapalayam, and Sorancheri.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="2" data-image-bx="Capmap3">
									Wide Blacktop Roads
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="2" className="collapse faq-content">
								<Card.Body>High-quality, wide internal roads providing seamless and clean access inside the community. Designed with premium connectivity and easy accessibility in mind for every resident and visitor.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="3" data-image-bx="Capmap1">
									Parks & Green Spaces
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="3" className="collapse faq-content">
								<Card.Body>Beautifully landscaped parks, children's play areas, and open recreational spaces where families can connect and thrive. Native tree planting along all roads adds a natural, refreshing environment.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="4" data-image-bx="Capmap2">
									24/7 Gated Security
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="4" className="collapse faq-content">
								<Card.Body>Fully secured gated community framework with 24/7 manned security, CCTV surveillance, and a grand entrance arch — ensuring total protection and complete peace of mind for every family.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="5" data-image-bx="Capmap3">
									Street Lights
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="5" className="collapse faq-content">
								<Card.Body>Modern street lighting across the entire layout ensures well-lit roads and enhanced night security. Underground electrical conduits keep the community clean, safe, and future-ready.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="6" data-image-bx="Capmap1">
									Clear Legal Documentation
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="6" className="collapse faq-content">
								<Card.Body>Every plot comes with 100% clear legal documentation and titles verified by top legal experts, ensuring our clients invest with complete confidence, zero stress, and total transparency.</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Card.Header>
								<Accordion.Toggle as={Link} className="collapsed" variant="link" eventKey="7" data-image-bx="Capmap2">
									Bank Loan Support
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey="7" className="collapse faq-content">
								<Card.Body>Our dedicated team provides end-to-end bank loan assistance from major nationalized and private banks — making the entire process smooth, simple, and hassle-free from the first site visit right through to registration.</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>	
				</div>
			</Fragment>
		)
	}
}

export default Specifications;