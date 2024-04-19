// import express from "express";
const express = require("express");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts.js");

// const {
//   createContactSchema,
//   updateContactSchema,
// } = require("../../schemas/contactsSchemas.js");
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
  updateStatusContact,
} = require("../../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch("/:id/favorite", updateStatusContact);
// export default contactsRouter;
module.exports = contactsRouter;
