import axios from "../axios";
import {
  CREATE_SKILL_FAIL,
  CREATE_SKILL_REQUEST,
  CREATE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  GET_ALL_SKILLS_FAIL,
  GET_ALL_SKILLS_REQUEST,
  GET_ALL_SKILLS_SUCCESS,
  // GET_SKILL_FAIL,
  // GET_SKILL_REQUEST,
  // GET_SKILL_SUCCESS,
  UPDATE_SKILL_FAIL,
  UPDATE_SKILL_REQUEST,
  UPDATE_SKILL_SUCCESS,
} from "../constants/skillConstant";

const getAllSkills = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SKILLS_REQUEST });

    const { data } = await axios.get("/skills/");

    dispatch({ type: GET_ALL_SKILLS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_SKILLS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// const getSkill = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: GET_SKILL_REQUEST });

//     const { data } = await axios.get(`/skills/${id}`);

//     dispatch({ type: GET_SKILL_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: GET_SKILL_FAIL, payload: error.response.data.message });
//   }
// };

const createSkill = (skill) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SKILL_REQUEST });

    const { data } = await axios.post("/skills/new", skill);

    dispatch({ type: CREATE_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SKILL_FAIL, payload: error.response.data.message });
  }
};

const updateSkill = (id, skill) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SKILL_REQUEST });

    const { data } = await axios.put(`/skills/${id}`, skill);

    dispatch({
      type: UPDATE_SKILL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_SKILL_FAIL, payload: error.response.data.message });
  }
};

const deleteSkill = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SKILL_REQUEST });

    const { data } = await axios.delete(`/skills/${id}`);

    dispatch({ type: DELETE_SKILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_SKILL_FAIL, payload: error.response.data.message });
  }
};

export { getAllSkills, createSkill, updateSkill, deleteSkill };
