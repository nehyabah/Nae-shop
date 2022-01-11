import { ActionType, ActionProps } from "../action-types/actionTypes";

export const productListReducer = (
  state = { products: [] },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case ActionType.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case ActionType.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.SINGLE_PRODUCT_REQUEST:
      return { loading: true, ...state };
    case ActionType.SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case ActionType.SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
