import * as actionTypes from "../../../actions/actionTypes";

const initialstate = {
  order: {},
  loading: false,
  success: false,
  error: "",
};

export const orderCreateRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderCreateSuccess = (state, action) => {
  return {
    ...state,
    order: action.order,
    loading: false,
    success: true,
  };
};

export const orderCreateFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const orderCreateReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return orderCreateRequest(state, action);
    case actionTypes.ORDER_CREATE_SUCCESS:
      return orderCreateSuccess(state, action);
    case actionTypes.ORDER_CREATE_FAIL:
      return orderCreateFail(state, action);
    case actionTypes.ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export default orderCreateReducer;
