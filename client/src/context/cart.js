import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth"; // Add this import

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
  const [auth] = useAuth(); // Get current user

  // Load cart from localStorage based on user ID
  useEffect(() => {
    const userId = auth?.user?._id;
    if (userId) {
      const existingCartItem = localStorage.getItem(`cart_${userId}`);
      if (existingCartItem) setcart(JSON.parse(existingCartItem));
    } else {
      setcart([]); // Clear cart if no user
    }
  }, [auth?.user?._id]);

  // Save cart to localStorage with user ID
  const updateCart = (newCart) => {
    const userId = auth?.user?._id;
    if (userId) {
      setcart(newCart);
      localStorage.setItem(`cart_${userId}`, JSON.stringify(newCart));
    }
  };

  return (
    <CartContext.Provider value={[cart, updateCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
