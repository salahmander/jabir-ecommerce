import * as actionTypes from "../../actionTypes";
import axios from "axios";

export const setProductReviewRequest = () => {
  return {
    type: actionTypes.PRODUCT_REVIEW_REQUEST,
  };
};

export const setProductReviewSuccess = (prodcut) => {
  return {
    type: actionTypes.PRODUCT_REVIEW_SUCCESS,
    product: prodcut,
  };
};

export const setProductReviewFail = (error) => {
  return {
    type: actionTypes.PRODUCT_REVIEW_FAIL,
    error: error,
  };
};

export const resetProductReview = () => {
  return {
    type: actionTypes.PRODUCT_REVIEW_RESET,
  };
};

export const creatProductReview = (productId, review) => {
  return (dispatch, getState) => {
    dispatch(setProductReviewRequest());

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
      .post(`/api/products/${productId}/reviews`, review, config)
      .then(() => {
        dispatch(setProductReviewSuccess());
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setProductReviewFail(errorMessage));
      });
  };
};
