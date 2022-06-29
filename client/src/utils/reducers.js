import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

        // Note the use of the filter() method that only keeps the items that don't match the provided _id property
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
        
        // In the return statement, we also check the length of the array to set cartOpen to false when the array is empty
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };

      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cartOpen: true,
            // use map() method to create a new array instead of state.cart because the original state should be treated as immutable
          cart: state.cart.map(product => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
          })
        };

      case CLEAR_CART:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };

      case TOGGLE_CART:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };

    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}