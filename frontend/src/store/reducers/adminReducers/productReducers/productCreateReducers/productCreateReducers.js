import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  product: {},
  success: false,
  loading: false,
  error: "",
};

const productCreateRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productCreateSuccess = (state, action) => {
  return {
    ...state,
    product: action.product,
    success: true,
    loading: false,
  };
};

const productCreateFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productCreateReset = (state, action) => {
  return {
    ...state,
    success: false,
    loading: false,
    error: "",
  };
};

const productCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return productCreateRequest(state, action);
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return productCreateSuccess(state, action);
    case actionTypes.PRODUCT_CREATE_FAIL:
      return productCreateFail(state, action);
    case actionTypes.PRODUCT_CREATE_RESET:
      return productCreateReset(state, action);
    default:
      return state;
  }
};

export default productCreateReducer;
