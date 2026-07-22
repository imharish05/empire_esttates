import React from 'react';
import { FaPhoneVolume, FaMapMarkerAlt, FaRegClock, FaEnvelopeOpen } from '../../icons';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="row d-flex justify-content-md-between justify-content-center align-items-center">
          <div className="dlab-topbar-left">
            <ul>
              <li><FaPhoneVolume /> 88254 71748</li>
              <li><FaMapMarkerAlt /> Coimbatore</li>
            </ul>
          </div>
          <div className="dlab-topbar-right">
            <ul>
              <li><FaRegClock />  Mon - Sat 8.00 - 8.00</li>
              <li><FaEnvelopeOpen /> empireesttates@gmail.com</li>
            </ul>				
          </div>
        </div>
      </div>
    </div>
  );
}
