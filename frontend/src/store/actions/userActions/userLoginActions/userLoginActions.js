import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setUserLoginRequest = () => {
  return {
    type: actionTypes.USER_LOGIN_REQUEST,
  };
};

export const setUserLoginSuccess = (userInfo) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
  };
};

export const setUserLoginFail = (error) => {
  return {
    type: actionTypes.USER_LOGIN_FAIL,
    error: error,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setUserLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post(`/api/users/login`, { email, password }, config)
      .then((response) => {
        dispatch(setUserLoginSuccess(response.data));
        //Set user to local storage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserLoginFail(errorMessage));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.USER_LOGOUT });
    dispatch({ type: actionTypes.USER_DETAIL_RESET });
    dispatch({ type: actionTypes.USER_LIST_RESET });
    dispatch({ type: actionTypes.ORDER_LIST_RESET });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    document.location.href = "/login";
  };
};
