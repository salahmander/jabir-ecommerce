import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setUserListRequest = () => {
  return {
    type: actionTypes.USER_LIST_REQUEST,
  };
};

export const setUserListSuccess = (users) => {
  return {
    type: actionTypes.USER_LIST_SUCCESS,
    users: users,
  };
};

export const setUserListFail = (error) => {
  return {
    type: actionTypes.USER_LIST_FAIL,
    error: error,
  };
};

export const listUsers = () => {
  return (dispatch, getState) => {
    dispatch(setUserListRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`/api/users`, config)
      .then((response) => {
        dispatch(setUserListSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserListFail(errorMessage));
      });
  };
};
