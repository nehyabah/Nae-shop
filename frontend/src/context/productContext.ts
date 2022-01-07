import axios from 'axios'
import { Dispatch } from 'redux'

import { ActionType, ActionProps} from '../action-types/actionTypes'
// import {ActionType} from '../action-types/index'



export const listProducts = () => async (dispatch: Dispatch) => {
    try {
        dispatch({ type: ActionType.PRODUCT_LIST_REQUEST })
        
        const { data } = await axios.get('/api/products')
        
        dispatch({
            type: ActionType.PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ActionType.PRODUCT_LIST_FAIL,
             payload: error
        //   error.response && error.response.data.message
        //     ? error.response.data.message
        //     : error.message,
        })
    }
}

export const listProductDetails = (id: string | undefined) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionType.SINGLE_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/products${id}`);

    dispatch({
      type: ActionType.SINGLE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.SINGLE_PRODUCT_FAIL,
      payload: error,
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message,
    });
  }
};