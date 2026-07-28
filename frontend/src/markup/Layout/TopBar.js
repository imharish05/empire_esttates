import React from 'react';
import { FaPhoneVolume, FaMapMarkerAlt, FaRegClock, FaEnvelopeOpen } from '../../icons';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-md-between justify-content-center align-items-center">
          <div className="dlab-topbar-left">
            <ul>
              <li><a href="tel:+918825471748" style={{ color: 'inherit', textDecoration: 'none' }}><FaPhoneVolume /> 88254 71748</a></li>
              <li><FaMapMarkerAlt /> Coimbatore</li>
            </ul>
          </div>
          <div className="dlab-topbar-right">
            <ul>
              <li><FaRegClock />  Mon - Sat 8.00 - 8.00</li>
              <li><a href="mailto:empireesttates@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}><FaEnvelopeOpen /> empireesttates@gmail.com</a></li>
            </ul>				
          </div>
        </div>
      </div>
    </div>
  );
}
