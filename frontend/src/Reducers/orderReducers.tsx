import { ActionType, ActionProps } from "../action-types/actionTypes";




export const orderCreateReducer = (
  state = { },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.ORDER_CREATE_REQUEST:
      return {  loading: true };
    case ActionType.ORDER_CREATE_SUCCESS:
      return { loading: false, success:true, order: action.payload };
    case ActionType.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: [] },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ActionType.ORDER_DETAILS_SUCCESS:
      return { loading: false,  order: action.payload };
    case ActionType.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.ORDER_PAY_REQUEST:
      return {loading: true };
    case ActionType.ORDER_PAY_SUCCESS:
      return { loading: false,  success: true };
    case ActionType.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.ORDER_PAY_RESET:
      return {  };
    default:
      return state;
  }
};

export const myOrdersListReducer = (
  state = { orders:[]},
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.MY_ORDER_LIST_REQUEST:
      return {loading: true };
    case ActionType.MY_ORDER_LIST_SUCCESS:
      return { loading: false,  orders: action.payload };
    case ActionType.MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.MY_ORDER_LIST_RESET:
      return { orders:[]};
  
    default:
      return state;
  }
};
