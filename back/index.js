const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressfile = require("express-fileupload");

const mongod = require("./config/mongod");
const error = require("./middlewares/error");
const userRouter = require("./routers/userRouter");
const projectRouter = require("./routers/projectRouter");
const skillsRouter = require("./routers/skillsRouter");
const messageRouter = require("./routers/messageRouter");
const cloudinary = require("cloudinary").v2;

dotenv.config({ path: path.resolve(__dirname, "config/.env") });

mongod();
const app = express();

cloudinary.config({
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressfile());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/skills", skillsRouter);
app.use("/api/v1/message", messageRouter);

app.use(error);

app.listen(process.env.PORT);
