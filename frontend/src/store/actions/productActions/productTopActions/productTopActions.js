import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setTopProductsRequest = () => {
  return {
    type: actionTypes.PRODUCT_TOP_REQUEST,
  };
};

export const setTopProductsSuccess = (products) => {
  return {
    type: actionTypes.PRODUCT_TOP_SUCCESS,
    products: products,
  };
};

export const setTopProductsFail = (error) => {
  return {
    type: actionTypes.PRODUCT_TOP_FAIL,
    error: error,
  };
};

export const fetchTopProducts = () => {
  return (dispatch) => {
    dispatch(setTopProductsRequest());
    return axios
      .get(`/api/products/top`)
      .then((response) => {
        dispatch(setTopProductsSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setTopProductsFail(errorMessage));
      });
  };
};
