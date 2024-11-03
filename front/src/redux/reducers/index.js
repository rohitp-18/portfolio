import { combineReducers } from "redux";
import { adminUserReducer, userReducer } from "./userReducers";
import { adminMessageReducer, messageReducer } from "./messageReducer";
import { AdminskillsReducer, skillsReducer } from "./skillReducer";
import {
  adminAboutReducer,
  adminEducationReducer,
  adminViewReducer,
  allReducer,
} from "./allReducer";
import { AdminProjectsReducer, projectsReducer } from "./projectReducer";

const reducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  skill: skillsReducer,
  all: allReducer,
  project: projectsReducer,
  adminProject: AdminProjectsReducer,
  adminUser: adminUserReducer,
  adminSkills: AdminskillsReducer,
  adminMessage: adminMessageReducer,
  adminAbout: adminAboutReducer,
  education: adminEducationReducer,
  adminView: adminViewReducer,
});

export default reducer;
