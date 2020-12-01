import * as actionTypes from "../../../actionTypes";
import axios from "axios";

export const setOrderDeliverRequest = () => {
  return {
    type: actionTypes.ORDER_DELIVER_REQUEST,
  };
};

export const setOrderDeliverSuccess = () => {
  return {
    type: actionTypes.ORDER_DELIVER_SUCCESS,
  };
};

export const setOrderDeliverFail = (error) => {
  return {
    type: actionTypes.ORDER_DELIVER_FAIL,
    error: error,
  };
};

export const resetOrderDeliver = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.ORDER_DELIVER_RESET });
  };
};

export const deliverOrder = (order) => {
  return (dispatch, getState) => {
    dispatch(setOrderDeliverRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    return axios
      .put(`/api/orders/${order._id}/deliver`, {}, config)
      .then((response) => {
        dispatch(setOrderDeliverSuccess(response.data));
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch(setOrderDeliverFail(errorMessage));
      });
  };
};
