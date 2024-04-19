// import express from "express";
const express = require("express");
// import morgan from "morgan";
const morgan = require("morgan");
const logger = require("morgan");
// import cors from "cors";
const cors = require("cors");
require("dotenv").config();
// import contactsRouter from "./routes/api/contactsRouter.js";
const contactsRouter = require("./routes/api/contactsRouter");
const authRouter = require("./routes/api/auth");


const app = express();

app.use(morgan("tiny"));
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);


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

module.exports = app;
