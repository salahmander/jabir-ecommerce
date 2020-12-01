import * as actionTypes from "../../../../actions/actionTypes";

const initialState = {
  users: [],
  loading: false,
  error: "",
};

const userListRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const userListSuccess = (state, action) => {
  return {
    ...state,
    users: action.users,
    loading: false,
  };
};

const userListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const userListReset = (state, action) => {
  return {
    ...state,
    users: [],
  };
};

const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LIST_REQUEST:
      return userListRequest(state, action);
    case actionTypes.USER_LIST_SUCCESS:
      return userListSuccess(state, action);
    case actionTypes.USER_LIST_FAIL:
      return userListFail(state, action);
    case actionTypes.USER_LIST_RESET:
      return userListReset(state, action);
    default:
      return state;
  }
};

export default userListReducer;
