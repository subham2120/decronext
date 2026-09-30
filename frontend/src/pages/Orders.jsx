import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-loading">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h1>No Orders Yet</h1>

        <p>
          You haven't placed any orders yet.
        </p>

        <button onClick={() => navigate("/shop")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="orders-page">

      <div className="orders-header">
        <p>DECORNEXT</p>
        <h1>My Orders</h1>
        <span>
          {orders.length} Orders
        </span>
      </div>

      <div className="orders-list">

        {orders.map((order) => (
          <div
            className="order-card"
            key={order.id}
          >

            <div className="order-top">

              <div>
                <span>Order ID</span>
                <strong>
                  #{order.id}
                </strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong className="order-status">
                  {order.status}
                </strong>
              </div>

              <div>
                <span>Total</span>
                <strong>
                  ₹{order.totalAmount}
                </strong>
              </div>

            </div>

            <div className="order-items">

              {order.items.map((item) => (
                <div
                  className="order-item"
                  key={item.productId}
                >
                  <div>
                    <strong>
                      {item.productName}
                    </strong>

                    <span>
                      Quantity: {item.quantity}
                    </span>
                  </div>

                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}

            </div>

            <div className="order-bottom">

              <div>
                <span>
                  Payment:
                </span>

                <strong>
                  {order.paymentStatus}
                </strong>
              </div>

              <div>
                <span>
                  Delivery Address:
                </span>

                <strong>
                  {order.shippingAddress}
                </strong>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Orders;