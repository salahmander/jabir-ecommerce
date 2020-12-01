import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setProductDeleteRequest = () => {
  return {
    type: actionTypes.PRODUCT_DELETE_REQUEST,
  };
};

export const setProductDeleteSuccess = (successMessage) => {
  return {
    type: actionTypes.PRODUCT_DELETE_SUCCESS,
    successMessage: successMessage,
  };
};

export const setProductDeleteFail = (error) => {
  return {
    type: actionTypes.PRODUCT_DELETE_FAIL,
    error: error,
  };
};

export const resetProductDelete = () => {
  return {
    type: actionTypes.PRODUCT_DELETE_RESET,
  };
};

export const deleteProduct = (id) => {
  return (dispatch, getState) => {
    dispatch(setProductDeleteRequest());

    const {
      userLogin: { userInfo },
    } = getState(); //Destructure get user object

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .delete(`/api/products/${id}`, config)
      .then((response) => {
        dispatch(setProductDeleteSuccess(response.data.message));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductDeleteFail(errorMessage));
      });
  };
};
