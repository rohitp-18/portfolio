import axios from "../axios";
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

const getUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get("/user/");

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error.response ? error.response.data.message : error,
    });
  }
};

const registerUserAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axios.post("/user/register", form);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

const loginUserAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axios.post("/user/login", form);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
  }
};

const logoutUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    const { data } = await axios.get("/user/logout");

    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ tyee: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

export { getUserAction, registerUserAction, loginUserAction, logoutUserAction };
