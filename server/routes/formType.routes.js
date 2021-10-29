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
  .get("/:id?", logToken, checkJwt, checkPermissions(ReadFormTypes), getFormTypes)
  .post("/", logToken, checkJwt, checkPermissions(CreateFormType), addFormType)
  .put("/:id", checkJwt, checkPermissions(UpdateFormType), updateFormType)
  .delete("/:id", checkJwt, checkPermissions(DeleteFormType), removeFormType);

module.exports = router;