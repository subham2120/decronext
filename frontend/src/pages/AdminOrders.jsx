import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/api/admin/orders/${orderId}/status?status=${encodeURIComponent(
        newStatus
      )}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    const updatedOrder = await response.json();

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === updatedOrder.id
          ? updatedOrder
          : order
      )
    );

  } catch (error) {
    console.error("Order Status Error:", error);
    alert("Failed to update order status");
  }
};

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Admin Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="admin-orders-page">

      <div className="admin-orders-header">
        <div>
          <p>DECORNEXT ADMIN</p>
          <h1>Order Management</h1>
        </div>

        <span>{orders.length} Orders</span>
      </div>

      <div className="admin-orders-list">

        {orders.length > 0 ? (
          orders.map((order) => (
            <div className="admin-order-card" key={order.id}>

              <div className="admin-order-top">

                <div>
                  <span>Order ID</span>
                  <strong>#{order.id}</strong>
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
                  <span>Total</span>
                  <strong>₹{order.totalAmount}</strong>
                </div>

                <div>
  <span>Status</span>

  <select
    value={order.status}
    onChange={(e) =>
      handleStatusChange(order.id, e.target.value)
    }
  >
    <option value="PENDING">PENDING</option>
    <option value="CONFIRMED">CONFIRMED</option>
    <option value="PROCESSING">PROCESSING</option>
    <option value="SHIPPED">SHIPPED</option>
    <option value="DELIVERED">DELIVERED</option>
    <option value="CANCELLED">CANCELLED</option>
  </select>
</div>

                <div>
                  <span>Payment</span>
                  <strong>{order.paymentStatus}</strong>
                </div>

              </div>

              <div className="admin-order-items">

                {order.items.map((item) => (
                  <div
                    className="admin-order-item"
                    key={item.productId}
                  >
                    <div>
                      <strong>{item.productName}</strong>
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

              <div className="admin-order-bottom">
                <span>
                  <strong>Delivery Address:</strong>{" "}
                  {order.shippingAddress}
                </span>
              </div>

            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}

      </div>

    </div>
  );
}

export default AdminOrders;