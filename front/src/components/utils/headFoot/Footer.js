import React, { useState } from "react";
import "./footer.scss";
import {
  Email,
  GitHub,
  Instagram,
  LinkedIn,
  WhatsApp,
} from "@mui/icons-material";
import { Link as NavLink } from "react-scroll";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="footer">
        <div className="footer-div">
          <div className="icons">
            <Link to={"https://github.com/rohit18-p"}>
              <GitHub style={{ "--colo": "red" }} />
            </Link>
            <Link
              to={
                "mailto:rohitpatil18t@hotmail.com?subject=Hii&body=Hi,%0D%0A%0D%0A"
              }
            >
              <Email style={{ "--colo": "blue" }} />
            </Link>
            <Link to={"https://www.linkedin.com/in/rohit-patil18/"}>
              <LinkedIn style={{ "--colo": "#00a313" }} />
            </Link>
            <Link
              to={
                "https://api.whatsapp.com/send/?phone=919356971002&text=Hii&type=phone_number&app_absent=0"
              }
            >
              <WhatsApp style={{ "--colo": "#80a300" }} />
            </Link>
            <Link to={"https://www.instagram.com/rohit_p.18/"}>
              <Instagram style={{ "--colo": "#fc0a8e" }} />
            </Link>
          </div>
          <div className="navigation">
            <NavLink smooth to="home">
              Home
            </NavLink>
            <NavLink smooth to="about">
              About
            </NavLink>
            <NavLink smooth to="contact">
              Contact
            </NavLink>
            <div onClick={() => setOpen(true)}>Terms and condition</div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          className="footer-modal"
        >
          <DialogContent>
            <DialogTitle>Terms and Condition</DialogTitle>
            <DialogContentText>
              Provided information can be have some changes due to privacy
              resons or some changes due to some personal resons this project
              have not total protection from the website this simple MERN Stack
              project kindly.
              <br />
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setOpen(false)} variant="contained">
                Close
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <div className="copy">No CopRight claim</div>
      </section>
    </>
  );
}

export default Footer;
