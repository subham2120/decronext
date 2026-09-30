import "./CategorySection.css";

const categories = [
  {
    name: "Lighting",
    image: "/categories/lighting.png",
  },
  {
    name: "Wall Decor",
    image: "/categories/wall-decor.png",
  },
  {
    name: "Plants & Vases",
    image: "/categories/plants-and-vases.png",
  },
  {
    name: "Candles",
    image: "/categories/candles.jpg",
  },
  {
    name: "Showpieces",
    image: "/categories/showpieces.png",
  },
  {
    name: "Storage",
    image: "/categories/storage.png",
  },
];

function CategorySection() {
  return (
    <section className="category-section">

      <div className="section-heading">
        <div>
          <p className="section-label">EXPLORE</p>
          <h2>Shop by Category</h2>
        </div>

        <button>View All →</button>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>

            <img
              src={category.image}
              alt={category.name}
            />

            <div className="category-overlay">
              <h3>{category.name}</h3>
              <span>Explore →</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default CategorySection;