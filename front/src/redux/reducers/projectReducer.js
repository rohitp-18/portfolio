import {
  CLEAR_ERRORS,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_RESET,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_RESET,
  DELETE_PROJECT_SUCCESS,
  GET_ALL_PROJECTS_FAIL,
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_PROJECT_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_RESET,
  UPDATE_PROJECT_SUCCESS,
} from "../constants/projectConstants";

const projectsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        projects: action.payload.projects,
      };

    case GET_ALL_PROJECTS_FAIL:
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
      return { ...state };
  }
};

const AdminProjectsReducer = (state, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
    case UPDATE_PROJECT_REQUEST:
    case GET_PROJECT_REQUEST:
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true,
        message: action.payload.message,
      };

    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        project: action.payload.project,
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        message: action.payload.message,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        message: action.payload.message,
      };

    case CREATE_PROJECT_RESET:
      return {
        ...state,
        loading: false,
        created: false,
        message: null,
      };

    case UPDATE_PROJECT_RESET:
      return {
        ...state,
        loading: false,
        updated: false,
        message: null,
      };

    case DELETE_PROJECT_RESET:
      return {
        ...state,
        loading: false,
        deleted: false,
        message: null,
      };

    case CREATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        created: false,
        error: action.payload,
      };

    case GET_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        deleted: false,
        error: action.payload,
      };

    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        loading: false,
        updated: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: true,
      };
  }
};

export { projectsReducer, AdminProjectsReducer };
