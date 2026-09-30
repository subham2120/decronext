import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <p>ABOUT DECORNEXT</p>

        <h1>
          Beautiful Spaces,
          <br />
          Thoughtfully Designed.
        </h1>

        <span>
          We believe your home should reflect your personality,
          comfort and style.
        </span>
      </section>

      {/* Story */}
      <section className="about-story">

        <div className="about-story-image">
          <img
            src="/rooms/living-room.png"
            alt="Beautiful living room"
          />
        </div>

        <div className="about-story-content">
          <p className="about-label">OUR STORY</p>

          <h2>
            Making Every Corner
            <br />
            Feel Like Home
          </h2>

          <p>
            DecorNext is a home décor platform created for people
            who love beautiful and comfortable spaces.
          </p>

          <p>
            From elegant lighting and decorative pieces to plants,
            vases and everyday home essentials, we bring together
            products that can add warmth and personality to your home.
          </p>

          <Link to="/shop" className="about-button">
            Explore Our Collection →
          </Link>
        </div>

      </section>

      {/* Why DecorNext */}
      <section className="about-values">

        <div className="about-values-header">
          <p>WHY DECORNEXT</p>

          <h2>
            Designed For The Way
            <br />
            You Live
          </h2>
        </div>

        <div className="about-values-grid">

          <div className="about-value-card">
            <div className="about-value-icon">✦</div>

            <h3>Thoughtful Design</h3>

            <p>
              Carefully selected décor pieces designed to
              complement modern homes and personal styles.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-icon">✓</div>

            <h3>Quality First</h3>

            <p>
              We focus on products that bring style,
              functionality and lasting value to your space.
            </p>
          </div>

          <div className="about-value-card">
            <div className="about-value-icon">♡</div>

            <h3>Made For You</h3>

            <p>
              Whether you are refreshing one corner or
              decorating an entire home, we are here to help.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="about-cta">

        <p>MAKE YOUR SPACE YOURS</p>

        <h2>
          Ready to Decorate
          <br />
          Your World?
        </h2>

        <Link to="/shop" className="about-cta-button">
          Start Shopping →
        </Link>

      </section>

    </div>
  );
}

export default About;