import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer2';
import PageTitle from './../Layout/PageTitle';
import { applyMetaTags } from '../../utils/meta';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ElevationCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className="dlab-box shadow rounded" 
      style={{ overflow: 'hidden', position: 'relative', height: '320px', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img 
        src={item.image || require('./../../images/logo.png')} 
        alt={item.title} 
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s',
          padding: '20px',
          textAlign: 'center',
          zIndex: 2
        }}
      >
        <h4 style={{ color: 'white', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h4>
        <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: '500', marginBottom: '10px' }}>
          Location: <span style={{ color: '#d4af37', fontWeight: 'bold' }}>{item.location}</span>
        </p>
        {item.clientName && (
          <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: '500', marginBottom: '10px' }}>
            Client: <span style={{ color: '#f8f9fa' }}>{item.clientName}</span>
          </p>
        )}
        {item.description && <p style={{ fontSize: '14px', color: '#e0e0e0', margin: 0 }}>{item.description}</p>}
      </div>
    </div>
  );
};

const Elevations = () => {
  const [elevations, setElevations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElevations = async () => {
      try {
        const res = await fetch(`${API_URL}/elevations`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setElevations(data);
      } catch (err) {
        console.error('Error fetching elevations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchElevations();

    applyMetaTags(
      "Elevations | Empire Estates",
      "View the latest building elevations and modern architectural designs by Empire Estates."
    );
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="page-content bg-white">
        <PageTitle motherMenu="Elevations" activeMenu="Elevations" placement="Elevations Page Banner" />
        
        <div className="content-block">
          <div className="section-full content-inner bg-gray">
            <div className="container">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {elevations.length > 0 ? (
                    elevations.map((item, index) => (
                      <div key={index} className="col-lg-4 col-md-6 col-sm-6 m-b40">
                        <ElevationCard item={item} />
                      </div>
                    ))
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Elevations;
