export const addToCustomCart = (customProduct) => (dispatch) => {
  dispatch({ type: "ADD_TO_CUSTOM_CART", payload: customProduct });
};

export const removeFromCustomCart = (productId) => (dispatch) => {
  dispatch({ type: "REMOVE_FROM_CUSTOM_CART", payload: productId });
};
