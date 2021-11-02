const path = require("path");
const express = require("express");
const logger = require("../logger");
const router = express.Router();
const {
  getFormTypes,
  addFormType,
  updateFormType,
  removeFormType,
} = require("../controllers/formType.controller.js");

const { checkPermissions } = require("../middleware/permissions.middleware");
const { checkJwt } = require("../middleware/authz.middleware");

const {
  CreateFormType,
  DeleteFormType,
  ReadFormTypes,
  UpdateFormType,
} = require("../constants").FormTypePermission;

const logToken = (req, res, next) => {
  logger.info(`headers ${req.headers}`);
  next();
};

const logUser = (req, res, next) => {
  logger.info(`User ${req.user}`);
  next();
};

router
  .get("/:id?", logToken, checkJwt, getFormTypes)
  .post("/", logToken, checkJwt, addFormType)
  .put("/:id", checkJwt, updateFormType)
  .delete("/:id", checkJwt, removeFormType);

module.exports = router;
// checkPermissions(ReadFormTypes)
//  checkPermissions(CreateFormType)
//  checkPermissions(UpdateFormType)
//  checkPermissions(DeleteFormType)