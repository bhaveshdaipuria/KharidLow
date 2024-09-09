const express = require("express");
const app = express();
require("dotenv").config();

const connectToDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();  //Connecting to mongodb

app.use("/user", userRouter);
app.use("/kharidlow", indexRouter);

app.listen(process.env.PORT || 8010, () => {
  console.log(`Server is running on port ${process.env.PORT || 8010}`);
});