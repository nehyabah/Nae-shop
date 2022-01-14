import { ActionType, ActionProps } from "../action-types/actionTypes";

interface cart {
  cartItems: {
    productId?: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
    existItem?: any | undefined;
    tempCart?: any | undefined;
  }[];
  shippingAddress?: {
    address?: string | undefined;
    city?: string | undefined;
    postcode?: string | undefined;
    country?: string | undefined;
  };
  paymentMethod?:string
}



interface x {
  countInStock: number;
  image: string;
  name: string;
  price: number;
  productId: string;
  qty: number;
}
export const cartReducer = (
  state = { cartItems: [], shippingAddress:{} },
  action: ActionProps
): cart => {
  if (action.type === ActionType.CART_ADD_ITEM) {
    const item = action.payload;

    const existItem: any = state.cartItems.find(
      (x: any) => x.productId === item.productId
    );

    if (existItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem: any) => {
          return cartItem.productId === existItem.productId ? item : cartItem;
        }),
      };
    } else {
      return { ...state, cartItems: [...state.cartItems, item] };
    }
  }
  if (action.type === ActionType.CART_REMOVE_ITEM) {
    const itemId: any = action.payload;

    const newCart: x[] = state.cartItems.filter((x: x) => {
      return x.productId !== itemId;
    });

    return { ...state, cartItems: newCart };
  }

  if (action.type === ActionType.CART_SAVE_SHIPPING_ADDRESS) {
    const shippingAddress: string = action.payload;

    return { ...state, shippingAddress: action.payload };
  }
  if (action.type === ActionType.CART_SAVE_PAYMENT_METHOD) {
    const paymentMethod: string = action.payload;

    return { ...state, paymentMethod: action.payload };
  }

  return state;
};
