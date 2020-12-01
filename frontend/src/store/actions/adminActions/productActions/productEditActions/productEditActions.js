import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setProductEditRequest = () => {
  return {
    type: actionTypes.PRODUCT_EDIT_REQUEST,
  };
};

export const setProductEditSuccess = (prodcut) => {
  return {
    type: actionTypes.PRODUCT_EDIT_SUCCESS,
    product: prodcut,
  };
};

export const setProductEditFail = (error) => {
  return {
    type: actionTypes.PRODUCT_EDIT_FAIL,
    error: error,
  };
};

export const resetProductEdit = () => {
  return {
    type: actionTypes.PRODUCT_EDIT_RESET,
  };
};

export const editProduct = (product) => {
  return (dispatch, getState) => {
    dispatch(setProductEditRequest());

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
      .put(`/api/products/${product._id}`, product, config)
      .then((response) => {
        dispatch(setProductEditSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductEditFail(errorMessage));
      });
  };
};
