import * as actionTypes from "../../actionTypes";
import axios from "axios";
import { login } from "../userLoginActions/userLoginActions";

export const setUserRegisterRequest = () => {
  return {
    type: actionTypes.USER_REGISTER_REQUEST,
  };
};

export const setUserRegisterSuccess = (userInfo) => {
  return {
    type: actionTypes.USER_REGISTER_SUCCESS,
    userInfo: userInfo,
  };
};

export const setUserRegisterFail = (error) => {
  return {
    type: actionTypes.USER_REGISTER_FAIL,
    error: error,
  };
};

export const register = (name, email, password) => {
  return (dispatch) => {
    dispatch(setUserRegisterRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios
      .post(`/api/users`, { name, email, password }, config)
      .then((response) => {
        dispatch(setUserRegisterSuccess(response.data));
        dispatch(login(email, password));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserRegisterFail(errorMessage));
      });
  };
};
