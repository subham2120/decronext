import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:8080/api/admin/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error("Dashboard Stats Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <div>
          <p className="admin-label">DECORNEXT ADMIN</p>
          <h1>Admin Dashboard</h1>
          <span>Welcome, {user?.name}</span>
        </div>

        <button
          className="admin-shop-button"
          onClick={() => navigate("/")}
        >
          View Store →
        </button>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>Products</span>
          <strong>
            {loading ? "..." : stats.totalProducts}
          </strong>
          <p>Manage your catalog</p>
        </div>

        <div className="admin-stat-card">
          <span>Orders</span>
          <strong>
            {loading ? "..." : stats.totalOrders}
          </strong>
          <p>Manage customer orders</p>
        </div>

        <div className="admin-stat-card">
          <span>Customers</span>
          <strong>
            {loading ? "..." : stats.totalCustomers}
          </strong>
          <p>Registered users</p>
        </div>

        <div className="admin-stat-card">
          <span>Revenue</span>
          <strong>
            {loading ? "..." : stats.totalRevenue}
          </strong>
          <p>Total sales</p>
        </div>

      </div>

      <div className="admin-actions">

        <div
          className="admin-action-card"
          onClick={() => navigate("/admin/products")}
        >
          <div className="admin-action-icon">📦</div>

          <div>
            <h2>Manage Products</h2>
            <p>
              Add, edit and delete home decor products.
            </p>
          </div>

          <span>→</span>
        </div>

        <div
          className="admin-action-card"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="admin-action-icon">🛍️</div>

          <div>
            <h2>Manage Orders</h2>
            <p>
              View customer orders and order status.
            </p>
          </div>

          <span>→</span>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;