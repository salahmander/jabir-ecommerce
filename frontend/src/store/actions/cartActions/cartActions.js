import * as actionTypes from "../actionTypes";
import axios from "axios";

export const setCartItem = (data, qty) => {
  return {
    type: actionTypes.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  };
};

export const addToCart = (id, qty) => {
  return (dispatch, getState) => {
    return axios
      .get(`/api/products/${id}`)
      .then((response) => {
        dispatch(setCartItem(response.data, qty));
        // Save entire cart to local storage
        localStorage.setItem(
          "cartItems",
          JSON.stringify(getState().cart.cartItems)
        );
      })
      .catch((error) => {
        let errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(errorMessage);
      });
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (paymentMethod) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CART_SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
  };
};
