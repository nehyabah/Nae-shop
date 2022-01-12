import { Dispatch } from "redux";
import axios from "axios";
import { RootState } from "../reduxStore";
import { ActionType, ActionProps } from "../action-types/actionTypes";

export const userLogin =
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
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {}
  };
