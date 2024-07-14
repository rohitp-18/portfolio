import { Box, Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utils/alertProvider";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUserAction } from "../../redux/actions/userActions";
import {
  ADMIN_UPDATE_USER_RESET,
  CLEAR_ERRORS,
} from "../../redux/constants/userConstants";

function UpdateUser({ select, setOpen }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();

  const { sendAlert } = useContext(AlertContext);
  const { error, message, updated } = useSelector((state) => state.adminUser);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !role) {
      return sendAlert("Please fill all required fields", "info");
    }
    dispatch(adminUpdateUserAction(select.id, { name, email, role }));
  };

  useEffect(() => {
    setName(select.name);
    setEmail(select.email);
    setRole(select.role);
  }, [select]);

  useEffect(() => {
    if (updated) {
      sendAlert(message, "success");
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      setOpen(false);
      return;
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
      return;
    }
  }, [error, updated, message, dispatch]);
  return (
    <>
      {select && (
        <Paper sx={{ maxWidth: "500px", width: "97%" }} elevation={8}>
          <form onSubmit={(e) => submitHandler(e)} className="update-user">
            <h2>Update User</h2>
            <Box>
              <label>Name</label>
              <TextField
                size="small"
                autoFocus
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <label>Eamil</label>
              <TextField
                size="small"
                autoFocus
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <label>Role</label>
              <Select
                value={role}
                defaultValue={select.role}
                fullWidth
                size="small"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </Box>
            <Box className="box-button">
              <Button onClick={() => setOpen(false)} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </>
  );
}

export default UpdateUser;
