
import React, { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ✅ Load cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Load orders from localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.find((i) => i.id === item.id);
      if (exists) {
        toast.info(`${item.name} quantity increased`, { position: "top-right" });
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`${item.name} added to cart!`, { position: "top-right" });
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((i) => i.id === id);
      if (removedItem) {
        toast.error(`${removedItem.name} removed from cart`, { position: "top-right" });
      }
      return prevCart.filter((i) => i.id !== id);
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,        // ✅ expose setCart to allow clearing cart
        orders,
        setOrders,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
