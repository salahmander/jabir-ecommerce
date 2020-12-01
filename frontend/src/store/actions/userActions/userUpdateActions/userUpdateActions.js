import axios from "axios";

import * as actionTypes from "../../actionTypes";
import { setUserLoginSuccess } from "../userLoginActions/userLoginActions";

export const setUserUpdateRequest = () => {
  return {
    type: actionTypes.USER_UPDATE_REQUEST,
  };
};

export const setUserUpdateSuccess = (user) => {
  return {
    type: actionTypes.USER_UPDATE_SUCCESS,
    user: user,
  };
};

export const setUserUpdateFail = (error) => {
  return {
    type: actionTypes.USER_UPDATE_FAIL,
    error: error,
  };
};

export const resetUserUpdate = () => {
  return {
    type: actionTypes.USER_UPDATE_RESET,
  };
};

export const updateUserProfile = (user) => {
  return (dispatch, getState) => {
    dispatch(setUserUpdateRequest());

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
      .put(`/api/users/profile`, user, config)
      .then((response) => {
        dispatch(setUserUpdateSuccess(response.data));
        dispatch(setUserLoginSuccess(response.data));
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserUpdateFail(errorMessage));
      });
  };
};
