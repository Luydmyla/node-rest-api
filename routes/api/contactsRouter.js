// import express from "express";
const express = require("express");
const { validateBody, isValidId,authenticate } = require("../../middlewares");
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

contactsRouter.get("/",authenticate, getAllContacts);

contactsRouter.get("/:id",authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id",authenticate, isValidId, deleteContact);

contactsRouter.post(
  "/",authenticate,
  validateBody(schemas.createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

contactsRouter.patch("/:id/favorite",authenticate, updateStatusContact);
// export default contactsRouter;
module.exports = contactsRouter;
