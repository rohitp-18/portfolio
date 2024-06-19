import React from "react";
import { Search } from "@mui/icons-material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./education.scss";

function Education() {
  return (
    <section className="education-component">
      <h2>Education Qualification</h2>
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="2023 - present"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<Search />}
        >
          <h3 className="vertical-timeline-element-title">
            Punyashlok ahilybai holkar, solapur University
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            B.Sc (Computer Science) I
          </h4>
          <p>CGPA :- 9.54</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
          date="2023"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<Search />}
        >
          <h3 className="vertical-timeline-element-title">HSC Class 12th</h3>
          <h4 className="vertical-timeline-element-subtitle">SGRGS, Paranda</h4>
          <p>
            Percentage:- <b>65%</b>
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
}

export default Education;
