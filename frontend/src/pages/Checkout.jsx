import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shippingAddress: address,
            items: cartItems.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Order creation failed"
        );
      }

      console.log("Order created:", data);

      clearCart();

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (error) {
      console.error("Order Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <h1>Your cart is empty</h1>

        <button onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-header">
        <p>DECORNEXT</p>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handlePlaceOrder}
        >
          <h2>Delivery Address</h2>

          <label>
            Full Delivery Address
          </label>

          <textarea
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Enter your complete delivery address"
            rows="6"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <div>
                <strong>{item.name}</strong>

                <span>
                  Qty: {item.quantity}
                </span>
              </div>

              <span>
                ₹{item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>₹{cartTotal}</strong>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;