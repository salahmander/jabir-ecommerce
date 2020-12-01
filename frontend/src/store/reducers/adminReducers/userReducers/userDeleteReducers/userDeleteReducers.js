import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  success: false,
  successMessage: "",
  loading: false,
  error: "",
};

const userDeleteRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userDeleteSuccess = (state, action) => {
  return {
    ...state,
    success: true,
    successMessage: action.successMessage,
    loading: false,
  };
};

const userDeleteFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userDeleteReset = (state, action) => {
  return {
    ...state,
    success: false,
    successMessage: "",
    error: "",
    loading: false,
  };
};

const userDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_DELETE_REQUEST:
      return userDeleteRequest(state, action);
    case actionTypes.USER_DELETE_SUCCESS:
      return userDeleteSuccess(state, action);
    case actionTypes.USER_DELETE_FAIL:
      return userDeleteFail(state, action);
    case action.USER_DELETE_RESET:
      return userDeleteReset(state, action);
    default:
      return state;
  }
};

export default userDeleteReducer;
