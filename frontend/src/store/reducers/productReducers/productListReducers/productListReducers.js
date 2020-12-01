import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  products: [],
  loading: false,
  error: "",
};

const productListRequest = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const productListSuccess = (state, action) => {
  return {
    ...state,
    products: action.products.products,
    pages: action.products.pages,
    page: action.products.page,
    loading: false,
  };
};

const productListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return productListRequest(state, action);
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return productListSuccess(state, action);
    case actionTypes.PRODUCT_LIST_FAIL:
      return productListFail(state, action);
    default:
      return state;
  }
};

export default productListReducer;
