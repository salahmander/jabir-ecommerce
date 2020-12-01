import * as actionTypes from "../../../actionTypes";

import { setUserDetailSuccess } from "../../../userActions/userDetailActions/userDetailActions";
import axios from "axios";

export const setUserEditRequest = () => {
  return {
    type: actionTypes.USER_EDIT_REQUEST,
  };
};

export const setUserEditSuccess = () => {
  return {
    type: actionTypes.USER_EDIT_SUCCESS,
  };
};

export const setUserEditFail = (error) => {
  return {
    type: actionTypes.USER_EDIT_FAIL,
    error: error,
  };
};

export const resetUserEdit = () => {
  return {
    type: actionTypes.USER_EDIT_RESET,
  };
};

export const editUser = (user) => {
  return (dispatch, getState) => {
    dispatch(setUserEditRequest());

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .put(`/api/users/${user._id}`, user, config)
      .then((response) => {
        dispatch(setUserDetailSuccess(response.data));
        dispatch(setUserEditSuccess());
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserEditFail(errorMessage));
      });
  };
};
