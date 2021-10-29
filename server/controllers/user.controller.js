const User = require('../models/user/user.model');
const { errorHandler } = require('./utils');
const logger = require('./../logger');

exports.getUsers = function (req, res) {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }
  User.find(query)
    .populate('items')
    .exec((err, users) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && users.length === 0)
        return res.status(404).send({ message: 'No user with that ID' });
      return res.status(200).json(users);
    });
};

exports.getOwnUser = function (req, res) {
  let query = {
    customerID: req.user.sub,
  };
  if (req.params.id) {
    query._id = req.params.id;
  }
  User.find(query)
    .populate('items')
    .exec((err, userData) => {
      if (err) return errorHandler(res, err);
      if (req.params.id && userData.length === 0)
        return res.status(404).send({ message: 'No user with that ID' });
      return res.status(200).json(userData);
    });
};

exports.addUser = function (req, res) {
  const userData = req.body;
  logger.info(`userData ${userData}`);
  const newUser = new User({ userData });
  newUser.save((err, user) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(user);
  });
};

exports.addOwnUser = function (req, res) {
  const userData = { ...req.body, customerID: req.user.sub };
  logger.info(`userData ${userData}`);
  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) return errorHandler(res, err);
    return res.status(201).json(user);
  });
};

exports.updateUser = function (req, res) {
  User.updateOne({ _id: req.params.id }, req.body, function (err, result) {
    if (err) return errorHandler(res, err);
    logger.info(`result ${result}`);
    if (result.nModified === 0)
      return res.status(404).send({ message: 'No user with that ID' });
    res.sendStatus(200);
  });
};

exports.updateOwnUser = function (req, res) {
  User.updateOne(
    { _id: req.params.id, owner: req.user.sub },
    req.body,
    function (err, result) {
      if (err) return errorHandler(res, err);
      logger.info(`result ${result}`);
      if (result.nModified === 0)
        return res.status(404).send({ message: 'No user with that ID' });
      res.sendStatus(200);
    },
  );
};

exports.removeUser = function (req, res) {
  const userId = req.params.id;
  User.deleteOne({ _id: userId }, function (err, report) {
    if (err) return errorHandler(res, err);
    logger.info(`report ${report}`);
    if (userId && report.deletedCount === 0) {
      return res.status(404).send({ message: 'No user with that ID' });
    }
    res.sendStatus(204);
  });
};

exports.removeOwnUser = function (req, res) {
  const userId = req.params.id;
  User.deleteOne(
    { _id: userId, owner: req.user.sub },
    function (err, report) {
      if (err) return errorHandler(res, err);
      logger.info(`report ${report}`);
      if (userId && report.deletedCount === 0) {
        return res.status(404).send({ message: 'No user with that ID' });
      }
      res.sendStatus(204);
    },
  );
};
