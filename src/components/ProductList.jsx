import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/CartSlice";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedProducts, setAddedProducts] = useState({});

  // Plant data organized by categories
  const plantsByCategory = {
    "Indoor Plants": [
      {
        id: 1,
        name: "Snake Plant",
        price: 25.99,
        category: "Indoor Plants",
        thumbnail: "/images/snake-plant.jpg",
      },
      {
        id: 2,
        name: "Pothos",
        price: 15.99,
        category: "Indoor Plants",
        thumbnail: "/images/pothos.jpg",
      },
      {
        id: 3,
        name: "Spider Plant",
        price: 18.99,
        category: "Indoor Plants",
        thumbnail: "/images/spider-plant.jpg",
      },
      {
        id: 4,
        name: "Peace Lily",
        price: 22.99,
        category: "Indoor Plants",
        thumbnail: "/images/peace-lily.jpg",
      },
      {
        id: 5,
        name: "Rubber Plant",
        price: 28.99,
        category: "Indoor Plants",
        thumbnail: "/images/rubber-plant.jpg",
      },
      {
        id: 6,
        name: "Fiddle Leaf Fig",
        price: 45.99,
        category: "Indoor Plants",
        thumbnail: "/images/fiddle-leaf.jpg",
      },
    ],
    Succulents: [
      {
        id: 7,
        name: "Echeveria",
        price: 12.99,
        category: "Succulents",
        thumbnail: "/images/echeveria.jpg",
      },
      {
        id: 8,
        name: "Jade Plant",
        price: 16.99,
        category: "Succulents",
        thumbnail: "/images/jade-plant.jpg",
      },
      {
        id: 9,
        name: "Aloe Vera",
        price: 14.99,
        category: "Succulents",
        thumbnail: "/images/aloe-vera.jpg",
      },
      {
        id: 10,
        name: "String of Pearls",
        price: 13.99,
        category: "Succulents",
        thumbnail: "/images/string-pearls.jpg",
      },
      {
        id: 11,
        name: "Haworthia",
        price: 11.99,
        category: "Succulents",
        thumbnail: "/images/haworthia.jpg",
      },
      {
        id: 12,
        name: "Sedum",
        price: 10.99,
        category: "Succulents",
        thumbnail: "/images/sedum.jpg",
      },
    ],
    "Flowering Plants": [
      {
        id: 13,
        name: "Orchid",
        price: 35.99,
        category: "Flowering Plants",
        thumbnail: "/images/orchid.jpg",
      },
      {
        id: 14,
        name: "African Violet",
        price: 19.99,
        category: "Flowering Plants",
        thumbnail: "/images/african-violet.jpg",
      },
      {
        id: 15,
        name: "Anthurium",
        price: 29.99,
        category: "Flowering Plants",
        thumbnail: "/images/anthurium.jpg",
      },
      {
        id: 16,
        name: "Begonia",
        price: 17.99,
        category: "Flowering Plants",
        thumbnail: "/images/begonia.jpg",
      },
      {
        id: 17,
        name: "Gardenia",
        price: 24.99,
        category: "Flowering Plants",
        thumbnail: "/images/gardenia.jpg",
      },
      {
        id: 18,
        name: "Hibiscus",
        price: 21.99,
        category: "Flowering Plants",
        thumbnail: "/images/hibiscus.jpg",
      },
    ],
  };

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
    setAddedProducts((prev) => ({
      ...prev,
      [plant.id]: true,
    }));

    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedProducts((prev) => ({
        ...prev,
        [plant.id]: false,
      }));
    }, 2000);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <div className="product-list-container">
      <h1 className="page-title">Our Plants</h1>

      {Object.entries(plantsByCategory).map(([category, plants]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-grid">
            {plants.map((plant) => (
              <div key={plant.id} className="product-card">
                <div className="product-thumbnail">
                  <img src={plant.thumbnail} alt={plant.name} />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{plant.name}</h3>
                  <p className="product-price">${plant.price.toFixed(2)}</p>
                  <button
                    className={`add-to-cart-btn ${isInCart(plant.id) || addedProducts[plant.id] ? "added" : ""}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.id) || addedProducts[plant.id]}
                  >
                    {isInCart(plant.id) || addedProducts[plant.id]
                      ? "Added to Cart ✓"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
