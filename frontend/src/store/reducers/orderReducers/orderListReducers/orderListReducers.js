import * as actionTypes from "../../../actions/actionTypes";

const initialstate = {
  orders: [],
  loading: true,
  error: "",
};

export const orderListRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderListSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  };
};

export const orderListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

export const orderListReset = (state, action) => {
  return {
    ...state,
    orders: [],
  };
};

const orderListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_REQUEST:
      return orderListRequest(state, action);
    case actionTypes.ORDER_LIST_SUCCESS:
      return orderListSuccess(state, action);
    case actionTypes.ORDER_LIST_FAIL:
      return orderListFail(state, action);
    case actionTypes.ORDER_LIST_RESET:
      return orderListReset(state, action);
    default:
      return state;
  }
};

export default orderListReducer;
