const express = require("express");
const { postRegister, postLogin, postLogout, getCheckSession } = require("./user.controller");
const UserRoutes = express.Router();

UserRoutes.post("/register", postRegister);
UserRoutes.post("/login", postLogin);
UserRoutes.post("/logout", postLogout);
UserRoutes.get('/check-session', getCheckSession);

module.exports = UserRoutes;