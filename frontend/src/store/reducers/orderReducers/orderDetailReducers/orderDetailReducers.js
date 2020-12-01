import * as actionTypes from "../../../actions/actionTypes";

const initialstate = {
  order: [],
  shippingAddress: {},
  loading: true,
  error: "",
};

export const orderDetailRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderDetailSuccess = (state, action) => {
  return {
    ...state,
    order: action.order,
    loading: false,
  };
};

export const orderDetailFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const orderDetailReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DETAIL_REQUEST:
      return orderDetailRequest(state, action);
    case actionTypes.ORDER_DETAIL_SUCCESS:
      return orderDetailSuccess(state, action);
    case actionTypes.ORDER_DETAIL_FAIL:
      return orderDetailFail(state, action);
    default:
      return state;
  }
};

export default orderDetailReducer;
