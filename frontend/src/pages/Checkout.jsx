import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // OPEN RAZORPAY CHECKOUT
  // =========================
  const openRazorpay = (razorpayOrder, orderId) => {
    const options = {
      key: "rzp_test_TezL8hWItrvPsn",

      amount: razorpayOrder.amount,
      currency: "INR",

      name: "DecorNext",
      description: "Home Decor Purchase",

      order_id: razorpayOrder.id,

handler: async function (response) {
  try {
    const token = localStorage.getItem("token");

    const verificationResponse = await fetch(
      "http://localhost:8080/api/payment/verify",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        }),
      }
    );

    const verificationText =
      await verificationResponse.text();

    console.log(
      "PAYMENT VERIFY STATUS:",
      verificationResponse.status
    );

    console.log(
      "PAYMENT VERIFY RESPONSE:",
      verificationText
    );

    if (!verificationResponse.ok) {
      throw new Error(
        verificationText ||
        "Payment verification failed"
      );
    }

    // Payment is verified by backend
    clearCart();

    alert("Payment successful and verified!");

    navigate("/orders");

  } catch (error) {
    console.error(
      "Payment Verification Error:",
      error
    );

    alert(
      "Payment verification failed. Please contact support."
    );
  }
},

      prefill: {
        name: "DecorNext Customer",
      },

      theme: {
        color: "#243b2a",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      // ==========================================
      // 1. CREATE DECORNEXT ORDER
      // ==========================================

      const orderResponse = await fetch(
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

      const orderText = await orderResponse.text();

      console.log(
        "ORDER STATUS:",
        orderResponse.status
      );

      console.log(
        "ORDER RESPONSE:",
        orderText
      );

      if (!orderResponse.ok) {
        throw new Error(
          orderText || "Order creation failed"
        );
      }

      const orderData = JSON.parse(orderText);

      console.log(
        "DecorNext Order:",
        orderData
      );

      // ==========================================
      // 2. CREATE RAZORPAY ORDER
      // ==========================================

      const paymentResponse = await fetch(
        `http://localhost:8080/api/payment/create-order/${orderData.id}`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentText = await paymentResponse.text();

      console.log(
        "RAZORPAY STATUS:",
        paymentResponse.status
      );

      console.log(
        "RAZORPAY RESPONSE:",
        paymentText
      );

      if (!paymentResponse.ok) {
        throw new Error(
          paymentText ||
            "Razorpay order creation failed"
        );
      }

      const razorpayOrder =
        JSON.parse(paymentText);

      console.log(
        "Razorpay Order:",
        razorpayOrder
      );

      // ==========================================
      // 3. OPEN RAZORPAY CHECKOUT
      // ==========================================

      openRazorpay(
        razorpayOrder,
        orderData.id
      );

    } catch (error) {
      console.error(
        "Checkout Error:",
        error
      );

      alert(error.message);

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">

        <h1>Your cart is empty</h1>

        <button
          onClick={() => navigate("/shop")}
        >
          Go to Shop
        </button>

      </div>
    );
  }

  // =========================
  // CHECKOUT UI
  // =========================

  return (
    <div className="checkout-page">

      <div className="checkout-header">

        <p>DECORNEXT</p>

        <h1>Checkout</h1>

      </div>

      <div className="checkout-container">

        {/* =========================
            DELIVERY FORM
        ========================= */}

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
              ? "Processing..."
              : "Place Order"}
          </button>

        </form>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cartItems.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <div>

                <strong>
                  {item.name}
                </strong>

                <span>
                  Qty: {item.quantity}
                </span>

              </div>

              <span>
                ₹
                {item.price * item.quantity}
              </span>

            </div>

          ))}

          <hr />

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{cartTotal}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;