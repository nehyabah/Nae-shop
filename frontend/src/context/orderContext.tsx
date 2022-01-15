import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reduxStore";
import { ActionType, ActionProps } from "../action-types/actionTypes";

type shippingAddress = {
  address: string;
  city: string;
  postcode: string;
  country: string;
};

type cartItems = {
  productId: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export interface orderProps {
  _id?: string;
  name?: string;
  email?: string;
  token?: string;
  password?: string;
  shippingAddress?: string;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt?: Date;
  isPaid?: boolean;
  orderItems: cartItems;
}

export const createOrder =
  (order: orderProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.ORDER_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({
        type: ActionType.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };