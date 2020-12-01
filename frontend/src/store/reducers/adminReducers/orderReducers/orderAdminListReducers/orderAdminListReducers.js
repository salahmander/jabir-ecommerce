import * as actionTypes from "../../../../actions/actionTypes";

const initialstate = {
  orders: [],
  loading: true,
  error: "",
};

export const orderAdminListRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

export const orderAdminListSuccess = (state, action) => {
  return {
    ...state,
    orders: action.orders,
    loading: false,
  };
};

export const orderAdminListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const orderAdminListReducer = (state = initialstate, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADMIN_LIST_REQUEST:
      return orderAdminListRequest(state, action);
    case actionTypes.ORDER_ADMIN_LIST_SUCCESS:
      return orderAdminListSuccess(state, action);
    case actionTypes.ORDER_ADMIN_LIST_FAIL:
      return orderAdminListFail(state, action);
    default:
      return state;
  }
};

export default orderAdminListReducer;
