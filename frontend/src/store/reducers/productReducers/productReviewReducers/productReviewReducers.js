import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  success: false,
  loading: false,
  error: "",
};

const productReviewRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productReviewSuccess = (state, action) => {
  return {
    ...state,
    success: true,
    loading: false,
  };
};

const productReviewFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_REVIEW_REQUEST:
      return productReviewRequest(state, action);
    case actionTypes.PRODUCT_REVIEW_SUCCESS:
      return productReviewSuccess(state, action);
    case actionTypes.PRODUCT_REVIEW_FAIL:
      return productReviewFail(state, action);
    case actionTypes.PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export default productReviewReducer;
