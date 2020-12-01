import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  product: {
    reviews: [],
  },
  loading: false,
  error: "",
};

const productDetailRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productDetailSuccess = (state, action) => {
  return {
    ...state,
    product: action.product,
    loading: false,
  };
};

const productDetailFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
      return productDetailRequest(state, action);
    case actionTypes.PRODUCT_DETAIL_SUCCESS:
      return productDetailSuccess(state, action);
    case actionTypes.PRODUCT_DETAIL_FAIL:
      return productDetailFail(state, action);
    default:
      return state;
  }
};

export default productDetailReducer;
