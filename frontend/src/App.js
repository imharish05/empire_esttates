import React from "react";

/// Components
import Markup from './markup/Markup';

/// Style
import "./vendor/bootstrap-select/bootstrap-select.min.css";
import "./vendor/animate/animate.css";
import "./icons/flaticon/flaticon.css";
import "./icons/themify/themify-icons.css";
import "./icons/font-awesome/css/font-awesome.min.css";
import "./icons/line-awesome/css/line-awesome.min.css";
import "./css/icon-compat.css";
import "./css/style.css";
import "./css/custom-font.css";
import './vendor/slick/slick.min.css';
import './vendor/slick/slick-theme.min.css';
import 'react-modal-video/css/modal-video.min.css';
import './css/responsive-nav.css';

import { withResizeDetector } from "react-resize-detector";
function App() {
	return (
		<div className="App">
		  <Markup />
		</div>
	);
}

export default withResizeDetector(App);
