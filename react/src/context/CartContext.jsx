/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.items, action.payload])
      );
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.items.filter((item) => item._id !== action.payload)
        )
      );
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case 'CLEAR_CART':
      localStorage.removeItem('cart');
      return { ...state, items: [] };

    case 'UPDATE_QUANTITY':
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.items.map((item) =>
            item._id === action.payload._id
              ? {
                  ...item,
                  quantity: Math.max(
                    0,
                    Math.min(action.payload.quantity, item.stock)
                  ),
                }
              : item
          )
        )
      );
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id
            ? {
                ...item,
                quantity: Math.max(
                  0,
                  Math.min(action.payload.quantity, item.stock)
                ),
              }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  console.log(cart.items);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.items));
  }, [cart.items]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
