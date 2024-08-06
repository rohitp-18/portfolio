import React, { useEffect, useState } from "react";
import Navbar from "../utils/headFoot/Navbar";
import Footer from "../utils/headFoot/Footer";
import "./main.scss";
import Home from "./components/Home";
import About from "./components/About";
import Education from "./components/Education";
import Project from "./components/Project";
import Skills from "./components/Skills";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import Contact from "./components/Contact";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";

function Main() {
  const [open, setOpen] = useState(false);
  const [errorr, setError] = useState(false);

  const { loading, about, error, skills, project } = useSelector(
    (state) => state.all
  );

  useEffect(() => {
    if (error) {
      setError(true);
    }
  }, [error]);

  return (
    <>
      {!loading && !error && (
        <main className="main-content">
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>IMPORTANT</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Website Development is an progress, In some days it will be a
                fully dynamic website
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} variant="contained">
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Navbar />
          <div className="main-section">
            <div id="home" className="main-div">
              <Fade duration={1500}>
                <Home about={about} />
              </Fade>
            </div>
            <div id="about" className="main-div">
              <Zoom>
                <About about={about} />
              </Zoom>
            </div>
            <div id="skills" className="main-div">
              <Slide direction="left">
                <Skills skills={skills} />
              </Slide>
            </div>
            <div id="project" className="main-div">
              <Slide direction="right">
                <Project project={project} />
              </Slide>
            </div>
            <div id="education" className="main-div">
              <Slide direction="left">
                <Education />
              </Slide>
            </div>
            <div id="contact" className="main-div">
              <Slide direction="right">
                <Contact />
              </Slide>
            </div>
          </div>
          <Footer />
        </main>
      )}
      <Dialog open={errorr} onClose={() => setError(false)}>
        <DialogTitle>IMPORTANT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Website is temporary down, please visit some time later you can
            contact on email
            <br />
            I will respond on as soon as possible.
            <br />
            <br />
            Thanks for visit me ...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(false)} variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Main;
