import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  success: false,
  successMessage: "",
  loading: false,
  error: "",
};

const productDeleteRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productDeleteSuccess = (state, action) => {
  return {
    ...state,
    success: true,
    successMessage: action.successMessage,
    loading: false,
  };
};

const productDeleteFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productDeleteReset = (state, action) => {
  return {
    ...state,
    success: false,
    successMessage: "",
    error: "",
    loading: false,
  };
};

const productDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return productDeleteRequest(state, action);
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return productDeleteSuccess(state, action);
    case actionTypes.PRODUCT_DELETE_FAIL:
      return productDeleteFail(state, action);
    case actionTypes.PRODUCT_DELETE_RESET:
      return productDeleteReset(state, action);
    default:
      return state;
  }
};

export default productDeleteReducer;
