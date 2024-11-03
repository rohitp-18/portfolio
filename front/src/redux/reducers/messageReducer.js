import {
  ALL_MESSAGE_FAIL,
  ALL_MESSAGE_REQUEST,
  ALL_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_RESET,
  CREATE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_RESET,
  DELETE_MESSAGE_SUCCESS,
} from "../constants/messageConstant";
import { CLEAR_ERRORS } from "../constants/userConstants";

const messageReducer = (state, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        success: false,
        loading: true,
      };

    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };

    case CREATE_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
      };

    case CREATE_MESSAGE_RESET:
      return {
        ...state,
        success: false,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: false,
        loading: false,
      };

    default:
      return { ...state };
  }
};

const adminMessageReducer = (state, action) => {
  switch (action.type) {
    case ALL_MESSAGE_REQUEST:
    case DELETE_MESSAGE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ALL_MESSAGE_SUCCESS:
      return {
        loading: false,
        messages: action.payload.messages,
        ...state,
      };

    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        message: action.payload.message,
      };

    case ALL_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
        ...state,
      };

    case DELETE_MESSAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
        deleted: false,
        ...state,
      };

    case DELETE_MESSAGE_RESET:
      return {
        ...state,
        loading: false,
        deleted: false,
        message: null,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return {
        ...state,
      };
  }
};

export { messageReducer, adminMessageReducer };
