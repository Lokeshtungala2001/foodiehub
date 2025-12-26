
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; 
import "animate.css"; 
import "./Home.css"; 

function Header({ setVerified }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  // ✅ count total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ handle logout
  const handleLogout = () => {
    setVerified(false);
    localStorage.removeItem("verified");
    navigate("/", { replace: true });
  };

  return (
    <header className="header d-flex align-items-center justify-content-between px-3 py-2">
      {/* Left - Logo */}
      <div className="logo">🍔 FoodieHub</div>

      {/* Middle - Navigation */}
      <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
        <Link to="/home">🏠Home</Link>
        <Link to="/veg">🥗Veg</Link>
        <Link to="/nonveg">🍗Non-Veg</Link>
        <Link to="/drinks">🥤Drinks</Link>
        <Link to="/snacks">🍟Snacks</Link>

        {/* ✅ Cart with badge */}
        <Link to="/cart" className="cart-link position-relative">
          🛒 Cart
          {totalItems > 0 && (
            <span
              key={totalItems} 
              className="badge rounded-circle bg-warning text-dark ms-2 animate__animated animate__bounceIn"
              style={{
                fontSize: "14px",
                padding: "6px 10px",
                fontWeight: "bold",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>

        <Link to="/orders">📦Orders</Link>
        <Link to="/contact">📞Contact</Link>
        <Link to="/about">ℹ️About</Link>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "15px",
            padding: "6px 12px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </nav>
      <div className="account-dropdown">
  <button className="account-btn">👤 Account ▾</button>
  <div className="account-menu animate__animated animate__fadeInDown">
    <Link to="/Signin">🔑 Sign In</Link>
    <Link to="/Signup">📝 Sign Up</Link>
  </div>
</div>


      {/* Hamburger Button */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
    </header>
  );
}

export default Header;
