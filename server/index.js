const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");

app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/", indexRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});