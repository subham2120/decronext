import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            DecorNext
          </Link>

          <p>
            Make Every Corner Beautiful.
          </p>

          <p className="footer-description">
            Discover beautiful décor pieces that make
            your home feel truly yours.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Customer Service */}
        <div className="footer-column">
          <h3>Customer Service</h3>

          <Link to="/orders">Track Order</Link>
          <Link to="/returns">Returns</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/contact">Help Center</Link>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h3>Follow Us</h3>

          <a href="#" target="_blank">
            Instagram
          </a>

          <a href="#" target="_blank">
            Facebook
          </a>

          <a href="#" target="_blank">
            YouTube
          </a>

          <a href="#" target="_blank">
            LinkedIn
          </a>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 DecorNext. All rights reserved.
        </p>

        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;