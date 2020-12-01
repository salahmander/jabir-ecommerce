import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setProductDetailRequest = () => {
  return {
    type: actionTypes.PRODUCT_DETAIL_REQUEST,
  };
};

export const setProductDetailSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_DETAIL_SUCCESS,
    product: product,
  };
};

export const setProductDetailFail = (error) => {
  return {
    type: actionTypes.PRODUCT_DETAIL_FAIL,
    error: error,
  };
};

export const fetchProductDetail = (id) => {
  return (dispatch) => {
    dispatch(setProductDetailRequest());
    return axios
      .get(`/api/products/${id}`)
      .then((response) => {
        dispatch(setProductDetailSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductDetailFail(errorMessage));
      });
  };
};
