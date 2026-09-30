import { Link } from "react-router-dom";
import "./Blog.css";

const posts = [
  {
    id: 1,
    category: "HOME DECOR",
    title: "5 Simple Ways to Make Your Living Room Feel Better",
    date: "September 18, 2026",
    image: "/rooms/living-room.png",
  },
  {
    id: 2,
    category: "BEDROOM",
    title: "How to Create a Calm and Comfortable Bedroom",
    date: "September 14, 2026",
    image: "/rooms/bedroom.png",
  },
  {
    id: 3,
    category: "PLANTS & DECOR",
    title: "Bring More Life Into Your Home With Greenery",
    date: "September 10, 2026",
    image: "/rooms/balcony.png",
  },
];

function Blog() {
  return (
    <div className="blog-page">

      <section className="blog-hero">
        <p>DECORNEXT JOURNAL</p>

        <h1>
          Ideas For A
          <br />
          Beautiful Home
        </h1>

        <span>
          Inspiration, styling ideas and simple tips to help
          you create a space you love.
        </span>
      </section>

      <section className="blog-section">

        <div className="blog-heading">
          <div>
            <p>LATEST STORIES</p>
            <h2>From Our Journal</h2>
          </div>
        </div>

        <div className="blog-grid">

          {posts.map((post) => (
            <article className="blog-card" key={post.id}>

              <div className="blog-image">
                <img
                  src={post.image}
                  alt={post.title}
                />
              </div>

              <div className="blog-card-content">

                <p className="blog-category">
                  {post.category}
                </p>

                <h3>{post.title}</h3>

                <span className="blog-date">
                  {post.date}
                </span>

                <Link
                  to={`/blog/${post.id}`}
                  className="blog-read-button"
                >
                  Read Article →
                </Link>

              </div>

            </article>
          ))}

        </div>

      </section>

      <section className="blog-cta">

        <p>NEED MORE INSPIRATION?</p>

        <h2>
          Discover Pieces For
          <br />
          Your Home
        </h2>

        <Link to="/shop" className="blog-cta-button">
          Explore Shop →
        </Link>

      </section>

    </div>
  );
}

export default Blog;