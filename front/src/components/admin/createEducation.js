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
  createEducation,
  getAllEducation,
} from "../../redux/actions/allAction";
import { useNavigate } from "react-router-dom";

function CreateEducation() {
  const [name, setName] = useState();
  const [college, setCollege] = useState();
  const [percentage, setPercentage] = useState();
  const [cgpa, setCgpa] = useState();
  const [icon, setIcon] = useState();
  const [year, setYear] = useState();
  const [id, setId] = useState();

  const { sendAlert } = useContext(AlertContext);
  const { error, message, created } = useSelector((state) => state.education);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !percentage || !college || !year) {
      return sendAlert("Please fill all required fields", "info");
    }
    dispatch(
      createEducation(id, {
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
    if (created) {
      sendAlert(message, "success");
      dispatch({ type: UPDATE_EDUCATION_RESET });
      dispatch(getAllEducation(id));
      navigate("/admin/education");
      return;
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [error, created, message, dispatch]);
  return (
    <>
      <main className="main-create-project">
        <section className="section-project">
          <form onSubmit={(e) => submitHandler(e)} className="update-user">
            <h2>Create Education</h2>
            <Box className="input-box">
              <label>About Id</label>
              <TextField
                size="small"
                autoFocus
                value={id}
                fullWidth
                required
                onChange={(e) => setId(e.target.value)}
              />
            </Box>
            <Box className="input-box">
              <label>College/University Name</label>
              <TextField
                size="small"
                autoFocus
                value={college}
                required
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
                required
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
                required
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
                onClick={() => navigate("/admin/education")}
                color="error"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create
              </Button>
            </Box>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateEducation;
