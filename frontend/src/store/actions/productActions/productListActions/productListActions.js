import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setProductListRequest = () => {
  return {
    type: actionTypes.PRODUCT_LIST_REQUEST,
  };
};

export const setProductListSuccess = (products) => {
  return {
    type: actionTypes.PRODUCT_LIST_SUCCESS,
    products: products,
  };
};

export const setProductListFail = (error) => {
  return {
    type: actionTypes.PRODUCT_LIST_FAIL,
    error: error,
  };
};

export const fetchProductsList = (keyword = "", pageNumber = "") => {
  return (dispatch) => {
    dispatch(setProductListRequest());
    return axios
      .get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
      .then((response) => {
        dispatch(setProductListSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductListFail(errorMessage));
      });
  };
};
