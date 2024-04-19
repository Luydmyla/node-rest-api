// import express from "express";
const express = require("express");
// import morgan from "morgan";
const morgan = require("morgan");
<<<<<<< HEAD
const logger = require("morgan");
// import cors from "cors";
const cors = require("cors");
require("dotenv").config();
=======
// import cors from "cors";
const cors = require("cors");

>>>>>>> 1a065525acc7606234cb0c6ca2946d652f51c941
// import contactsRouter from "./routes/api/contactsRouter.js";
const contactsRouter = require("./routes/api/contactsRouter");
const app = express();

app.use(morgan("tiny"));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

<<<<<<< HEAD
=======
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

>>>>>>> 1a065525acc7606234cb0c6ca2946d652f51c941
module.exports = app;
