import * as actionTypes from "../../../actions/actionTypes";

const initialstate = {
  loading: false,
  success: false,
  error: "",
};

export const orderPayRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderPaySuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true,
  };
};

export const orderPayFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const orderPayReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return orderPayRequest(state, action);
    case actionTypes.ORDER_PAY_SUCCESS:
      return orderPaySuccess(state, action);
    case actionTypes.ORDER_PAY_FAIL:
      return orderPayFail(state, action);
    case actionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export default orderPayReducer;
