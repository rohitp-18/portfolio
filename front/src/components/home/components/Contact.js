import React, { useContext, useEffect, useState } from "react";
import "./contact.scss";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  EmailOutlined,
  GitHub,
  Instagram,
  LinkedIn,
  WhatsApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../redux/actions/messageAction";
import { CREATE_MESSAGE_RESET } from "../../../redux/constants/messageConstant";
import { CLEAR_ERRORS } from "../../../redux/constants/userConstants";
import { AlertContext } from "../../utils/alertProvider";

function Contact() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.message);
  const { sendAlert } = useContext(AlertContext);

  //const getCurrentTheme = () =>
  // window.matchMedia("(prefers-color-scheme: dark)").matches;

  useEffect(() => {
    // console.log(getCurrentTheme());
    if (success) {
      sendAlert("Message Sended Successfully", "success");
      dispatch({ type: CREATE_MESSAGE_RESET });
    }

    if (error) {
      sendAlert(error, "error");
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [success, dispatch, error]);

  const formSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      sendAlert("Please fill all fields", "error");
      return;
    }

    dispatch(createMessage({ name, email, message }));
  };
  return (
    <section className="contact-component">
      <h2>Contact Me</h2>
      <div className="contact">
        <div className="me">
          <Typography component={"div"} variant="body">
            You can contact with this platform also,
            <br /> I will replay as soon as possible
          </Typography>
          <Link
            to={
              "https://api.whatsapp.com/send/?phone=919356971002&text=Hii&type=phone_number&app_absent=0"
            }
          >
            <WhatsApp />
            <Typography component={"h6"} variant="body1">
              +91 9356971002
            </Typography>
          </Link>
          <Link
            to={
              "mailto:rohitpatil18t@hotmail.com?subject=Hii&body=Hi,%0D%0A%0D%0A"
            }
          >
            <EmailOutlined />
            <Typography component={"h6"} variant="body1">
              rohitpatil18@hotmail.com
            </Typography>
          </Link>
          <Link to={"https://github.com/rohit18-p"}>
            <GitHub />
            <Typography component={"h6"} variant="body1">
              /rohit18-p
            </Typography>
          </Link>
          <Link to={"https://www.linkedin.com/in/rohit-patil18/"}>
            <LinkedIn />
            <Typography component={"h6"} variant="body1">
              /rohit-patil-18
            </Typography>
          </Link>
          <Link to={"https://www.instagram.com/rohit_p.18/"}>
            <Instagram />
            <Typography component={"h6"} variant="body1">
              /rohit_p.18
            </Typography>
          </Link>
        </div>
        <form onSubmit={(e) => formSubmit(e)}>
          <Box>
            <h4>Name</h4>
            <TextField
              placeholder="Your Name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <Box>
            <h4>Email</h4>
            <TextField
              placeholder="Your Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box>
            <h4>Message</h4>
            <TextField
              placeholder="Your Message"
              value={message}
              multiline
              type="text"
              rows={5}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
          <Button type="submit" disabled={loading} variant="contained">
            Send
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
