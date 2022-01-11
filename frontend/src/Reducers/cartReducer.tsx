import { ActionType, ActionProps } from "../action-types/actionTypes";

interface cart {
  cartItems: {
    productId?: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
  }[];
}

export const cartReducer = (state = { cartItems: [] }, action: ActionProps) => {
  switch (action.type) {
    case ActionType.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
