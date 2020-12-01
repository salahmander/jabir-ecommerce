import { combineReducers } from "redux";

import cartReducer from "./reducers/cartReducers/cartReducers";

import orderAdminListReducer from "./reducers/adminReducers/orderReducers/orderAdminListReducers/orderAdminListReducers";
import orderCreateReducer from "./reducers/orderReducers/orderCreateReducers/OrderCreateReducers";
import orderDeliverReducer from "./reducers/adminReducers/orderReducers/orderDeliverReducers/orderDeliverReducers";
import orderDetailsReducer from "./reducers/orderReducers/orderDetailReducers/orderDetailReducers";
import orderListReducer from "./reducers/orderReducers/orderListReducers/orderListReducers";
import orderPayReducer from "./reducers/orderReducers/orderPayReducers/orderPayReducers";

import productCreateReducer from "./reducers/adminReducers/productReducers/productCreateReducers/productCreateReducers";
import productDeleteReducer from "./reducers/adminReducers/productReducers/productDeleteReducers/productDeleteReducers";
import productDetailReducer from "./reducers/productReducers/productDetailReducers/productDetailReducers";
import productEditReducer from "./reducers/adminReducers/productReducers/productEditReducers/productEditReducers";
import productListReducer from "./reducers/productReducers/productListReducers/productListReducers";
import productReviewReducer from "./reducers/productReducers/productReviewReducers/productReviewReducers";
import productTopRatedReducer from "./reducers/productReducers/productTopReducers/productTopReducers";

import userDeleteReducer from "./reducers/adminReducers/userReducers/userDeleteReducers/userDeleteReducers";
import userDetailReducer from "./reducers/userReducers/userDetailReducers/userDetailReducers";
import userEditReducer from "./reducers/adminReducers/userReducers/userEditReducers/userEditReducers";
import userListReducer from "./reducers/adminReducers/userReducers/userListReducers/userListReducers";
import userLoginReducer from "./reducers/userReducers/userLoginReducers/userLoginReducers";
import userRegisterReducer from "./reducers/userReducers//userRegisterReducers/UserRegisterReducers";
import userUpdateReducer from "./reducers/userReducers/userUpdateReducers/userUpdateReducers";

export default combineReducers({
  cart: cartReducer,
  orderAdminList: orderAdminListReducer,
  orderCreate: orderCreateReducer,
  orderDeliver: orderDeliverReducer,
  orderDetail: orderDetailsReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productDetail: productDetailReducer,
  productEdit: productEditReducer,
  productList: productListReducer,
  productReview: productReviewReducer,
  productTopRated: productTopRatedReducer,
  userDelete: userDeleteReducer,
  userDetail: userDetailReducer,
  userEdit: userEditReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateReducer,
});
