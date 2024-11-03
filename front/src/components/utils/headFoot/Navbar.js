import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  SwipeableDrawer,
  useTheme,
} from "@mui/material";
import "./navbar.scss";
import { Link } from "react-scroll";
import { Close, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ColorModeContext } from "../themes/context";

function Links({ user, callBack }) {
  return (
    <>
      {user ? (
        <>
          <NavLink to={"/admin/users"}>Users</NavLink>
          <NavLink to={"/admin/projects"}>Projects</NavLink>
          <NavLink to={"/admin/skills"}>Skills</NavLink>
          <NavLink to={"/admin/education"}>Education</NavLink>
          <NavLink to={"/admin/message"}>Message</NavLink>
          <NavLink to={"/admin/about"}>About</NavLink>
          <NavLink to={"/admin/view"}>View</NavLink>
        </>
      ) : (
        <>
          <Link spy smooth onClick={callBack} activeClass="active" to={"home"}>
            Home
          </Link>
          <Link spy smooth onClick={callBack} activeClass="active" to={"about"}>
            About
          </Link>
          <Link
            spy
            smooth
            onClick={callBack}
            activeClass="active"
            to={"skills"}
          >
            Skills
          </Link>
          <Link
            spy
            smooth
            onClick={callBack}
            activeClass="active"
            to={"project"}
          >
            Project
          </Link>
          <Link
            spy
            smooth
            onClick={callBack}
            activeClass="active"
            to={"education"}
          >
            Education
          </Link>
          <Link
            spy
            smooth
            onClick={callBack}
            activeClass="active"
            to={"contact"}
          >
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
  const { about } = useSelector((state) => state.all);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const changeTheme = (them) => {
    if (them === "light") {
      colorMode.toggleCMode();
      document.body.className = "dark";
      localStorage.setItem("mode", "dark");
    } else {
      colorMode.toggleCMode();
      document.body.className = "light";
      localStorage.setItem("mode", "light");
    }
  };

  return (
    <>
      {about && (
        <nav className="navbar-section">
          <div className="navbar-div">
            <div className="logo">
              <Avatar src={about.avatar} alt={about.name} />
              <h3>{about.name}</h3>
            </div>
            <div className="navigation">
              <Links user={user} />
              {/* <IconButton
              sx={{ ml: "20px" }}
              onClick={() => changeTheme(theme.palette.mode)}
            >
              {theme.palette.mode === "light" ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton> */}
            </div>
          </div>
          <div className="mobile-div">
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Menu onClick={() => setOpen(true)} />
              {/* <IconButton
              sx={{ ml: "5px" }}
              onClick={() => changeTheme(theme.palette.mode)}
            >
              {theme.palette.mode === "light" ? (
                <Brightness4 />
              ) : (
                <Brightness7 />
              )}
            </IconButton> */}
            </Box>
            <div className="logo">
              <h3>{about.name}</h3>
              <Avatar src={about.avatar} alt={about.name} />
            </div>
            <SwipeableDrawer
              onOpen={() => setOpen(true)}
              className="navbar-drawer"
              open={open}
              onClose={() => setOpen(false)}
            >
              <div className="drawer">
                <IconButton className="close" onClick={() => setOpen(false)}>
                  <Close />
                </IconButton>
                <div className="logo">
                  <Avatar src={about.avatar} alt={about.name} />
                  <h3>{about.name}</h3>
                  <b>{about.work[0]}</b>
                </div>
                <div className="mobile-nevigation">
                  <Links callBack={() => setOpen(false)} user={user} />
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
                      Provided information can be have some changes due to
                      privacy resons or some changes due to some personal resons
                      this project have not total protection from the website
                      this simple MERN Stack project kindly.
                      <br />
                    </DialogContentText>
                    <DialogActions>
                      <Button
                        onClick={() => setTerms(false)}
                        variant="contained"
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </div>
            </SwipeableDrawer>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
