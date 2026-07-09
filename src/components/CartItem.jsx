import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cart/CartSlice";
import "./CartItem.css";

const CartItem = () => {
  const dispatch = useDispatch();
  const { items, totalCost } = useSelector((state) => state.cart);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert("Checkout coming soon!");
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart-container">
        <h1>Shopping Cart</h1>
        <p className="empty-cart-message">Your cart is empty</p>
        <Link to="/plants" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-thumbnail">
              <img src={item.thumbnail} alt={item.name} />
            </div>

            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">
                Unit Price: ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="quantity-btn"
                onClick={() => handleDecrement(item.id)}
              >
                -
              </button>
              <span className="quantity-value">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              <p className="item-total-price">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              className="delete-btn"
              onClick={() => handleRemove(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Total Items:</span>
          <span>{items.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>
        <div className="summary-row total">
          <span>Total Cost:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>

        <div className="cart-actions">
          <Link to="/plants" className="continue-shopping-btn">
            Continue Shopping
          </Link>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout - Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
