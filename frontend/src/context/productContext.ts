import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "../reduxStore";
import { ActionType } from "../action-types/actionTypes";

export const listProducts =
  (keyword: string = "") =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionType.PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(`/api/products?keyword=${keyword}`);

      dispatch({
        type: ActionType.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductDetails =
  (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionType.SINGLE_PRODUCT_REQUEST });

      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({
        type: ActionType.SINGLE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.SINGLE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct =
  (id: string | undefined) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/products/${id}`, config);

      dispatch({
        type: ActionType.PRODUCT_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/products`, {}, config);

      dispatch({
        type: ActionType.PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

interface ProductUpdateProps {
  _id?: string;
  brand?: string;
  category?: string;
  countInStock?: number | string;
  description?: string;
  image?: string;
  name?: string;
  price?: number | string;
}
export const updateProduct =
  (product: ProductUpdateProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_UPDATE_REQUEST,
      });

      const userToken = localStorage.getItem("token");
      // const {
      //   userLogin: { userInfo },
      // } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ActionType.PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

interface reviewProps {
  comment: string;
  createdAt?: string;
  name?: string;
  rating: number;
  updatedAt?: string;
  user?: string;
  _id?: string;
}

export const createProductReview =
  (productId: any, review: reviewProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_REQUEST,
      });
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
