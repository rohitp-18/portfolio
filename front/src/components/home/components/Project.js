import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../../logo.svg";
import "./project.scss";
import { Link } from "react-router-dom";
import imagePort from "../../../assets/portfolio.png";
import commerce from "../../../assets/E-commerce.png";
import { GitHub, LinkedIn } from "@mui/icons-material";

function Project() {
  return (
    <section className="project-component">
      <h2>Project</h2>
      <div className="project-cards">
        <Card className="card">
          <CardMedia
            component={"img"}
            height={200}
            image={commerce}
            alt="red"
          ></CardMedia>
          <CardContent>
            <Typography variant="h6" component={"h3"}>
              E-Commerce MERN Stack Website
            </Typography>
            <Typography variant="body2" component={"div"}>
              This is E-Commerce Website with fully reasponsive with redux and
              react-router-dom functionallity. here it has Admin dashboard. used
              techanologies is Meterial-UI and SCSS.
              {/* fuga quidem. Minima rerum deleniti earum mollitia quae eum
              repellat modi. Commodi voluptates doloribus quisquam, ullam hic
              sit aliquam officiis ea inventore vel voluptatem sed quas
              asperiores praesentium distinctio, quam pariatur consequatur
              possimus quos similique. Similique rerum ad possimus totam natus
              sapiente tenetur laboriosam praesentium impedit sint, ducimus
              tempora qui maiores non fuga blanditiis amet in rem labore, libero
              temporibus vero doloremque consequatur veritatis? Repudiandae ex a
              eos eaque cumque mollitia? Officiis ut, nulla non necessitatibus
              omnis distinctio earum ullam sequi, numquam nesciunt quis magnam
              ipsa tenetur enim. Eum nesciunt reprehenderit et, dolorem dolores
              expedita vel? A vel totam sint voluptatibus veniam hic debitis
              praesentium dicta, nemo illo dolorem cumque, exercitationem
              excepturi quis animi et soluta repellendus, est repudiandae facere
              optio fugit sit voluptate. Non commodi dolorum quaerat. Error
              suscipit quae optio harum, hic mollitia officiis quidem rem
              ratione, placeat natus. */}
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              target="_blank"
              to={"https://github.com/rohit18-p/E-commerce-Mern-Stack"}
            >
              <Button variant="outlined" size={"small"}>
                <GitHub /> GitHub
              </Button>
            </Link>
            <Link
              target="_blank"
              to={
                "https://www.linkedin.com/posts/rohit-patil18_i-have-created-an-e-commerce-mern-stack-project-activity-7203329833181818881-DnNP?utm_source=share&utm_medium=member_desktop"
              }
            >
              <Button variant="contained" size={"small"}>
                <LinkedIn /> linkedIn
              </Button>
            </Link>
          </CardActions>
        </Card>
        <Card className="card">
          <CardMedia
            component={"img"}
            height={200}
            image={imagePort}
            alt="red"
          ></CardMedia>
          <CardContent>
            <Typography variant="h6" component={"h3"}>
              Portfollio WebSite
            </Typography>
            <Typography variant="body2" component={"div"}>
              Portfollio WebSite has working on the creating dynamic website.
              with the MERN Stack Development has the dynamic changes. It will
              create soon the adminn page for the create changes.
            </Typography>
          </CardContent>
          <CardActions>
            <Link target="_blank" to={"https://github.com/rohit18-p/portfolio"}>
              <Button variant="outlined" size={"small"}>
                <GitHub /> GitHub
              </Button>
            </Link>
            <Link
              target="_blank"
              to={
                "https://www.linkedin.com/posts/rohit-patil18_i-have-been-created-react-project-with-my-activity-7209076011706023940-3ya1?utm_source=share&utm_medium=member_desktop"
              }
            >
              <Button variant="contained" size={"small"}>
                <LinkedIn /> linkedIn
              </Button>
            </Link>
          </CardActions>
        </Card>
      </div>
    </section>
  );
}

export default Project;
