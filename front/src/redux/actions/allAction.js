import axios from "../axios";
import {
  ALL_ABOUT_FAIL,
  ALL_ABOUT_REQUEST,
  ALL_ABOUT_SUCCESS,
  ALL_GET_FAIL,
  ALL_GET_REQUEST,
  ALL_GET_SUCCESS,
  CREATE_ABOUT_FAIL,
  CREATE_ABOUT_REQUEST,
  CREATE_ABOUT_SUCCESS,
  DELETE_ABOUT_FAIL,
  CREATE_EDUCATION_FAIL,
  CREATE_EDUCATION_REQUEST,
  CREATE_EDUCATION_SUCCESS,
  DELETE_ABOUT_REQUEST,
  DELETE_ABOUT_SUCCESS,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_SUCCESS,
  GET_EDUCATION_FAIL,
  GET_EDUCATION_REQUEST,
  GET_EDUCATION_SUCCESS,
  UPDATE_ABOUT_FAIL,
  UPDATE_ABOUT_REQUEST,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_EDUCATION_FAIL,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_SUCCESS,
  ADMIN_COUNT_FAIL,
  ADMIN_COUNT_REQUEST,
  ADMIN_COUNT_SUCCESS,
} from "../constants/allConstants";

const allAction = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_GET_REQUEST });

    const { data } = await axios.get("/me");

    dispatch({ type: ALL_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_GET_FAIL, payload: error.response.data.message });
  }
};

const getAllAbout = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ABOUT_REQUEST });

    const { data } = await axios.get("/about");

    dispatch({ type: ALL_ABOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_ABOUT_FAIL, payload: error.response.data.message });
  }
};

const deleteAbout = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ABOUT_REQUEST });

    const { data } = await axios.delete(`/about/${id}`);

    dispatch({ type: DELETE_ABOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_ABOUT_FAIL, payload: error.response.data.message });
  }
};

const updateAbout = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ABOUT_REQUEST });

    const { data } = await axios.put(`/about/${id}`, form);

    dispatch({ type: UPDATE_ABOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_ABOUT_FAIL, payload: error.response.data.message });
  }
};

const createAbout = (form) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ABOUT_REQUEST });

    const { data } = await axios.post(`/about/new`, form);

    dispatch({ type: CREATE_ABOUT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ABOUT_FAIL, payload: error.response.data.message });
  }
};

const getAllEducation = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EDUCATION_REQUEST });

    const { data } = await axios.get(`/about/edu/${id}`);

    dispatch({ type: GET_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteEducation = (id, reqId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EDUCATION_REQUEST });

    const { data } = await axios.delete(`/about/edu/${id}?reqId=${reqId}`);

    dispatch({ type: DELETE_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateEducation = (id, reqId, form) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EDUCATION_REQUEST });

    const { data } = await axios.put(`/about/edu/${id}?reqId=${reqId}`, form);

    dispatch({ type: UPDATE_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};

const createEducation = (id, form) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_EDUCATION_REQUEST });

    const { data } = await axios.post(`/about/edu/new/${id}`, form);

    dispatch({ type: CREATE_EDUCATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_EDUCATION_FAIL,
      payload: error.response.data.message,
    });
  }
};
let count = false;
const countView = (id) => async () => {
  try {
    if (count) return;
    count = true;
    const { data } = await axios.get(`/view/${id}`);

    if (data.id) {
      localStorage.setItem("id", data.id);
    }
  } catch (error) {}
};

const createView = () => async () => {
  try {
    if (count) return;
    count = true;
    const { data } = await axios.get(`/view/`);

    if (data.id) {
      localStorage.setItem("id", data.id);
    }
  } catch (error) {}
};

const adminCount = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COUNT_REQUEST });

    const { data } = await axios.get("/admin/view");

    dispatch({ type: ADMIN_COUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_COUNT_FAIL, payload: error.response.data.message });
  }
};

export {
  allAction,
  getAllAbout,
  deleteAbout,
  updateAbout,
  createAbout,

  //education
  getAllEducation,
  deleteEducation,
  updateEducation,
  createEducation,

  //view
  countView,
  createView,
  adminCount,
};
