// import express from "express";
const express = require("express");
// import morgan from "morgan";
const morgan = require("morgan");
// import cors from "cors";
const cors = require("cors");

// import contactsRouter from "./routes/api/contactsRouter.js";
const contactsRouter = require("./routes/api/contactsRouter");
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});

module.exports = app;
