
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();

  const { cartCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          DecorNext
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/rooms">Rooms</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="nav-actions">

          <form
  className="search-box"
  onSubmit={(e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  }}
>
  <span>⌕</span>

  <input
    type="text"
    placeholder="Search decor..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</form>

          <Link to="/wishlist" className="icon-btn">
            ♡
          </Link>

          <Link to="/cart" className="cart-icon-wrapper">
            🛒
            <span className="cart-count">
              {cartCount}
            </span>
          </Link>

{isAuthenticated ? (
  <>
    {user?.role === "ADMIN" && (
      <Link to="/admin" className="admin-nav-link">
        Admin Dashboard
      </Link>
    )}

    <span className="user-name">
      Hi, {user?.name}
    </span>

    <button
      className="login-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
) : (
  <Link to="/login" className="login-btn">
    Login
  </Link>
)}

        </div>

      </div>
    </header>
  );
}

export default Navbar;