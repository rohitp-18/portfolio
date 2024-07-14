import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utils/alertProvider";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../redux/actions/userActions";
import { CLEAR_ERRORS } from "../../redux/constants/userConstants";

function SignupPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, success, user } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      sendAlert("Password and confirm password doesn't matchs", "info");
      return;
    }

    if (!name || !email || !password) {
      return sendAlert("Please fill all required fields", "info");
    }

    if (password.length < 8) {
      return sendAlert("Password length should be a 8 character", "info");
    }

    dispatch(registerUserAction({ name, password, email }));
  };

  useEffect(() => {
    user && navigate("/admin");
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    if (success) {
      sendAlert(message, "success");
      navigate("/admin");
    }
  }, [success, navigate, message, error, dispatch]);

  return (
    <>
      <main className="main-sign">
        <section className="section-sign">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="img"></div>
            <div className="form">
              <h2>Sign In</h2>
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
                <label>Email</label>
                <TextField
                  size="small"
                  autoFocus
                  value={email}
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box>
                <label>Password</label>
                <TextField
                  size="small"
                  autoFocus
                  type="password"
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box>
                <label>Confirm Password</label>
                <TextField
                  size="small"
                  autoFocus
                  value={confirmPassword}
                  type="password"
                  fullWidth
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
              <Button disabled={loading} variant="contained" type="submit">
                Sign In
              </Button>
              <Typography
                sx={{ textAlign: "center" }}
                variant="body2"
                component={"div"}
              >
                If you have an account?{" "}
                <Link to={"/admin/login"}>Login now!</Link>
              </Typography>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignupPage;
