export enum ActionType {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",

  SINGLE_PRODUCT_REQUEST = "SINGLE_PRODUCT_REQUEST",
  SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS",
  SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL",
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

export type ActionProps =
  | productRequestAction
  | productSuccessAction
  | productFailAction
  | singleProductRequest
  | singleProductSuccess
  | singleProductFail;
