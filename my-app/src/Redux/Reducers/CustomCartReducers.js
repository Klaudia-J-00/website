const initialState = {
  customCartItems: [],
};

export const customCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CUSTOM_CART":
      return {
        ...state,
        customCartItems: [...state.customCartItems, action.payload],
      };
    case "REMOVE_FROM_CUSTOM_CART":
      return {
        ...state,
        customCartItems: state.customCartItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
