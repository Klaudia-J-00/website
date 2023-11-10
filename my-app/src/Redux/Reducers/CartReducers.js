import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_ADD_CUSTOM_ITEM,
  CART_REMOVE_CUSTOM_ITEM,
} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], customCartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_CLEAR_ITEMS:
      localStorage.removeItem('customCartItems');  
      return {
        ...state,
        cartItems: [],
        customCartItems: [],
      };
    case CART_RESET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: {},
      };
    case CART_ADD_CUSTOM_ITEM:
      const customItem = action.payload;
      const existCustomItem = state.customCartItems.find(x => x.id === customItem.id);

      if (existCustomItem) {
        return {
          ...state,
          customCartItems: state.customCartItems.map(x =>
            x.id === existCustomItem.id ? customItem : x
          ),
        };
      } else {
        return {
          ...state,
          customCartItems: [...state.customCartItems, customItem],
        };
      }
    case CART_REMOVE_CUSTOM_ITEM:
      return {
        ...state,
        customCartItems: state.customCartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
