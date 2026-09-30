import { Link, useParams } from "react-router-dom";
import "./BlogDetails.css";

const posts = [
  {
    id: "1",
    category: "HOME DECOR",
    title: "5 Simple Ways to Make Your Living Room Feel Better",
    date: "September 18, 2026",
    image: "/rooms/living-room.png",
    paragraphs: [
      "Your living room is often the heart of your home. A few thoughtful changes can make the space feel more comfortable, welcoming and personal.",
      "Start by creating a balanced layout. Keep enough open space around your furniture and choose décor pieces that complement the overall room instead of making it feel crowded.",
      "Lighting can also completely change the atmosphere. Combine natural light with warm lamps and decorative lighting to create a comfortable environment during the evening.",
      "Finally, add personal touches such as plants, artwork, cushions or small decorative pieces. These details can make your living room feel more like your own."
    ]
  },
  {
    id: "2",
    category: "BEDROOM",
    title: "How to Create a Calm and Comfortable Bedroom",
    date: "September 14, 2026",
    image: "/rooms/bedroom.png",
    paragraphs: [
      "A bedroom should be a comfortable place where you can relax and recharge.",
      "Choose a simple colour palette and avoid filling the room with too many decorative objects. A clean and balanced environment can make the room feel more peaceful.",
      "Soft lighting, comfortable bedding and carefully selected décor can add warmth without overwhelming the space.",
      "Small details such as bedside lamps, plants and decorative objects can complete the look."
    ]
  },
  {
    id: "3",
    category: "PLANTS & DECOR",
    title: "Bring More Life Into Your Home With Greenery",
    date: "September 10, 2026",
    image: "/rooms/balcony.png",
    paragraphs: [
      "Plants are a simple way to bring a natural feeling into your home.",
      "You can place smaller plants on shelves, tables or window areas, while larger plants can become a focal point in a living room or balcony.",
      "Pairing plants with ceramic pots and decorative vases can create a more complete look.",
      "The key is to choose placements that work naturally with the existing furniture and lighting of the room."
    ]
  }
];

function BlogDetails() {
  const { id } = useParams();

  const post = posts.find(
    (item) => item.id === id
  );

  if (!post) {
    return (
      <div className="blog-details-not-found">
        <h1>Article Not Found</h1>

        <Link to="/blog">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-details-page">

      <Link to="/blog" className="blog-back-link">
        ← Back to Blog
      </Link>

      <article className="blog-article">

        <div className="blog-article-header">

          <p>{post.category}</p>

          <h1>{post.title}</h1>

          <span>{post.date}</span>

        </div>

        <div className="blog-article-image">
          <img
            src={post.image}
            alt={post.title}
          />
        </div>

        <div className="blog-article-content">

          {post.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}

        </div>

      </article>

      <div className="blog-article-footer">
        <Link to="/shop">
          Explore DecorNext Collection →
        </Link>
      </div>

    </div>
  );
}

export default BlogDetails;