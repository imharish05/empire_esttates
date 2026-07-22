import React from 'react';
import { footerConfig } from './footerConfig';

export default function SocialIcons() {
  return (
    <div className="dlab-social-icon">
      <ul>
        <li><a href={footerConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="site-button circle fa fa-facebook"></a></li>
        <li><a href={footerConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="site-button circle fa fa-instagram"></a></li>
        <li><a href={footerConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="site-button circle fa fa-whatsapp"></a></li>
        <li><a href={footerConfig.socials.youtube} target="_blank" rel="noopener noreferrer" className="site-button circle fa fa-youtube"></a></li>
      </ul>
    </div>
  );
}
