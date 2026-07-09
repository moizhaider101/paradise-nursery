import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

function App() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const LandingPage = () => (
    <div className="landing-page">
      <h1 className="company-name">Paradise Nursery</h1>
      <p className="tagline">Bring Nature Home</p>
      <Link to="/plants">
        <button className="get-started-btn">Get Started</button>
      </Link>
    </div>
  );

  const Navbar = () => (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Paradise Nursery
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/about">About Us</Link>
        <Link to="/cart" className="cart-icon">
          🛒 Cart
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/plants"
            element={
              <>
                <Navbar />
                <ProductList />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Navbar />
                <CartItem />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <AboutUs />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
