import React, { useContext, useEffect, useRef, useState } from "react";
import "./createProject.scss";
import {
  Autocomplete,
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {
  Add,
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  Close,
} from "@mui/icons-material";
import { createProject } from "../../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_ERRORS,
  CREATE_PROJECT_RESET,
  DELETE_PROJECT_RESET,
} from "../../redux/constants/projectConstants";
import { AlertContext } from "../utils/alertProvider";

function CreateProject() {
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [skill, setSkill] = useState([]);
  const [description, setDescription] = useState();
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const [category, setCategory] = useState("select");
  const [images, setImages] = useState([]);
  const [option, setOption] = useState([]);

  const catergoryList = ["mern", "react", "android"];

  const dispatch = useDispatch();
  const { created, error, message } = useSelector(
    (state) => state.adminProject
  );
  const { skills } = useSelector((state) => state.all);
  const { sendAlert } = useContext(AlertContext);
  const input = useRef(null);

  const uploadImage = (e) => {
    const reader = new FileReader();

    setImages([...images, e.target.files[0]]);

    reader.onload = () => {
      setImg(reader.result);
      setOpen(true);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("category", category);
    images.map((imd) => form.append("images", imd));
    skill.map((imd) => form.append("skills", imd));
    form.append("description", description);
    dispatch(createProject(form));
  };

  useEffect(() => {
    let demo = [];
    skills && skills.map((ski) => demo.push({ name: ski.name, _id: ski._id }));
    setOption(demo);
  }, [skills]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (created) {
      sendAlert(message, "success");
      dispatch({ type: CREATE_PROJECT_RESET });
      return;
    }
  }, [message, error, created, dispatch]);
  return (
    <>
      <main className="main-create-project">
        <section className="section-project">
          <form onSubmit={(e) => submitHandler(e)}>
            <h1>Create Project</h1>
            <Box className="input-box">
              <label>Project Name</label>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="small"
                fullWidth
                autoFocus
              />
            </Box>
            <Box className="input-box">
              <label>Project Desceiption</label>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />
            </Box>
            <h3> Select category</h3>
            <p>We recommended you will select category of this project</p>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ maxWidth: 500, width: "100%" }}
            >
              <MenuItem disabled value={"select"}>
                Select Catergory
              </MenuItem>
              {catergoryList.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>

            <h3> Add skills</h3>
            <p>We recommended you will add top 5 skills in this section</p>
            <Autocomplete
              multiple
              options={option}
              disableCloseOnSelect
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(e, val) => setSkill(val.map((v) => v._id))}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankOutlined size="small" />}
                      checkedIcon={<CheckBox size="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.name}
                  </li>
                );
              }}
              sx={{ maxWidth: 500, width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Checkboxes"
                  placeholder="Favorites"
                />
              )}
            />

            <h3>Add Images</h3>
            <p>
              We recommended you will add Images of the project in this section
            </p>
            <input
              accept="image/*"
              id="image"
              ref={input}
              style={{ display: "none" }}
              onChange={(e) => uploadImage(e)}
              type="file"
            />
            <label htmlFor="image">
              <Button
                sx={{ mb: "10px" }}
                onClick={() => input.current.click()}
                variant="outlined"
              >
                <Add /> Add Image
              </Button>
            </label>
            {img && (
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirn Photo</DialogTitle>
                <DialogContent>
                  <img height={200} src={img} alt="sorry" />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setImage([...image, img]);
                    }}
                    variant="contained"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            )}
            <Paper
              sx={{ display: img ? "block" : "none" }}
              elevation={5}
              className="preview-image"
            >
              {img &&
                image.map((im) => (
                  <Badge
                    key={im}
                    badgeContent={
                      <IconButton
                        onClick={() => {
                          setImage(image.filter((ig) => im !== ig));
                          setImages(image.filter((ig) => im !== ig));
                        }}
                        sx={{ width: "17px", height: "17px" }}
                      >
                        <Close sx={{ color: "white", cursor: "pointer" }} />
                      </IconButton>
                    }
                    color="error"
                  >
                    <img src={im} alt="sorry" height={300} />
                  </Badge>
                ))}
            </Paper>

            <div className="button">
              <Button variant="contained" type="submit">
                Create
              </Button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreateProject;
