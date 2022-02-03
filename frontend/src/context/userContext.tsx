import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../reduxStore";
import { ActionType } from "../action-types/actionTypes";

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ActionType.USER_LOGIN_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/users/login`,
        { email, password },
        config
      );
      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("token");
  dispatch({ type: ActionType.USER_LOGOUT });
  dispatch({ type: ActionType.USER_DETAILS_RESET });
  dispatch({ type: ActionType.MY_ORDER_LIST_RESET });
  dispatch({ type: ActionType.USER_LIST_RESET });
};

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ActionType.USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/users`,
        { name, email, password },
        config
      );
      dispatch({
        type: ActionType.USER_REGISTER_SUCCESS,
        payload: data,
      });
      localStorage.setItem("token", data.token);
      dispatch({
        type: ActionType.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserDetails =
  (id: string | undefined) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_DETAILS_REQUEST,
      });

      const userToken = localStorage.getItem("token");
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: ActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
      console.log("data", data);
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

interface userUpdateProps {
  id?: string;
  name: string;
  email: string;
  token?: string;
  password?: string;
}

export const updateUserProfileDetails =
  (user: userUpdateProps) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_UPDATE_REQUEST,
      });
      const userToken = localStorage.getItem("token");
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({
        type: ActionType.USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_LIST_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);
      dispatch({
        type: ActionType.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser =
  (id: string | undefined) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`/api/users/${id}`, config);
      dispatch({
        type: ActionType.USER_DELETE_SUCCESS,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (user: any) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_UPDATEAD_REQUEST,
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

      const { data } = await axios.put(`/api/users/${user._id}`, user, config);
      dispatch({
        type: ActionType.USER_UPDATEAD_SUCCESS,
      });
      dispatch({
        type: ActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.USER_UPDATEAD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
