import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  userInfo: [],
  loading: false,
  error: "",
};

const userRegisterRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userRegisterSuccess = (state, action) => {
  return {
    ...state,
    userInfo: action.userInfo,
    loading: false,
  };
};

const userRegisterFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return userRegisterRequest(state, action);
    case actionTypes.USER_REGISTER_SUCCESS:
      return userRegisterSuccess(state, action);
    case actionTypes.USER_REGISTER_FAIL:
      return userRegisterFail(state, action);
    default:
      return state;
  }
};

export default userRegisterReducer;
