import { Box, Button, Fab, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utils/alertProvider";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import {
  CLEAR_ERRORS,
  UPDATE_EDUCATION_RESET,
} from "../../redux/constants/allConstants";
import {
  getAllEducation,
  updateEducation,
} from "../../redux/actions/allAction";

function UpdateEducation({ project, id, setOpen }) {
  const [name, setName] = useState(project.name);
  const [college, setCollege] = useState(project.college);
  const [percentage, setPercentage] = useState(project.percentage);
  const [cgpa, setCgpa] = useState(project.cgpa);
  const [icon, setIcon] = useState(project.icon);
  const [year, setYear] = useState(project.year);

  const { sendAlert } = useContext(AlertContext);
  const { error, message, updated } = useSelector((state) => state.education);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !percentage || !college || !year) {
      return sendAlert("Please fill all required fields", "info");
    }
    dispatch(
      updateEducation(id, project._id, {
        name,
        percentage,
        icon,
        year,
        college,
        cgpa,
      })
    );
  };

  useEffect(() => {
    setName(project.name);
    setIcon(project.icon);
  }, [project]);

  useEffect(() => {
    if (updated) {
      sendAlert(message, "success");
      dispatch({ type: UPDATE_EDUCATION_RESET });
      setOpen(false);
      dispatch(getAllEducation(id));
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
      {project && (
        <Paper
          className="paper-update-project"
          sx={{ maxWidth: "500px", width: "97%" }}
          elevation={8}
        >
          <form onSubmit={(e) => submitHandler(e)} className="update-user">
            <h2>Update Education</h2>
            <Box className="input-box">
              <label>College/University Name</label>
              <TextField
                size="small"
                autoFocus
                value={college}
                fullWidth
                onChange={(e) => setCollege(e.target.value)}
              />
            </Box>
            <Box className="input-box">
              <label>Course Name</label>
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
              <label>CGPA</label>
              <TextField
                value={cgpa}
                type="number"
                onChange={(e) => setCgpa(e.target.value)}
                size="small"
                fullWidth
              />
            </Box>
            <Box className="input-box">
              <label>Years</label>
              <TextField
                value={year}
                type="text"
                onChange={(e) => setYear(e.target.value)}
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
            <Box sx={{ display: "flex", placeContent: "center", mt: "30px" }}>
              <Box
                className="output-skill"
                sx={{
                  margin: "0 30px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Fab>{parse(icon ? icon : "")}</Fab>
                <h4 style={{ paddingTop: "20px" }}>{name}</h4>
              </Box>
            </Box>

            <Box className="button">
              <Button
                sx={{ float: "left !important" }}
                onClick={() => setOpen(false)}
                color="error"
              >
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

export default UpdateEducation;
