import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  product: {},
  success: false,
  loading: false,
  error: "",
};

const productEditRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productEditSuccess = (state, action) => {
  return {
    ...state,
    product: {},
    success: true,
    loading: false,
  };
};

const productEditFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_EDIT_REQUEST:
      return productEditRequest(state, action);
    case actionTypes.PRODUCT_EDIT_SUCCESS:
      return productEditSuccess(state, action);
    case actionTypes.PRODUCT_EDIT_FAIL:
      return productEditFail(state, action);
    case actionTypes.PRODUCT_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export default productEditReducer;
