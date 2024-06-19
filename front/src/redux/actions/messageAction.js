import {
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
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

export { createMessage };
