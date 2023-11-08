import { CART_ADD_CUSTOM_ITEM, CART_REMOVE_CUSTOM_ITEM } from "../Constants/CartConstants";

const initialState = {
  customCartItems: [],
};

export const customCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_CUSTOM_ITEM:
      const item = action.payload;
      const existItem = state.customCartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
            ...state,
            customCartItems: state.customCartItems.map((x) =>
                x.product === existItem.product ? item : x
            ),
        };
    } else {
        return {
            ...state,
            customCartItems: [...state.customCartItems, item],
        };
    }
    case CART_REMOVE_CUSTOM_ITEM:
      return {
        ...state,
        customCartItems: state.customCartItems.filter((item) => item.product !== action.payload),
      };
    default:
      return state;
  }
};