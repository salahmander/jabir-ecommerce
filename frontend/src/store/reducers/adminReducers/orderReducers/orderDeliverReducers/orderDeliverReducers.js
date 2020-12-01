import * as actionTypes from "../../../../actions/actionTypes";

const initialstate = {
  loading: false,
  success: false,
  error: "",
};

export const orderDeliverRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderDeliverSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true,
  };
};

export const orderDeliverFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const orderDeliverReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DELIVER_REQUEST:
      return orderDeliverRequest(state, action);
    case actionTypes.ORDER_DELIVER_SUCCESS:
      return orderDeliverSuccess(state, action);
    case actionTypes.ORDER_DELIVER_FAIL:
      return orderDeliverFail(state, action);
    case actionTypes.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export default orderDeliverReducer;
