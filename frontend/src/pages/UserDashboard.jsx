import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./UserDashboard.css";

function UserDashboard() {
  const { user } = useAuth();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();

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
        console.error("Dashboard Orders Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="dashboard-page">

      {/* Header */}
      <section className="dashboard-header">
        <div>
          <p className="dashboard-label">DECORNEXT</p>

          <h1>
            Welcome back, {user?.name || "User"}!
          </h1>

          <p className="dashboard-subtitle">
            Manage your orders, wishlist and shopping activity.
          </p>
        </div>

        <div className="dashboard-user">
          <div className="dashboard-avatar">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <strong>{user?.name}</strong>
            <span>{user?.email}</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="stat-icon">📦</div>

          <div>
            <span>Total Orders</span>
            <strong>{orders.length}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">♡</div>

          <div>
            <span>Wishlist</span>
            <strong>{wishlistItems.length}</strong>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="stat-icon">🛒</div>

          <div>
            <span>Cart Items</span>
            <strong>{cartCount}</strong>
          </div>
        </div>

      </section>

      {/* Main Content */}
      <section className="dashboard-content">

        {/* Recent Orders */}
        <div className="dashboard-orders">

          <div className="section-heading">
            <div>
              <p>YOUR ACTIVITY</p>
              <h2>Recent Orders</h2>
            </div>

            <Link to="/orders">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-empty">
              Loading orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="dashboard-empty">
              <h3>No orders yet</h3>

              <p>
                Start shopping and your orders will appear here.
              </p>

              <Link to="/shop" className="dashboard-shop-button">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="recent-orders-list">

              {recentOrders.map((order) => (
                <div
                  className="recent-order-card"
                  key={order.id}
                >

                  <div className="recent-order-info">
                    <span>Order #{order.id}</span>

                    <strong>
                      ₹{order.totalAmount}
                    </strong>

                    <small>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </small>
                  </div>

                  <div className="recent-order-items">

                    {order.items.slice(0, 2).map((item) => (
                      <div
                        className="recent-order-item"
                        key={item.productId}
                      >
                        <span>{item.productName}</span>

                        <small>
                          × {item.quantity}
                        </small>
                      </div>
                    ))}

                  </div>

                  <div className="recent-order-status">
                    <span className={order.status.toLowerCase()}>
                      {order.status}
                    </span>

                    <Link to="/orders">
                      View
                    </Link>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Quick Actions */}
        <div className="dashboard-actions">

          <div className="section-heading">
            <div>
              <p>QUICK ACCESS</p>
              <h2>My Account</h2>
            </div>
          </div>

          <div className="quick-action-grid">

            <Link to="/orders" className="quick-action-card">
              <span>📦</span>
              <div>
                <strong>My Orders</strong>
                <small>Track your orders</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/wishlist" className="quick-action-card">
              <span>♡</span>
              <div>
                <strong>Wishlist</strong>
                <small>Saved products</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/cart" className="quick-action-card">
              <span>🛒</span>
              <div>
                <strong>My Cart</strong>
                <small>{cartCount} items in cart</small>
              </div>
              <b>→</b>
            </Link>

            <Link to="/shop" className="quick-action-card">
              <span>✦</span>
              <div>
                <strong>Continue Shopping</strong>
                <small>Explore home décor</small>
              </div>
              <b>→</b>
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default UserDashboard;