import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistItems,
    toggleWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    navigate("/cart");
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="empty-wishlist">
        <h1>Your Wishlist is Empty</h1>

        <p>
          Save your favorite home decor products here.
        </p>

        <button onClick={() => navigate("/shop")}>
          Explore Products
        </button>
      </div>
    );
  }

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <p>DECORNEXT</p>
        <h1>My Wishlist</h1>
        <span>
          {wishlistItems.length} Saved Products
        </span>
      </div>

      <div className="wishlist-grid">

        {wishlistItems.map((product) => (
          <div
            className="wishlist-card"
            key={product.id}
          >

            <div className="wishlist-image">
              <img
                src={product.image}
                alt={product.name}
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              />

              <button
                onClick={() =>
                  toggleWishlist(product)
                }
              >
                ♥
              </button>
            </div>

            <div className="wishlist-info">

              <p>{product.category}</p>

              <h3
                onClick={() =>
                  navigate(`/product/${product.id}`)
                }
              >
                {product.name}
              </h3>

              <div className="wishlist-price">
                ₹{product.price}

                {product.oldPrice && (
                  <span>
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>

              <button
                className="wishlist-cart-button"
                onClick={() =>
                  handleAddToCart(product)
                }
              >
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Wishlist;