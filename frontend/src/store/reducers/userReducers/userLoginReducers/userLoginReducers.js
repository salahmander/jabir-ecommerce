import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  userInfo: [],
  loading: false,
  error: "",
};

const userLoginRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userLoginSuccess = (state, action) => {
  return {
    ...state,
    userInfo: action.userInfo,
    loading: false,
  };
};

const userLoginFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return userLoginRequest(state, action);
    case actionTypes.USER_LOGIN_SUCCESS:
      return userLoginSuccess(state, action);
    case actionTypes.USER_LOGIN_FAIL:
      return userLoginFail(state, action);
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userLoginReducer;
