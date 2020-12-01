import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setCreateOrderRequest = () => {
  return {
    type: actionTypes.ORDER_CREATE_REQUEST,
  };
};

export const setCreateOrderSuccess = (order) => {
  return {
    type: actionTypes.ORDER_CREATE_SUCCESS,
    order: order,
  };
};

export const setCreateOrderFail = (error) => {
  return {
    type: actionTypes.ORDER_CREATE_FAIL,
    error: error,
  };
};

export const createOrder = (order) => {
  return (dispatch, getState) => {
    dispatch(setCreateOrderRequest());

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
      .post(`/api/orders`, order, config)
      .then((response) => {
        dispatch(setCreateOrderSuccess(response.data));
        dispatch({ type: actionTypes.CART_RESET });
        dispatch({ type: actionTypes.ORDER_CREATE_RESET });
        localStorage.removeItem("cartItems");
        localStorage.removeItem("paymentMethod");
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setCreateOrderFail(errorMessage));
      });
  };
};
