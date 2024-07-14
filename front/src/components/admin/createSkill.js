import { Box, Button, CircularProgress, Fab, TextField } from "@mui/material";
import React, { useState } from "react";
import parse from "html-react-parser";
import "./dashboard.scss";

function CreateSkill() {
  const [name, setName] = useState();
  const [percentage, setPercentage] = useState();
  const [svg, setSvg] = useState();
  const [open, setOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  return (
    <>
      <main className="main-create-project">
        <section className="section-project skills">
          <form onSubmit={(e) => submitHandler(e)}>
            <h1>Create Skill</h1>
            <Box className="input-box">
              <label>Skill Name</label>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                fullWidth
                autoFocus
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
                autoFocus
              />
            </Box>
            <Box className="input-box">
              <label>Icon</label>
              <TextField
                value={svg}
                onChange={(e) => setSvg(e.target.value)}
                size="small"
                fullWidth
                multiline
                rows={6}
                autoFocus
              />
            </Box>
            <div className="button">
              <Button variant="contained" type="submit">
                Save
              </Button>
            </div>
            <Box sx={{ position: "relative", margin: "0 30px" }}>
              <Fab>{svg && parse(svg)}</Fab>
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
              <h4>{name}</h4>
            </Box>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateSkill;
