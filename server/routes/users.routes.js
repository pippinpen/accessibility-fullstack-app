const path = require("path");
const express = require("express");
const logger = require("./../logger");
const router = express.Router();

const {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  getOwnUser,
  addOwnUser,
  updateOwnUser,
  removeOwnUser,
} = require("../controllers/user.controller.js");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("./../middleware/authz.middleware");

const {
  CreateUsers,
  DeleteUsers,
  ReadUsers,
  UpdateUsers,
  CreateOwnUser,
  DeleteOwnUser,
  ReadOwnUser,
  UpdateOwnUser,
} = require("../constants").UserPermission;

const logToken = (req, res, next) => {
  logger.info(`headers: ${req.headers}`);
  next();
};

router
  .get("/:id?", logToken, checkJwt, getOwnUser)
  .post("/", logToken, checkJwt, addOwnUser)
  .put("/:id", checkJwt, updateOwnUser)
  .delete("/:id", checkJwt, removeOwnUser)
  // Admin
  .get("/admin/:id?", logToken, checkJwt, getUsers)
  .post("/admin/", logToken, checkJwt, addUser)
  .put("/admin/:id", checkJwt, updateUser)
  .delete("/admin/:id", checkJwt, removeUser);

module.exports = router;

// user permissions
// checkPermissions(ReadOwnUser)
// checkPermissions(CreateOwnUser)
// checkPermissions(UpdateOwnUser)
// checkPermissions(DeleteOwnUser)

// admin permissions
// checkPermissions(ReadUsers)
// checkPermissions(CreateUsers)
// checkPermissions(UpdateUsers)
// checkPermissions(DeleteUsers)