import axios from "axios";
import { Dispatch } from "react";
import { RootState } from "../reduxStore";

import { ActionType, ActionProps } from "../action-types/actionTypes";

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: Dispatch<ActionProps>, getState: () => RootState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: ActionType.CART_ADD_ITEM,
      payload: {
        productId: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string) =>
  (dispatch: Dispatch<ActionProps>, getState: () => RootState) => {
    dispatch({
      type: ActionType.CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
