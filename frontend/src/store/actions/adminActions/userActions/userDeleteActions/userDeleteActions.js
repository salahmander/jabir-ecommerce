import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setUserDeleteRequest = () => {
  return {
    type: actionTypes.USER_DELETE_REQUEST,
  };
};

export const setUserDeleteSuccess = (successMessage) => {
  return {
    type: actionTypes.USER_DELETE_SUCCESS,
    successMessage: successMessage,
  };
};

export const setUserDeleteFail = (error) => {
  return {
    type: actionTypes.USER_DELETE_FAIL,
    error: error,
  };
};

export const resetUserDelete = () => {
  return {
    type: actionTypes.USER_DELETE_RESET,
  };
};

export const deleteUser = (id) => {
  return (dispatch, getState) => {
    dispatch(setUserDeleteRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .delete(`/api/users/${id}`, config)
      .then((response) => {
        dispatch(setUserDeleteSuccess(response.data.message));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserDeleteFail(errorMessage));
      });
  };
};
