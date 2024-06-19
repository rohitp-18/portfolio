import {
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
    default:
      return {
        ...state,
        loading: false,
      };
  }
};

export { userReducer };
