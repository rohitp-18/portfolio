import {
  Book,
  DoubleArrow,
  EmailOutlined,
  Group,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  Person,
  VerifiedUser,
  Work,
} from "@mui/icons-material";
import { Avatar, Drawer, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Slider() {
  const [open, setOpen] = useState(true);
  const [className, setClassName] = useState("slider");

  const { user } = useSelector((state) => state.user);

  const changeClass = () => {
    if (className === "slider") {
      setClassName("mobile");
      return;
    }
    setClassName("slider");
  };

  return (
    <section className="section-slider">
      <div className={className}>
        <IconButton onClick={changeClass} className="expand">
          {className === "slider" ? (
            <KeyboardDoubleArrowLeft />
          ) : (
            <KeyboardDoubleArrowRight />
          )}
        </IconButton>
        <div className="me">
          <Avatar />
          <h3>{user.name}</h3>
          <p>
            <Link to={`mailto:${user.email}?subject=Hii&body=Hi,%0D%0A%0D%0A`}>
              <EmailOutlined />
              <Typography component={"h6"} variant="body1">
                {user.email}
              </Typography>
            </Link>
          </p>
        </div>
        <div className="navigation">
          <Link to={"/about/me"}>About</Link>
          <Link to={"/admin/users"}>Users</Link>
          <Link to={"/admin/skills"}>Skills</Link>
          <Link to={"/admin/projects"}>Projects</Link>
          <Link to={"/admin/education"}>Education</Link>
        </div>
        <div className="mobile-navigation">
          <Link to={"/admin/profile"}>
            <Person />
          </Link>
          <Link to={"/admin/users"}>
            <Group />
          </Link>
          <Link to={"/admin/skills"}>
            <Book />
          </Link>
          <Link to={"/admin/projects"}>
            <Work />
          </Link>
          <Link to={"/admin/education"}>
            <Book />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Slider;
