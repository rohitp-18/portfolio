import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import "./project.scss";
import { Link } from "react-router-dom";
import { Circle, GitHub, LinkedIn } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";

function Project() {
  const { projects } = useSelector((state) => state.all);
  return (
    <section className="project-component">
      {projects && (
        <>
          <h2>Project</h2>
          <div className="project-cards">
            {projects.map((project) => (
              <Card key={project._id} className="card">
                <Carousel indicators={false}>
                  {project.images.map((im) => (
                    <CardMedia
                      component={"img"}
                      height={200}
                      key={im._id}
                      image={im.url}
                      alt="red"
                    ></CardMedia>
                  ))}
                </Carousel>
                <CardContent>
                  <Typography variant="h6" component={"h3"}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" component={"div"}>
                    {project.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {project.links.host && (
                    <Link target="_blank" to={project.links.host}>
                      <Button variant="text" color="error" size={"small"}>
                        <Circle /> Live
                      </Button>
                    </Link>
                  )}
                  <Link target="_blank" to={project.links.github}>
                    <Button variant="outlined" size={"small"}>
                      <GitHub /> GitHub
                    </Button>
                  </Link>
                  <Link target="_blank" to={project.links.linkedin}>
                    <Button variant="contained" size={"small"}>
                      <LinkedIn /> linkedIn
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Project;
