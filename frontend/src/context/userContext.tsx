import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../reduxStore";
import { ActionType, ActionProps } from "../action-types/actionTypes";

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
  dispatch({ type: ActionType.USER_LOGOUT });
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
  (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: ActionType.USER_DETAILS_REQUEST,
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

      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch({
        type: ActionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
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

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
