import { combineReducers } from "redux";
import { adminUserReducer, userReducer } from "./userReducers";
import { messageReducer } from "./messageReducer";
import { AdminskillsReducer, skillsReducer } from "./skillReducer";
import { allReducer } from "./allReducer";
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
});

export default reducer;
