import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: "",
};

const userDetailRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userDetailSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    loading: false,
  };
};

const userDetailFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userDetailReset = (state, action) => {
  return {
    ...state,
    user: {},
  };
};

const userDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAIL_REQUEST:
      return userDetailRequest(state, action);
    case actionTypes.USER_DETAIL_SUCCESS:
      return userDetailSuccess(state, action);
    case actionTypes.USER_DETAIL_FAIL:
      return userDetailFail(state, action);
    case actionTypes.USER_DETAIL_RESET:
      return userDetailReset(state, action);
    default:
      return state;
  }
};

export default userDetailReducer;
