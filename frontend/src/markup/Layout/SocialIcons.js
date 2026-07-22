import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialIcons() {
  return (
    <div className="dlab-social-icon">
      <ul>
        <li><Link to={"#"} className="site-button circle fa fa-facebook" ></Link></li>
        <li><Link to={"#"} className="site-button  circle fa fa-twitter" ></Link></li>
        <li><Link to={"#"} className="site-button circle fa fa-linkedin" ></Link></li>
        <li><Link to={"#"} className="site-button circle fa fa-instagram"></Link></li>
      </ul>
    </div>
  );
}
