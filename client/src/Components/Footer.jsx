import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='bottomFooter'>
      <footer className="footer bg-dark text-light">
        <div className="container">
          <div className="row justify-content-center pt-1">
            <div className="col-1 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="col-1 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <div className="col-1 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
            <div className="col-1 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco">
                <i className="far fa-envelope"></i>
              </a>
            </div>
            <div className="col-1 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          <div className="row justify-content-center pt-1">
            <div className="col-2 col-lg-1 text-center p-0">
              <a href="/privacy-policy" className="text-light textDeco fontSize">Privacy</a>
            </div>
            <div className="col-2 col-lg-1 text-center p-0">
              <a href="/contact" className="text-light textDeco fontSize">Contact</a>
            </div>
            <div className="col-2 col-lg-1 text-center p-0">
              <a href="/about" className="text-light textDeco fontSize">About</a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center footerBottom">
              MERN@ecommerce
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}
