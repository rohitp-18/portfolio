import {
  CLEAR_ERRORS,
  CREATE_SKILL_FAIL,
  CREATE_SKILL_REQUEST,
  CREATE_SKILL_RESET,
  CREATE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_RESET,
  DELETE_SKILL_SUCCESS,
  GET_ALL_SKILLS_FAIL,
  GET_ALL_SKILLS_REQUEST,
  GET_ALL_SKILLS_SUCCESS,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_RESET,
  UPDATE_SKILL_SUCCESS,
} from "../constants/skillConstant";

const skillsReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_SKILLS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_ALL_SKILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        skills: action.payload.skills,
      };

    case GET_ALL_SKILLS_FAIL:
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

const AdminskillsReducer = (state, action) => {
  switch (action.type) {
    case DELETE_SKILL_REQUEST:
    case UPDATE_SKILL_REQUEST:
    case CREATE_SKILL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        created: false,
        message: action.payload.message,
      };

    case UPDATE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true,
        message: action.payload.message,
      };

    case DELETE_SKILL_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        message: action.payload.message,
      };

    case CREATE_SKILL_RESET:
      return {
        ...state,
        loading: false,
        created: false,
        message: null,
      };

    case UPDATE_SKILL_RESET:
      return {
        ...state,
        loading: false,
        updated: false,
        message: null,
      };

    case DELETE_SKILL_RESET:
      return {
        ...state,
        loading: false,
        deleted: false,
        message: null,
      };

    case CREATE_SKILL_FAIL:
      return {
        ...state,
        loading: false,
        created: false,
        error: action.payload,
      };
    case DELETE_SKILL_FAIL:
      return {
        ...state,
        loading: false,
        deleted: false,
        error: action.payload,
      };

    case UPDATE_SKILL_FAIL:
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

export { skillsReducer, AdminskillsReducer };
