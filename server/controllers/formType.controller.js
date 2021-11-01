const FormType = require("../models/formType/formType.model");
const { errorHandler } = require("./utils");
const logger = require("../logger");

exports.getFormTypes = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  FormType.find(query).exec((err, formTypes) => {
    if (err) return errorHandler(res, err);
    if (req.params.id && formTypes.length === 0)
      return res.status(404).send({ message: "No formType with that ID" });
    return res.status(200).json(formTypes);
  });
};

exports.addFormType = function (req, res) {
  const formTypeData = req.body;
  logger.info(`formTypeData ${formTypeData}`);
  logger.info(`user ${req.user}`);
  const newFormType = new FormType(formTypeData);
  newFormType.save((err, formType) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(formType);
  });
};

exports.updateFormType = function (req, res) {
  FormType.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: "No formType with that ID" });
    res.sendStatus(200);
  });
};

exports.removeFormType = function (req, res) {
  const formTypeId = req.params.id;
  FormType.deleteOne({ _id: formTypeId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (formTypeId && report.deletedCount === 0) {
      return res.status(404).send({ message: "No formType with that ID" });
    }
    res.sendStatus(204);
  });
};
