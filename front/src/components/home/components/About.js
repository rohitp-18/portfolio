import React from "react";
import "./about.scss";
import parser from "html-react-parser";

function About({ about }) {
  return (
    <>
      <section className="about-component">
        <div className="image">
          <img src={about.aboutImage} alt={about.name} />
        </div>
        <div className="about-me">
          <h2 className="about">About Me</h2>
          <p>
            {/* Hii, I am <b>MERN Stack Web developer...</b>
            <br /> I have strong command on React.js and Node.js with
            Express.js, I have completed my B.sc 1st year with 9.54 CGPA and 81
            percentage
            <br /> I have developed some projects as you can see on project
            section page. <br />
            <b>Node.js:-</b> Node.js is the runtime Javascript engine. <br />
            <b>React.js:-</b> React.js is used in website to design client side
            of the website. <br />
            <b>MongoDB:-</b> MongoDB is used to store the data in database.
            <br />
            <br />
            <i>
              Tip:- You can see all the project images on the linkedIn account
            </i>
            <br /> */}
            {parser(about.about)}
          </p>
        </div>
      </section>
    </>
  );
}

export default About;
