import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

const productTopRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productTopSuccess = (state, action) => {
  return {
    ...state,
    products: action.products,
    loading: false,
  };
};

const productTopFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productTopRatedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_TOP_REQUEST:
      return productTopRequest(state, action);
    case actionTypes.PRODUCT_TOP_SUCCESS:
      return productTopSuccess(state, action);
    case actionTypes.PRODUCT_TOP_FAIL:
      return productTopFail(state, action);
    default:
      return state;
  }
};

export default productTopRatedReducer;
