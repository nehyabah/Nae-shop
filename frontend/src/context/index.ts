import {ActionType} from '../action-types/actionTypes'

interface RequestAction {
    type: ActionType.PRODUCT_LIST_REQUEST,
    payload?: any
}
interface SuccessAction {
    type: ActionType.PRODUCT_LIST_SUCCESS,
    payload?: any
}
interface FailAction {
    type: ActionType.PRODUCT_LIST_FAIL,
    payload?: any
}

export type Action = RequestAction | SuccessAction | FailAction