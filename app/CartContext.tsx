import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      console.log("Current Cart: ", prevCart); // Debugging
  
      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += quantity;
        console.log("Updated Cart: ", updatedCart); // Debugging
        return updatedCart;
      } else {
        // Thêm sản phẩm mới với trạng thái và số lượng ban đầu
        return [...prevCart, { ...product, quantity }];
      }
    });
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
