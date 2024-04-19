const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();


// маршрут реєстрації  ( signup)
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
// маршрут логіна ( signin)
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent)

router.post("/logout", authenticate, ctrl.logout)
module.exports = router;
