import { ActionType, ActionProps } from "../action-types/actionTypes"

import { Action } from "../context" 

export const productListReducer = (state = { products: [] }, action: Action) => {
    switch (action.type) {
        case ActionType.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case ActionType.PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case ActionType.PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state

    }
}