import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer as SwipeableDrawer,
  IconButton,
  Button,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, Link as NavLink } from "react-router-dom";
import { Link } from "react-scroll";

function Drawer({ open, setOpen }) {
  const [terms, setTerms] = useState(false);
  const location = useLocation();

  const Home = () => (
    <>
      <Link spy smooth activeClass="active" to={"/#home"}>
        Home
      </Link>
      <Link spy smooth activeClass="active" to={"/#about"}>
        About
      </Link>
      <Link spy smooth activeClass="active" to={"/#skills"}>
        Skills
      </Link>
      <Link spy smooth activeClass="active" to={"/#project"}>
        Project
      </Link>
      <Link spy smooth activeClass="active" to={"/#education"}>
        Education
      </Link>
      <Link spy smooth activeClass="active" to={"/#contact"}>
        Contact
      </Link>
    </>
  );

  const Other = () => (
    <>
      <NavLink to={"/#home"}>Home</NavLink>
      <NavLink to={"/#about"}>About</NavLink>
      <NavLink to={"/#skills"}>Skills</NavLink>
      <NavLink to={"/#project"}>Project</NavLink>
      <NavLink to={"/#education"}>Education</NavLink>
      <NavLink to={"/#contact"}>Contact</NavLink>
    </>
  );

  useEffect(() => {}, [location]);
  return (
    <>
      <SwipeableDrawer
        className="navbar-drawer"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="drawer">
          <IconButton className="close" onClick={() => setOpen(false)}>
            <Close />
          </IconButton>

          <div className="logo">
            <Avatar src="https://res.cloudinary.com/duzcxjof1/image/upload/v1712508241/Avatar/mxpld2r5rhdktonfxnau.jpg" />
            <h3>Rohit Patil</h3>
            <b>A MERN Stack Web developer</b>
          </div>
          <div className="mobile-nevigation">
            {location.pathname === "/" ? <Home /> : <Other />}
          </div>

          <div className="div" onClick={() => setTerms(true)}>
            Terms and condition
          </div>
          <Dialog
            open={terms}
            onClose={() => setTerms(false)}
            className="footer-modal"
          >
            <DialogContent>
              <DialogTitle>Terms and Condition</DialogTitle>
              <DialogContentText>
                Provided information can be have some changes due to privacy
                resons or some changes due to some personal resons this project
                have not total protection from the website this simple MERN
                Stack project kindly.
                <br />
              </DialogContentText>
              <DialogActions>
                <Button onClick={() => setTerms(false)} variant="contained">
                  Close
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>
      </SwipeableDrawer>
    </>
  );
}

export default Drawer;
