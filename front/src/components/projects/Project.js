import React, { useEffect, useState } from "react";
import Footer from "../utils/headFoot/Footer";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./project.scss";
import Filters from "./filters";
import { FilterAlt, GitHub, LinkedIn, Menu, Search } from "@mui/icons-material";
import Drawer from "../utils/headFoot/drawer";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../redux/actions/projectAction";

function Project() {
  const [search, setSearch] = useState();
  const [sort, setSort] = useState("sort");
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [skills, setSkills] = useState("all");
  const [catergory, setCategory] = useState("all");

  const location = useLocation();

  const keyUp = (e) => {
    if (e.code === 13) {
      // search
      return;
    }
  };

  const { projects } = useSelector((state) => state.project);
  const { about } = useSelector((state) => state.all);
  const dispatch = useDispatch();

  useEffect(() => {
    setSkills([location.search.split("=")[1]]);
  }, [location]);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {}, [skills, sort, catergory]);
  return (
    <>
      {about && (
        <main className="project-main">
          <section className="project-section">
            <div className="search">
              <IconButton onClick={() => setOpen(true)}>
                <Menu />
              </IconButton>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                className="text"
                type="search"
                value={search}
                size="small"
                autoComplete
                placeholder="Search Projects"
                onKeyUp={(e) => keyUp(e)}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="logo">
                <Avatar src={about.avatar} alt={about.name} />
                <h3>Rohit Patil</h3>
              </div>
            </div>
            <div className="mobile-search">
              <Box className="box">
                <IconButton onClick={() => setOpen(true)}>
                  <Menu />
                </IconButton>
                <div className="logo">
                  <Avatar src={about.avatar} alt={about.name} />
                </div>
              </Box>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                className="text"
                type="search"
                value={search}
                size="small"
                placeholder="Search Projects"
                onKeyUp={(e) => keyUp(e)}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Box
                className="box-filter"
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Select
                  value={sort}
                  sx={{ width: "50%", minHeight: "unset", height: "40px" }}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <MenuItem disabled value="sort">
                    Sort By
                  </MenuItem>
                  <MenuItem value="realvent">Relavent</MenuItem>
                  <MenuItem value="popular">Popularity</MenuItem>
                  <MenuItem value="new">Newest First</MenuItem>
                  <MenuItem value="end">Oldest First</MenuItem>
                </Select>
                <Box
                  onClick={() => setFilter(true)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                    height: "40px",
                    border: "1px solid #76767676",
                  }}
                >
                  <FilterAlt /> Filers
                </Box>
              </Box>
            </div>
            <Drawer open={open} setOpen={setOpen} />
            <div className="result">
              <Filters
                skills={skills}
                setSkills={setSkills}
                catergory={catergory}
                setCategory={setCategory}
                filter={filter}
                setFilter={setFilter}
                setSort={setSort}
                sort={sort}
              />
              <Drawer
                className="drawer-filter"
                open={filter}
                onClose={() => setFilter(false)}
              >
                <Box className="red">
                  <Filters
                    skills={skills}
                    setSkills={setSkills}
                    catergory={catergory}
                    setCategory={setCategory}
                    filter={filter}
                    setFilter={setFilter}
                    setSort={setSort}
                    sort={sort}
                  />
                </Box>
              </Drawer>
              <div className="projects">
                {projects &&
                  projects.map((pro, i) => (
                    <Link to={`/project/${i}`}>
                      <Card className="card">
                        <CardMedia
                          component={"img"}
                          image={pro.images[0].url}
                          height={200}
                        />
                        <CardContent>
                          <Typography variant="h6" component={"h3"}>
                            {pro.name}
                          </Typography>
                          <Typography variant="body2" component={"div"}>
                            {pro.description}
                          </Typography>
                        </CardContent>{" "}
                        <CardActions>
                          <Link target="_blank" to={pro.github}>
                            <Button size={"small"}>
                              <GitHub /> GitHub
                            </Button>
                          </Link>
                          <Link target="_blank" to={pro.linkedin}>
                            <Button variant="contained" size={"small"}>
                              <LinkedIn /> linkedIn
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
          <Footer />
        </main>
      )}
    </>
  );
}

export default Project;
