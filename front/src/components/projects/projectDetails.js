import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./projectDetails.scss";
import { List, ListItem } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getProject } from "../../redux/actions/projectAction";

function ProjectDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const [project, setProject] = useState();

  useEffect(() => {
    if (!projects) {
      dispatch(getAllProjects());
      return;
    }
    if (!projects[id]) {
      // console.log(id);
      navigate("/project");
      return;
    }
    // console.log(id);
    setProject(projects[id]);
  }, [dispatch, projects]);
  return (
    <>
      {project && (
        <main className="main-project-id">
          <section className="section-project-id">
            <Link to={-1}>
              <ArrowLeft />
            </Link>
            <div>
              <div className="carousel">
                <Carousel swipe stopAutoPlayOnHover>
                  {project.images.map((img) => (
                    <img key={img} src={img.url} alt={project.name} />
                  ))}
                </Carousel>
              </div>
              <div className="about">
                <div className="name">
                  <h2>{project.name}</h2>
                </div>
                <p>{project.description}</p>
                <List sx={{ listStyle: "initial" }}>
                  <h3>Skills</h3>
                  {project.skills.map((name) => (
                    <ListItem>{name.name}</ListItem>
                  ))}
                </List>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default ProjectDetails;
