import { ActionType, ActionProps } from "../action-types/actionTypes";

export const orderCreateReducer = (
  state = { },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.ORDER_CREATE_REQUEST:
      return { loading: true };
    case ActionType.ORDER_CREATE_SUCCESS:
      return { loading: false, success:true, order: action.payload };
    case ActionType.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
