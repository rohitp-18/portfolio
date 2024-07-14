import axios from "../axios";
import {
  ALL_GET_FAIL,
  ALL_GET_REQUEST,
  ALL_GET_SUCCESS,
} from "../constants/allConstants";

const allAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_GET_REQUEST });

    const { data } = await axios.get("/me");

    dispatch({ type: ALL_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_GET_FAIL, error: error.response.data.message });
  }
};

export default allAction;
