import { Button } from "@mui/material";
import React from "react";
import "./home.scss";
import TypeWriter from "typewriter-effect";
import { WhatsApp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo2 from "../../../assets/logoe.jpg";
import pdf from "../../../assets/rohit_patil.pdf";

function Home() {
  return (
    <section className="home-component">
      <div className="me">
        <div className="welcome">WELCOME TO MY WORLD</div>
        <div className="im">
          Hii, I am <span>Rohit Patil</span>
        </div>

        <div className="work">
          <TypeWriter
            options={{
              strings: [
                "a MERN STACK WEB DEVELOPER",
                "a Full Stack Web developer",
                "A React.js Developer",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="description">
          I can create, design and redesign your website as you say,
          <br /> If you are want to hire me then contact me
        </div>
        <div className="buttons">
          <Link to={pdf} target="_blank" download="Rohit Patil-CV.pdf">
            <Button variant="outlined">Download CV</Button>
          </Link>
          <Link
            target="_blank"
            to={
              "https://api.whatsapp.com/send/?phone=919356971002&text=Hii&type=phone_number&app_absent=0"
            }
          >
            <Button variant="contained">
              <WhatsApp /> Hire me!
            </Button>
          </Link>
        </div>
      </div>
      <div className="image">
        <img src={logo2} />
      </div>
    </section>
  );
}

export default Home;
