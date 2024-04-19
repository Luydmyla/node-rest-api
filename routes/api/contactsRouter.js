// import express from "express";
const express = require("express");
const validateBody = require("../../helpers/validateBody.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../../schemas/contactsSchemas.js");
// import {
//   getAllContacts,
//   getOneContact,
//   deleteContact,
//   createContact,
//   updateContact,
// } from "../../controllers/contactsControllers.js";
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

// export default contactsRouter;
module.exports = contactsRouter;
