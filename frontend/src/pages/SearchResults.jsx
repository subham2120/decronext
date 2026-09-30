import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./SearchResults.css";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8080/api/products/search?name=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok) {
          throw new Error("Search failed");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Search Error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="search-results-page">

      <div className="search-results-header">
        <p>DECORNEXT SEARCH</p>

        <h1>
          Search Results
        </h1>

        {query && (
          <p className="search-query">
            Results for "<strong>{query}</strong>"
          </p>
        )}
      </div>

      {loading ? (
        <div className="search-message">
          Searching products...
        </div>
      ) : products.length > 0 ? (
        <div className="search-products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="search-message">
          <h2>No products found</h2>

          <p>
            We couldn't find any products matching "{query}".
          </p>
        </div>
      )}

    </div>
  );
}

export default SearchResults;