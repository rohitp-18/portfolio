import {
  Box,
  Button,
  CircularProgress,
  Fab,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utils/alertProvider";
import { useDispatch, useSelector } from "react-redux";
import { updateSkill } from "../../redux/actions/SkillAction";
import parse from "html-react-parser";
import {
  CLEAR_ERRORS,
  UPDATE_SKILL_RESET,
} from "../../redux/constants/skillConstant";

function UpdateSkill({ select, setOpen }) {
  const [name, setName] = useState();
  const [percentage, setPercentage] = useState();
  const [icon, setIcon] = useState();

  const { sendAlert } = useContext(AlertContext);
  const { error, message, updated } = useSelector((state) => state.adminSkills);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !percentage || !icon) {
      return sendAlert("Please fill all required fields", "info");
    }
    dispatch(updateSkill(select.id, { name, percentage, icon }));
  };

  useEffect(() => {
    setName(select.name);
    setPercentage(select.percentage);
    setIcon(select.icon);
  }, [select]);

  useEffect(() => {
    if (updated) {
      sendAlert(message, "success");
      dispatch({ type: UPDATE_SKILL_RESET });
      setOpen(false);
      return;
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [error, updated, message, dispatch]);
  return (
    <>
      {select && (
        <Paper sx={{ maxWidth: "500px", width: "97%" }} elevation={8}>
          <form onSubmit={(e) => submitHandler(e)} className="update-user">
            <h2>Update User</h2>
            <Box>
              <label>Name</label>
              <TextField
                size="small"
                autoFocus
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box className="input-box">
              <label>Percentage</label>
              <TextField
                value={percentage}
                type="number"
                onChange={(e) => setPercentage(e.target.value)}
                size="small"
                fullWidth
              />
            </Box>
            <Box className="input-box">
              <label>Icon</label>
              <TextField
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                size="small"
                fullWidth
                multiline
                rows={6}
              />
            </Box>
            <Box sx={{ display: "grid", placeContent: "center", mt: "30px" }}>
              <Box
                className="output-skill"
                sx={{ position: "relative", margin: "0 30px" }}
              >
                <Fab>{parse(icon ? icon : "")}</Fab>
                <CircularProgress
                  variant="determinate"
                  size={80}
                  sx={{
                    color: "#oof",
                    position: "absolute",
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                  value={percentage}
                />
                <h4 style={{ paddingTop: "20px" }}>{name}</h4>
              </Box>
            </Box>
            <Box className="box-button">
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </>
  );
}

export default UpdateSkill;
