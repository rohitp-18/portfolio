import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_RESET,
  CREATE_MESSAGE_SUCCESS,
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

export { messageReducer };
