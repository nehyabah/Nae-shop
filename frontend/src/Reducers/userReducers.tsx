import { ActionType, ActionProps } from "../action-types/actionTypes";

// case is same as if 

export const userLoginReducer = (
  state = {  },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      return { loading: true};
    case ActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionType.USER_LOGIN_FAIL:
          return { loading: false, error: action.payload };
      case ActionType.USER_LOGOUT:
          return {}
    default:
      return state;
  }
};

export const userRegisterReducer = (state ={}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_REGISTER_REQUEST:
      return { loading: true };
    case ActionType.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionType.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}
export const userDetailsReducer = (state ={user: {}}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_DETAILS_REQUEST:
      return {...state, loading: true };
    case ActionType.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case ActionType.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}
export const userUpdateProfileReducer = (state ={}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_UPDATE_REQUEST:
      return {loading: true };
    case ActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case ActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_UPDATE_RESET:
      return { loading: false, error: action.payload };
    
    default:
      return state;
  }
}

