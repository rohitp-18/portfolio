import {
  ALL_GET_FAIL,
  ALL_GET_REQUEST,
  ALL_GET_SUCCESS,
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
      return { ...state, loading: true };
  }
};

export { allReducer };
