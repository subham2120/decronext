import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <p className="not-found-label">DECORNEXT</p>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you're looking for doesn't exist
          or may have been moved.
        </p>

        <Link to="/" className="not-found-button">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;