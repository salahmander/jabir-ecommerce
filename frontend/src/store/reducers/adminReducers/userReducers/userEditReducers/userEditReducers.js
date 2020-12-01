import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  successMessage: false,
  loading: false,
  error: "",
};

const userEditRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userEditSuccess = (state, action) => {
  return {
    ...state,
    successMessage: true,
    loading: false,
  };
};

const userEditFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userEditReset = (state, action) => {
  return {
    ...state,
    successMessage: false,
    error: "",
    loading: false,
  };
};

const userEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_EDIT_REQUEST:
      return userEditRequest(state, action);
    case actionTypes.USER_EDIT_SUCCESS:
      return userEditSuccess(state, action);
    case actionTypes.USER_EDIT_FAIL:
      return userEditFail(state, action);
    case actionTypes.USER_EDIT_RESET:
      return userEditReset(state, action);
    default:
      return state;
  }
};

export default userEditReducer;
