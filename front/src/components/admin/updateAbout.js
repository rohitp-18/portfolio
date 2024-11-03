import React, { useContext, useEffect, useRef, useState } from "react";
import "./createProject.scss";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AlertContext } from "../utils/alertProvider";
import { updateAbout } from "../../redux/actions/allAction";
import {
  CLEAR_ERRORS,
  UPDATE_ABOUT_RESET,
} from "../../redux/constants/allConstants";

function UpdateAbout({ project, setUpdate }) {
  const [name, setName] = useState(project.name);
  const [cvLink, setCVLink] = useState(project.cvLink);
  const [about, setAbout] = useState(project.about);
  const [hireLink, setHireLink] = useState(project.hireLink);
  const [description, setDescription] = useState(project.description);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [img, setImg] = useState(project.aboutImage);
  const [sWork, setSWork] = useState();
  const [work, setWork] = useState(project.work);
  const [images, setImages] = useState(project.aboutImage);
  const [aimg, setAimg] = useState(project.avatar);
  const [avatar, setAvatar] = useState(project.avatar);

  const dispatch = useDispatch();
  const { updated, error, message } = useSelector((state) => state.adminAbout);
  const { sendAlert } = useContext(AlertContext);
  const input = useRef(null);
  const input2 = useRef();

  const uploadImage = (e) => {
    if (!e.target.files[0]) return;
    const reader = new FileReader();

    setImages(e.target.files[0]);

    reader.onload = () => {
      setImg(reader.result);
      setOpen(true);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const uploadImage2 = (e) => {
    if (!e.target.files[0]) return;
    const reader = new FileReader();

    setAvatar(e.target.files[0]);

    reader.onload = () => {
      setAimg(reader.result);
      setOpen2(true);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("cvLink", cvLink);
    work.map((w) => form.append("work", w));
    form.append("hireLink", hireLink);
    project.avatar !== avatar && form.append("avatar", avatar);
    project.aboutImage !== images && form.append("aboutImage", images);
    form.append("about", about);
    //education
    form.append("description", description);
    dispatch(updateAbout(project._id, form));
  };

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }

    if (updated) {
      sendAlert(message, "success");
      dispatch({ type: UPDATE_ABOUT_RESET });
      setUpdate(false);
      return;
    }
    // eslint-disable-next-line
  }, [message, error, updated, dispatch]);
  return (
    <>
      <Paper className="paper-update-project">
        <form onSubmit={(e) => submitHandler(e)}>
          <h1>Update About</h1>
          <Box className="input-box">
            <label>Name</label>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              fullWidth
              autoFocus
            />
          </Box>
          <Box className="input-box">
            <label>Desceiption</label>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
          <Box className="input-box">
            <label>Work</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                value={sWork}
                onChange={(e) => setSWork(e.target.value)}
                size="small"
                fullWidth
              />
              <Button
                onClick={() => setWork([...work, sWork])}
                variant="contained"
              >
                Add
              </Button>
            </div>
            <div style={{ padding: "10px 0" }}>
              {work &&
                work.map((w) => (
                  <Badge
                    sx={{
                      bgcolor: "#adadad",
                      p: "3px",
                      ml: "10px",
                      mb: "5px",
                    }}
                    badgeContent={
                      <IconButton
                        sx={{ p: "0", width: "5px", height: "5px" }}
                        onClick={() => setWork(work.filter((ww) => ww !== w))}
                      >
                        <Close
                          sx={{
                            width: "14px",
                            height: "14px",
                            color: "white",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    }
                    color="error"
                  >
                    <span style={{ fontSize: "13px" }}>{w}</span>
                  </Badge>
                ))}
            </div>
          </Box>
          <Box className="input-box">
            <label>CV Link</label>
            <TextField
              value={cvLink}
              type="url"
              onChange={(e) => setCVLink(e.target.value)}
              size="small"
              fullWidth
            />
          </Box>
          <Box className="input-box">
            <label>Hire Link</label>
            <TextField
              value={hireLink}
              onChange={(e) => setHireLink(e.target.value)}
              size="small"
              fullWidth
            />
          </Box>
          <Box className="input-box">
            <label>About</label>
            <TextField
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              size="small"
              fullWidth
              multiline
              rows={5}
            />
          </Box>
          <Box className="input-box">
            <label>avatar</label>
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                gap: "15px",
              }}
              onClick={() => !aimg && input2.current.click()}
            >
              <Avatar onClick={() => setOpen2(true)} src={aimg} />
              <p
                style={{
                  opacity: 0.95,
                  paddingBottom: "0px",
                  fontSize: "14px",
                }}
                onClick={() => input2.current.click()}
              >
                Click here to upload profile image
              </p>
            </div>
            <input
              accept="image/*"
              id="image"
              ref={input2}
              style={{ display: "none" }}
              onChange={(e) => uploadImage2(e)}
              type="file"
            />
          </Box>
          <Box className="input-box">
            <label>About Image</label>
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
          </Box>
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
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {aimg && (
            <Dialog open={open2} onClose={() => setOpen2(false)}>
              <DialogTitle>Confirn Photo</DialogTitle>
              <DialogContent>
                <img height={200} src={aimg} alt="sorry" />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen2(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    setOpen2(false);
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
            {img && (
              <Badge
                badgeContent={
                  <IconButton
                    onClick={() => setImg("")}
                    sx={{ width: "17px", height: "17px" }}
                  >
                    <Close sx={{ color: "white", cursor: "pointer" }} />
                  </IconButton>
                }
                color="error"
              >
                <img src={img} alt="sorry" height={300} />
              </Badge>
            )}
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

export default UpdateAbout;
