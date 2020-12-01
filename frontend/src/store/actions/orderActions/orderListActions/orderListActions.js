import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setOrderListRequest = () => {
  return {
    type: actionTypes.ORDER_LIST_REQUEST,
  };
};

export const setOrderListSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_LIST_SUCCESS,
    orders: orders,
  };
};

export const setOrderListFail = (error) => {
  return {
    type: actionTypes.ORDER_LIST_FAIL,
    error: error,
  };
};

export const getOrderList = () => {
  return (dispatch, getState) => {
    dispatch(setOrderListRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    //Pass in the token.
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`/api/orders/myorders`, config)
      .then((response) => {
        dispatch(setOrderListSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setOrderListFail(errorMessage));
      });
  };
};
