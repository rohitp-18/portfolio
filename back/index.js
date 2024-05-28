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

dotenv.config({ path: path.resolve(__dirname, "config/.env") });

mongod();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressfile());

app.use("/api/v1/user", userRouter);

app.use(error);

app.listen(process.env.PORT);
