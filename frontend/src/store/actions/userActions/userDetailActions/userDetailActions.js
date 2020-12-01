import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setUserDetailRequest = () => {
  return {
    type: actionTypes.USER_DETAIL_REQUEST,
  };
};

export const setUserDetailSuccess = (user) => {
  return {
    type: actionTypes.USER_DETAIL_SUCCESS,
    user: user,
  };
};

export const setUserDetailFail = (error) => {
  return {
    type: actionTypes.USER_DETAIL_FAIL,
    error: error,
  };
};

export const getUserDetails = (id) => {
  return (dispatch, getState) => {
    dispatch(setUserDetailRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`/api/users/${id}`, config)
      .then((response) => {
        dispatch(setUserDetailSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setUserDetailFail(errorMessage));
      });
  };
};
