import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  userInfo: [],
  loading: false,
  error: "",
  success: false,
};

const userUpdateRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userUpdateSuccess = (state, action) => {
  return {
    ...state,
    userInfo: action.userInfo,
    loading: false,
    success: true,
  };
};

const userUpdateFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return userUpdateRequest(state, action);
    case actionTypes.USER_UPDATE_SUCCESS:
      return userUpdateSuccess(state, action);
    case actionTypes.USER_UPDATE_FAIL:
      return userUpdateFail(state, action);
    case actionTypes.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export default userUpdateReducer;
