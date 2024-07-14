import {
  ALL_MESSAGE_FAIL,
  ALL_MESSAGE_REQUEST,
  ALL_MESSAGE_SUCCESS,
  CLEAR_ERRORS,
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
} from "../constants/messageConstant";
import axios from "../axios";

const createMessage = (info) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_MESSAGE_REQUEST });

    const { data } = await axios.post("/message/new", info);

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getAllMessages = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_MESSAGE_REQUEST });

    const { data } = await axios.get("/message/");

    dispatch({ type: ALL_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_MESSAGE_FAIL, payload: error.response.data.message });
  }
};

const deleteMessage = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MESSAGE_REQUEST });

    const { data } = await axios.delete(`/message/${id}`);

    dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_MESSAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export { createMessage, getAllMessages, deleteMessage, clearErrors };
