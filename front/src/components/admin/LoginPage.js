import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../utils/alertProvider";
import "./loginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/actions/userActions";
import { CLEAR_ERRORS } from "../../redux/constants/userConstants";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { sendAlert } = useContext(AlertContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, success, user } = useSelector(
    (state) => state.user
  );

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return sendAlert("Please fill all required fields", "info");
    }

    if (password.length < 8) {
      return sendAlert("Password length should be a 8 character", "info");
    }

    dispatch(loginUserAction({ password, email }));
  };

  useEffect(() => {
    user && navigate("/admin/projects");
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
              <h2>Login</h2>

              <Box>
                <label>Email</label>
                <TextField
                  size="small"
                  autoFocus
                  value={email}
                  type="email"
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

              <Button variant="contained" type="submit">
                Log In
              </Button>
              <Typography
                sx={{ textAlign: "center" }}
                variant="body2"
                component={"div"}
              >
                If you don't have any account?{" "}
                <Link to={"/admin/sign"}>Sign In!</Link>
              </Typography>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignupPage;
