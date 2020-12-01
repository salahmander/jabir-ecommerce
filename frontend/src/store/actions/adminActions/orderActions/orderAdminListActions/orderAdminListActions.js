import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setOrderAdminListRequest = () => {
  return {
    type: actionTypes.ORDER_ADMIN_LIST_REQUEST,
  };
};

export const setOrderAdminListSuccess = (orders) => {
  return {
    type: actionTypes.ORDER_ADMIN_LIST_SUCCESS,
    orders: orders,
  };
};

export const setOrderAdminListFail = (error) => {
  return {
    type: actionTypes.ORDER_ADMIN_LIST_FAIL,
    error: error,
  };
};

export const getOrderList = () => {
  return (dispatch, getState) => {
    dispatch(setOrderAdminListRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    //Pass in the token.
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .get(`/api/orders`, config)
      .then((response) => {
        dispatch(setOrderAdminListSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setOrderAdminListFail(errorMessage));
      });
  };
};
