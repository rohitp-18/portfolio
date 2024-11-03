import React from "react";
import { Search } from "@mui/icons-material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./education.scss";
import parser from "html-react-parser";

function Education({ about }) {
  return (
    <section className="education-component">
      <h2>Education Qualification</h2>
      <VerticalTimeline>
        {about.education.map((e) => (
          <VerticalTimelineElement
            key={e._id}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date={e.year}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={e.icon ? parser(e.icon) : <Search />}
          >
            <h3 className="vertical-timeline-element-title">{e.college}</h3>
            <h4 className="vertical-timeline-element-subtitle">{e.name}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <p>
                Percentage :- <b>{e.percentage}%</b>
              </p>
              {e.cgpa && (
                <p>
                  CGPA :- <b>{e.cgpa}</b>
                </p>
              )}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}

export default Education;
