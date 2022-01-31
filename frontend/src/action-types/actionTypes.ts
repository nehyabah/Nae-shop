export enum ActionType {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",

  SINGLE_PRODUCT_REQUEST = "SINGLE_PRODUCT_REQUEST",
  SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS",
  SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL",

  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS",
  CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD",

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
  USER_DETAILS_RESET = "USER_DETAILS_RESET",

  USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST",
  USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS",
  USER_UPDATE_FAIL = "USER_UPDATE_FAIL",
  USER_UPDATE_RESET = "USER_UPDATE_RESET",

  ORDER_CREATE_REQUEST = " ORDER_CREATE_REQUEST",
  ORDER_CREATE_SUCCESS = " ORDER_CREATE_SUCCESS",
  ORDER_CREATE_FAIL = " ORDER_CREATE_FAIL",

  ORDER_DETAILS_REQUEST = " ORDER_DETAILS_REQUEST",
  ORDER_DETAILS_SUCCESS = " ORDER_DETAILS_SUCCESS",
  ORDER_DETAILS_FAIL = " ORDER_DETAILS_FAIL",

  ORDER_PAY_REQUEST = " ORDER_PAY_REQUEST",
  ORDER_PAY_SUCCESS = " ORDER_PAY_SUCCESS",
  ORDER_PAY_FAIL = " ORDER_PAY_FAIL",
  ORDER_PAY_RESET = " ORDER_PAY_RESET",

  MY_ORDER_LIST_REQUEST = " MY_ORDER_LIST_REQUEST",
  MY_ORDER_LIST_SUCCESS = " MY_ORDER_LIST_SUCCESS",
  MY_ORDER_LIST_FAIL = " MY_ORDER_LIST_FAIL",
  MY_ORDER_LIST_RESET = " MY_ORDER_LIST_RESET",

  USER_LIST_REQUEST = "USER_LIST_REQUEST",
  USER_LIST_SUCCESS = "USER_LIST_SUCCESS",
  USER_LIST_FAIL = "USER_LIST_FAIL",
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
interface cartSaveShippingAddress {
  type: ActionType.CART_SAVE_SHIPPING_ADDRESS;
  payload: any;
}
interface cartSavePaymentMethod {
  type: ActionType.CART_SAVE_PAYMENT_METHOD;
  payload: any;
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
interface userDetailsReset {
  type: ActionType.USER_DETAILS_RESET;
  payload: string;
}
interface userUpdateRequest {
  type: ActionType.USER_UPDATE_REQUEST;
  payload: string;
}
interface userUpdateSuccess {
  type: ActionType.USER_UPDATE_SUCCESS;
  payload: any;
}
interface userUpdateFail {
  type: ActionType.USER_UPDATE_FAIL;
  payload: string;
}
interface userUpdateReset {
  type: ActionType.USER_UPDATE_RESET;
  payload: string;
}
interface orderCreateRequest {
  type: ActionType.ORDER_CREATE_REQUEST;
  payload: string;
}
interface orderCreateSuccess {
  type: ActionType.ORDER_CREATE_SUCCESS;
  payload: string;
}
interface orderCreateFail {
  type: ActionType.ORDER_CREATE_FAIL;
  payload: string;
}
interface orderDetailsRequest {
  type: ActionType.ORDER_DETAILS_REQUEST;
  payload: string;
}
interface orderDetailsSuccess {
  type: ActionType.ORDER_DETAILS_SUCCESS;
  payload: string;
}
interface orderDetailsFail {
  type: ActionType.ORDER_DETAILS_FAIL;
  payload: string;
}
interface orderPayRequest {
  type: ActionType.ORDER_PAY_REQUEST;
  payload: string;
}
interface orderPaySuccess {
  type: ActionType.ORDER_PAY_SUCCESS;
  payload: string;
}
interface orderPayFail {
  type: ActionType.ORDER_PAY_FAIL;
  payload: string;
}
interface orderPayReset {
  type: ActionType.ORDER_PAY_RESET;
  payload: string;
}
interface myOrdersRequest {
  type: ActionType.MY_ORDER_LIST_REQUEST;
  payload: string;
}
interface myOrdersSuccess {
  type: ActionType.MY_ORDER_LIST_SUCCESS;
  payload: string;
}
interface myOrdersFail {
  type: ActionType.MY_ORDER_LIST_FAIL;
  payload: string;
}
interface myOrdersReset {
  type: ActionType.MY_ORDER_LIST_RESET;
  payload: string;
}
interface userListRequest {
  type: ActionType.USER_LIST_REQUEST;
  payload: string;
}
interface userListSuccess {
  type: ActionType.USER_LIST_SUCCESS;
  payload: string;
}
interface userListFail {
  type: ActionType.USER_LIST_FAIL;
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
  | userDetailsFail
  | userDetailsReset
  | userUpdateRequest
  | userUpdateSuccess
  | userUpdateFail
  | userUpdateReset
  | cartSaveShippingAddress
  | cartSavePaymentMethod
  | orderCreateRequest
  | orderCreateSuccess
  | orderCreateFail
  | orderDetailsRequest
  | orderDetailsSuccess
  | orderDetailsFail
  | orderPayRequest
  | orderPaySuccess
  | orderPayFail
  | orderPayReset
  | myOrdersRequest
  | myOrdersSuccess
  | myOrdersFail
  | myOrdersReset
  | userListSuccess
  | userListRequest
  | userListFail;
