import { Button } from "@mui/material";
import React from "react";
import "./home.scss";
import TypeWriter from "typewriter-effect";
import { WhatsApp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import pdf from "../../../assets/rohit_patil.pdf";
import parser from "html-react-parser";

function Home({ about }) {
  return (
    <section className="home-component">
      <div className="me">
        <div className="welcome">WELCOME TO MY WORLD</div>
        <div className="im">
          Hii, I am <span>{about.name}</span>
        </div>

        <div className="work">
          <TypeWriter
            options={{
              strings: about.work,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="description">{parser(about.description)}</div>
        <div className="buttons">
          <Link to={pdf} target="_blank" download="Rohit Patil-CV.pdf">
            <Button variant="outlined">Download CV</Button>
          </Link>
          <Link target="_blank" to={about.hireLink}>
            <Button variant="contained">
              <WhatsApp /> Hire me!
            </Button>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={about.avatar} alt={about.name} />
      </div>
    </section>
  );
}

export default Home;
