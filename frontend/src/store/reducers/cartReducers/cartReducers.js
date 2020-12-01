import * as actionTypes from "../../actions/actionTypes";

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

const cartAddItem = (state, action) => {
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
};

const cartRemoveItem = (state, action) => {
  return {
    ...state,
    cartItems: state.cartItems.filter((x) => x.product !== action.payload),
  };
};

const cartSaveShippingAddress = (state, action) => {
  return {
    ...state,
    shippingAddress: action.payload,
  };
};

const cartSavePaymentMethod = (state, action) => {
  return {
    ...state,
    paymentMethod: action.payload,
  };
};

const cartReset = (state, action) => {
  return {
    ...state,
    cartItems: [],
  };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      return cartAddItem(state, action);
    case actionTypes.CART_REMOVE_ITEM:
      return cartRemoveItem(state, action);
    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return cartSaveShippingAddress(state, action);
    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return cartSavePaymentMethod(state, action);
    case actionTypes.CART_RESET:
      return cartReset(state, action);
    default:
      return state;
  }
};

export default cartReducer;
