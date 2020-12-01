import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setProductCreateRequest = () => {
  return {
    type: actionTypes.PRODUCT_CREATE_REQUEST,
  };
};

export const setProductCreateSuccess = (prodcut) => {
  return {
    type: actionTypes.PRODUCT_CREATE_SUCCESS,
    product: prodcut,
  };
};

export const setProductCreateFail = (error) => {
  return {
    type: actionTypes.PRODUCT_CREATE_FAIL,
    error: error,
  };
};

export const resetProductCreate = () => {
  return {
    type: actionTypes.PRODUCT_CREATE_RESET,
  };
};

export const createProduct = () => {
  return (dispatch, getState) => {
    dispatch(setProductCreateRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .post(`/api/products`, {}, config)
      .then((response) => {
        dispatch(setProductCreateSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductCreateFail(errorMessage));
      });
  };
};
