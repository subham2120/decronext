import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

function Shop() {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        let url = "http://localhost:8080/api/products";

        if (selectedCategory !== "All Products") {
          url =
            `http://localhost:8080/api/products/category/${encodeURIComponent(
              selectedCategory
            )}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error(
          "Shop Product Error:",
          error
        );

      }
    };

    fetchProducts();

  }, [selectedCategory]);

  const categories = [
    "All Products",
    "Lighting",
    "Wall Décor",
    "Plants & Vases",
    "Candles",
    "Showpieces",
    "Storage",
  ];

  return (
    <div className="shop-page">

      <div className="shop-header">

        <p className="shop-label">
          DECORNEXT COLLECTION
        </p>

        <h1>Shop Home Décor</h1>

        <p>
          Discover beautiful pieces to make every corner
          of your home feel special.
        </p>

      </div>

      <div className="shop-content">

        <aside className="shop-sidebar">

          <h3>Categories</h3>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "active-category"
                  : ""
              }
            >
              {category}
            </button>
          ))}

        </aside>

        <main className="shop-products">

          <div className="shop-toolbar">

            <span>
              {selectedCategory}
            </span>

            <span>
              {products.length} Products
            </span>

          </div>

          <div className="shop-grid">

            {products.length > 0 ? (

              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))

            ) : (

              <p>No products found.</p>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}

export default Shop;