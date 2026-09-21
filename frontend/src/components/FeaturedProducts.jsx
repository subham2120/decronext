import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

function FeaturedProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await fetch(
          "http://localhost:8080/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);

      } catch (error) {

        console.error(
          "Product Fetch Error:",
          error
        );
      }
    };

    fetchProducts();

  }, []);

  return (
    <section className="featured-products">

      <div className="section-heading">
        <div>
          <p className="section-label">
            FEATURED PRODUCTS
          </p>

          <h2>
            Pieces You'll Love
          </h2>
        </div>

        <button>
          View All Products →
        </button>
      </div>

      <div className="product-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;