import {
  ADMIN_DELETE_USER_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_RESET,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERRORS,
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../constants/userConstants";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        message: action.payload.message,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success,
      };

    case GET_USER_FAIL:
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
        loading: true,
      };
  }
};

const adminUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
    case ADMIN_DELETE_USER_REQUEST:
    case ADMIN_UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        loading: false,
      };

    case ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        message: action.payload.message,
      };

    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        updated: true,
        message: action.payload.message,
      };

    case ADMIN_DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        message: null,
        deleted: false,
      };

    case ADMIN_UPDATE_USER_RESET:
      return {
        ...state,
        loading: false,
        message: null,
        updated: false,
      };

    case ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deleted: false,
      };

    case ADMIN_UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        deleted: false,
        updated: false,
        success: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export { userReducer, adminUserReducer };
