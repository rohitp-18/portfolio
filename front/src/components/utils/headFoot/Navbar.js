import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SwipeableDrawer,
} from "@mui/material";
import "./navbar.scss";
import { Link } from "react-scroll";
import { Close, Menu } from "@mui/icons-material";
import logo from "../../../assets/logoe.jpg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Links({ user }) {
  return (
    <>
      {user ? (
        <>
          <NavLink to={"/admin/users"}>Users</NavLink>
          <NavLink to={"/admin/projects"}>Projects</NavLink>
          <NavLink to={"/admin/skills"}>Skills</NavLink>
        </>
      ) : (
        <>
          <Link spy smooth activeClass="active" to={"home"}>
            Home
          </Link>
          <Link spy smooth activeClass="active" to={"about"}>
            About
          </Link>
          <Link spy smooth activeClass="active" to={"skills"}>
            Skills
          </Link>
          <Link spy smooth activeClass="active" to={"project"}>
            Project
          </Link>
          <Link spy smooth activeClass="active" to={"education"}>
            Education
          </Link>
          <Link spy smooth activeClass="active" to={"contact"}>
            Contact
          </Link>
        </>
      )}
    </>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <div className="navbar-section">
        <div className="navbar-div">
          <div className="logo">
            <Avatar src={logo} />
            <h3>Rohit Patil</h3>
          </div>
          <div className="navigation">
            <Links user={user} />
          </div>
        </div>
        <div className="mobile-div">
          <Menu onClick={() => setOpen(true)} />
          <div className="logo">
            <h3>Rohit Patil</h3>
            <Avatar src="https://res.cloudinary.com/duzcxjof1/image/upload/v1712508241/Avatar/mxpld2r5rhdktonfxnau.jpg" />
          </div>
          <SwipeableDrawer
            onOpen={() => setOpen(true)}
            className="navbar-drawer"
            open={open}
            onClose={() => setOpen(false)}
          >
            <div className="drawer">
              <Close className="close" />
              <div className="logo">
                <Avatar src="https://res.cloudinary.com/duzcxjof1/image/upload/v1712508241/Avatar/mxpld2r5rhdktonfxnau.jpg" />
                <h3>Rohit Patil</h3>
                <b>A MERN Stack Web developer</b>
              </div>
              <div className="mobile-nevigation">
                <Links user={user} />
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
                    resons or some changes due to some personal resons this
                    project have not total protection from the website this
                    simple MERN Stack project kindly.
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
        </div>
      </div>
    </>
  );
}

export default Navbar;
