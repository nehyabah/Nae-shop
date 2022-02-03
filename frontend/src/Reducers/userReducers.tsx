import { ActionType, ActionProps } from "../action-types/actionTypes";

// case is same as if

interface userListAdminProps {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
  users?: {
    _id?: string;
    name?: string;
    email?: string;
    isAdmin?: string;
    token?: string;
  }[];
  user?: {
    _id?: string;
    name?: string;
    email?: string;
    isAdmin?: string;
    token?: string;
  };
}


export const userLoginReducer = (state = {}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_LOGIN_REQUEST:
      return { loading: true };
    case ActionType.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionType.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: ActionProps) => {
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
};
export const userDetailsReducer = (
  state = { user: {} },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ActionType.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case ActionType.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_DETAILS_RESET:
      return { user: {} };

    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_UPDATE_REQUEST:
      return { loading: true };
    case ActionType.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case ActionType.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_UPDATE_RESET:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_LIST_REQUEST:
      return { loading: true };
    case ActionType.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ActionType.USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action: ActionProps) => {
  switch (action.type) {
    case ActionType.USER_DELETE_REQUEST:
      return { loading: true };
    case ActionType.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ActionType.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateReducer = (
  state = { user: {} },
  action: ActionProps
) => {
  switch (action.type) {
    case ActionType.USER_UPDATEAD_REQUEST:
      return { loading: true };
    case ActionType.USER_UPDATEAD_SUCCESS:
      return { loading: false, success: true };
    case ActionType.USER_UPDATEAD_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.USER_UPDATEAD_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

