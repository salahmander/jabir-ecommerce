import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setOrderPayRequest = () => {
  return {
    type: actionTypes.ORDER_PAY_REQUEST,
  };
};

export const setOrderPaySuccess = (order) => {
  return {
    type: actionTypes.ORDER_PAY_SUCCESS,
  };
};

export const setOrderPayFail = (error) => {
  return {
    type: actionTypes.ORDER_PAY_FAIL,
    error: error,
  };
};

export const orderPayReset = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ORDER_PAY_RESET });
  };
};

export const payOrder = (orderId, paymentResult) => {
  return (dispatch, getState) => {
    dispatch(setOrderPayRequest());
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
      .put(`/api/orders/${orderId}/pay`, paymentResult, config)
      .then((response) => {
        dispatch(setOrderPaySuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setOrderPayFail(errorMessage));
      });
  };
};
