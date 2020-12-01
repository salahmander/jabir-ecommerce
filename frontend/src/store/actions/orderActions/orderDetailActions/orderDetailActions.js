import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setOrderDetailRequest = () => {
  return {
    type: actionTypes.ORDER_DETAIL_REQUEST,
  };
};

export const setOrderDetailSuccess = (order) => {
  return {
    type: actionTypes.ORDER_DETAIL_SUCCESS,
    order: order,
  };
};

export const setOrderDetailFail = (error) => {
  return {
    type: actionTypes.ORDER_DETAIL_FAIL,
    error: error,
  };
};

export const getOrderDetails = (orderId) => {
  return (dispatch, getState) => {
    dispatch(setOrderDetailRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    //Pass in the token.
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`/api/orders/${orderId}`, config)
      .then((response) => {
        dispatch(setOrderDetailSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setOrderDetailFail(errorMessage));
      });
  };
};
