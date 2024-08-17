import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cart]);

  const calculateDiscount = (item) => {
    // Apply different offers based on the item
    let discountAmount = 0;
    if (item.name === 'Product 1') {
      discountAmount = item.price * 0.1; // 10% discount
    } else if (item.name === 'Product 2') {
      discountAmount = item.price * 0.2; // 20% discount
    } else if (item.category === 'Electronics') {
      discountAmount = item.price * 0.05; // 5% discount for Electronics category
    }
    return discountAmount;
  };

  const addToCart = (product) => {
    const discount = calculateDiscount(product);
    const discountedPrice = product.price - discount;
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? {...item, quantity: item.quantity + product.quantity, discountedPrice }
            : item
        );
      }
      return [...prevCart, {...product, quantity: product.quantity, discountedPrice }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const discount = calculateDiscount(item);
          const discountedPrice = item.price - discount;
          return {...item, quantity: item.quantity + 1, discountedPrice };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          const discount = calculateDiscount(item);
          const discountedPrice = item.price - discount;
          return {...item, quantity: item.quantity - 1, discountedPrice };
        }
        return item;
      })
    );
  };

  const emptyCart = () => {
    setCart([]); // This will clear the cart
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        emptyCart,
        totalItems,
        calculateDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
