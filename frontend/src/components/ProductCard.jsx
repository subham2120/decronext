import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div
        className="product-image-container"
        onClick={handleProductClick}
        style={{ cursor: "pointer" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <button
          className={`wishlist-button ${isWishlisted(product.id) ? "wishlisted" : ""
            }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
        >
          {isWishlisted(product.id) ? "♥" : "♡"}
        </button>

        {product.discount && (
          <span className="discount-badge">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">
          {product.category}
        </p>

        <h3
          onClick={handleProductClick}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>

        <div className="product-rating">
          ⭐ {product.rating}
        </div>

        <div className="product-price">
          <span className="current-price">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="old-price">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <button className="add-cart-button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;