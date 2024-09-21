const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const connectToDb = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "files")));

connectToDb();

app.use("/user", userRoutes);
app.use("/products", productRoutes);

app.listen(process.env.PORT || 8010, () => {
  console.log(`Server is running on port ${process.env.PORT || 8010}`);
});
