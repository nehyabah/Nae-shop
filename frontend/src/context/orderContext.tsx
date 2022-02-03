import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reduxStore";
import { ActionType } from "../action-types/actionTypes";



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

export const getOrderDetails =
  (id: string | undefined) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.ORDER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      console.log("data", data);

      dispatch({
        type: ActionType.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

interface paymentResultProps {
  id?: string;
}

export const payOrder =
  (orderId: string | undefined, paymentResult: paymentResultProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ActionType.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const myOrders =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.MY_ORDER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      dispatch({
        type: ActionType.MY_ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.MY_ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listOrders =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.ORDER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders`, config);

      dispatch({
        type: ActionType.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
