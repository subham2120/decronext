import "./Hero.css";
import heroImage from "../assets/hero-room.jpg";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <p className="hero-tag">
          MAKE EVERY CORNER BEAUTIFUL
        </p>

        <h1>
          Decorate Your World
          <br />
          With Possibilities
        </h1>

        <p className="hero-description">
          Discover beautiful pieces that make your home
          feel truly yours.
        </p>

        <button className="hero-button">
          Shop Now →
        </button>

      </div>
    </section>
  );
}

export default Hero;