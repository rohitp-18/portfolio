import axios from "../axios";
import {
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_PROJECT_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

const getAllProjects = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PROJECTS_REQUEST });

    const { data } = await axios.get("/project/");

    dispatch({ type: GET_ALL_PROJECTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROJECTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

const getProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROJECT_REQUEST });

    const { data } = await axios.get(`/projects/${id}`);

    dispatch({ type: GET_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROJECT_FAIL, payload: error.response.data.message });
  }
};

const createProject = (Project) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROJECT_REQUEST });

    const { data } = await axios.post("/project/new", Project, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch({ type: CREATE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const updateProject = (id, Project) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROJECT_REQUEST });

    const { data } = await axios.put(`/project/${id}`, Project, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    dispatch({
      type: UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

const deleteProject = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROJECT_REQUEST });

    const { data } = await axios.delete(`/project/${id}`);

    dispatch({ type: DELETE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_PROJECT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export {
  getAllProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
};
