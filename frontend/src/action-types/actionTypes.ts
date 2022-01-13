export enum ActionType {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",

  SINGLE_PRODUCT_REQUEST = "SINGLE_PRODUCT_REQUEST",
  SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS",
  SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL",

  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",

  USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",

  USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",

  USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST",
  USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS",
  USER_DETAILS_FAIL = "USER_DETAILS_FAIL",
}

// props (types of action)
// REVIEW & EDIT PAYLOAD FOR ALL ITEMS
interface productRequestAction {
  type: ActionType.PRODUCT_LIST_REQUEST;
}

interface productSuccessAction {
  type: ActionType.PRODUCT_LIST_SUCCESS;
  payload: {
    pages: number;
    page: number;
    products: {
      brand?: string;
      category?: string;
      countInStock?: number;
      description?: string;
      image?: string;
      name?: string;
      numReviews?: number;
      price?: number;
      rating?: number;
      _id?: number;
      color?: any;
    };
  };
}
interface productFailAction {
  type: ActionType.PRODUCT_LIST_FAIL;
  payload: { error: string };
}
interface singleProductRequest {
  type: ActionType.SINGLE_PRODUCT_REQUEST;
}

interface singleProductSuccess {
  type: ActionType.SINGLE_PRODUCT_SUCCESS;
  payload: {};
}
interface singleProductFail {
  type: ActionType.SINGLE_PRODUCT_FAIL;
  payload: { error: string };
}

interface cartAddItem {
  type: ActionType.CART_ADD_ITEM;
  payload: {
    productId?: any;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
  };
}
interface cartRemoveItem {
  type: ActionType.CART_REMOVE_ITEM;
  payload: string;
}
interface userLoginRequest {
  type: ActionType.USER_LOGIN_REQUEST;
  payload: string;
}
interface userLoginSuccess {
  type: ActionType.USER_LOGIN_SUCCESS;
  payload: string;
}
interface userLoginFail {
  type: ActionType.USER_LOGIN_FAIL;
  payload: string;
}
interface userLogout {
  type: ActionType.USER_LOGOUT;
  payload: string;
}
interface userRegisterRequest {
  type: ActionType.USER_REGISTER_REQUEST;
  payload: string;
}
interface userRegisterSuccess {
  type: ActionType.USER_REGISTER_SUCCESS;
  payload: string;
}
interface userRegisterFail {
  type: ActionType.USER_REGISTER_FAIL;
  payload: string;
}
interface userDetailsRequest {
  type: ActionType.USER_DETAILS_REQUEST;
  payload: string;
}
interface userDetailsSuccess {
  type: ActionType.USER_DETAILS_SUCCESS;
  payload: string;
}
interface userDetailsFail {
  type: ActionType.USER_DETAILS_FAIL;
  payload: string;
}

export type ActionProps =
  | productRequestAction
  | productSuccessAction
  | productFailAction
  | singleProductRequest
  | singleProductSuccess
  | singleProductFail
  | cartAddItem
  | cartRemoveItem
  | userLoginRequest
  | userLoginSuccess
  | userLoginFail
  | userLogout
  | userRegisterRequest
  | userRegisterSuccess
  | userRegisterFail
  | userDetailsRequest
  | userDetailsSuccess
  | userDetailsFail;
