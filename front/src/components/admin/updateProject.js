import React, { useContext, useEffect, useRef, useState } from "react";
import "./updateProject.scss";
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
import { updateProject } from "../../redux/actions/projectAction";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_ERRORS,
  CREATE_PROJECT_RESET,
} from "../../redux/constants/projectConstants";
import { AlertContext } from "../utils/alertProvider";

function UpdateProject({ project }) {
  const [image, setImage] = useState([]);
  const [name, setName] = useState(project.name);
  const [skill, setSkill] = useState(project.skills.map((ski) => ski._id));
  const [description, setDescription] = useState(project.description);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState();
  const [newImage, setNewImages] = useState([]);
  const [category, setCategory] = useState(project.category);
  const [images, setImages] = useState(project.images);
  const [option, setOption] = useState([]);

  const catergoryList = ["mern", "react", "android"];

  const dispatch = useDispatch();
  const { updated, error, message } = useSelector(
    (state) => state.adminProject
  );
  const { skills } = useSelector((state) => state.all);
  const { sendAlert } = useContext(AlertContext);
  const input = useRef(null);

  const uploadImage = (e) => {
    if (!e.target.files[0]) return;
    const reader = new FileReader();

    setNewImages([...images, e.target.files[0]]);

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
    newImage.map((imd) => form.append("newImages", imd));
    images.map((imd) => form.append("images", imd));
    skill.map((imd) => form.append("skills", imd));
    form.append("description", description);
    dispatch(updateProject(project._id, form));
  };

  useEffect(() => {
    let demo = [];
    skills && skills.map((ski) => demo.push({ name: ski.name, _id: ski._id }));
    setOption(demo);
    console.log("newImages", newImage);
    console.log("images", images);
    console.log("image", image);
  }, [skills]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (updated) {
      sendAlert(message, "success");
      dispatch({ type: CREATE_PROJECT_RESET });
      return;
    }
  }, [message, error, updated, dispatch]);
  return (
    <>
      <Paper className="paper-update-project">
        <form onSubmit={(e) => submitHandler(e)}>
          <h1>Update Project</h1>
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
            defaultValue={project.skills}
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
          <Paper elevation={5} className="preview-image">
            {image.map((im) => (
              <Badge
                key={im}
                badgeContent={
                  <IconButton
                    onClick={() => {
                      setImage(image.filter((ig) => im !== ig));
                      setNewImages(newImage.filter((ig) => im !== ig));
                    }}
                    sx={{ width: "20px", height: "20px" }}
                  >
                    <Close sx={{ cursor: "pointer" }} />
                  </IconButton>
                }
                color="error"
              >
                <img src={im} alt="sorry1" height={300} />
              </Badge>
            ))}
            {images.map((im) => (
              <Badge
                key={im}
                badgeContent={
                  <IconButton
                    onClick={() => {
                      setImage(image.filter((ig) => im !== ig));
                      setImages(images.filter((ig) => im !== ig));
                    }}
                    sx={{ width: "20px", height: "20px" }}
                  >
                    <Close sx={{ cursor: "pointer" }} />
                  </IconButton>
                }
                color="error"
              >
                <img src={im.url} alt="sorry" height={300} />
              </Badge>
            ))}
          </Paper>

          <div className="button">
            <Button variant="contained" type="submit">
              Update
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
}

export default UpdateProject;
