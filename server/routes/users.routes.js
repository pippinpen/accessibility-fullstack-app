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
  .get(
    "/:id?",
    logToken,
    checkJwt,
    checkPermissions(ReadOwnUser),
    getOwnUser
  )
  .post("/", logToken, checkJwt, checkPermissions(CreateOwnUser), addOwnUser)
  .put("/:id", checkJwt, checkPermissions(UpdateOwnUser), updateOwnUser)
  .delete("/:id", checkJwt, checkPermissions(DeleteOwnUser), removeOwnUser)
  // Admin
  .get(
    "/admin/:id?",
    logToken,
    checkJwt,
    checkPermissions(ReadUsers),
    getUsers
  )
  .post("/admin/", logToken, checkJwt, checkPermissions(CreateUsers), addUser)
  .put("/admin/:id", checkJwt, checkPermissions(UpdateUsers), updateUser)
  .delete("/admin/:id", checkJwt, checkPermissions(DeleteUsers), removeUser);

module.exports = router;