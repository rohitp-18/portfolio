import {
  ADMIN_COUNT_FAIL,
  ADMIN_COUNT_REQUEST,
  ADMIN_COUNT_SUCCESS,
  ALL_ABOUT_FAIL,
  ALL_ABOUT_REQUEST,
  ALL_ABOUT_SUCCESS,
  ALL_GET_FAIL,
  ALL_GET_REQUEST,
  ALL_GET_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ABOUT_FAIL,
  CREATE_ABOUT_REQUEST,
  CREATE_ABOUT_RESET,
  CREATE_ABOUT_SUCCESS,
  CREATE_EDUCATION_FAIL,
  CREATE_EDUCATION_REQUEST,
  CREATE_EDUCATION_RESET,
  CREATE_EDUCATION_SUCCESS,
  DELETE_ABOUT_FAIL,
  DELETE_ABOUT_REQUEST,
  DELETE_ABOUT_RESET,
  DELETE_ABOUT_SUCCESS,
  DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_REQUEST,
  DELETE_EDUCATION_RESET,
  DELETE_EDUCATION_SUCCESS,
  GET_EDUCATION_FAIL,
  GET_EDUCATION_REQUEST,
  GET_EDUCATION_SUCCESS,
  UPDATE_ABOUT_FAIL,
  UPDATE_ABOUT_REQUEST,
  UPDATE_ABOUT_RESET,
  UPDATE_ABOUT_SUCCESS,
  UPDATE_EDUCATION_FAIL,
  UPDATE_EDUCATION_REQUEST,
  UPDATE_EDUCATION_RESET,
  UPDATE_EDUCATION_SUCCESS,
} from "../constants/allConstants";

const allReducer = (state, action) => {
  switch (action.type) {
    case ALL_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        about: action.payload.about,
        skills: action.payload.skills,
        projects: action.payload.project,
      };

    case ALL_GET_FAIL:
      return { ...state, loading: false, error: true };

    default:
      return { ...state, loading: true, about: null };
  }
};

const adminAboutReducer = (state, action) => {
  switch (action.type) {
    case ALL_ABOUT_REQUEST:
    case CREATE_ABOUT_REQUEST:
    case UPDATE_ABOUT_REQUEST:
    case DELETE_ABOUT_REQUEST:
      return { ...state, loading: true };

    case ALL_ABOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        abouts: action.payload.abouts,
      };

    case CREATE_ABOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true,
        success: true,
        message: "About created successfully",
      };

    case UPDATE_ABOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        success: true,
        message: "About updated successfully",
      };

    case DELETE_ABOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        success: true,
        message: "About updated successfully",
      };

    case ALL_ABOUT_FAIL:
    case UPDATE_ABOUT_FAIL:
    case DELETE_ABOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_ABOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        created: false,
      };

    case CREATE_ABOUT_RESET:
    case UPDATE_ABOUT_RESET:
    case DELETE_ABOUT_RESET:
      return {
        ...state,
        created: false,
        message: null,
        updated: false,
        error: null,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return { ...state };
  }
};

const adminEducationReducer = (state, action) => {
  switch (action.type) {
    case GET_EDUCATION_REQUEST:
    case CREATE_EDUCATION_REQUEST:
    case DELETE_EDUCATION_REQUEST:
    case UPDATE_EDUCATION_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        educations: action.payload.education,
      };

    case CREATE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        created: true,
        message: "Education is created successfully",
      };

    case UPDATE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        message: "Education is updated successfully",
      };

    case DELETE_EDUCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        message: "Education is deleted successfully",
      };

    case GET_EDUCATION_FAIL:
    case DELETE_EDUCATION_FAIL:
    case UPDATE_EDUCATION_FAIL:
    case CREATE_EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
        deleted: false,
        updated: false,
        created: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case CREATE_EDUCATION_RESET:
    case UPDATE_EDUCATION_RESET:
    case DELETE_EDUCATION_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        created: false,
        updated: false,
        deleted: false,
        message: null,
      };

    default:
      return { ...state };
  }
};

const adminViewReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        views: action.payload.viewAdmin,
      };

    case ADMIN_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export {
  allReducer,
  adminAboutReducer,
  adminEducationReducer,
  adminViewReducer,
};
