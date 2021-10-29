const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const logger = require('./logger');

const {
  NODE_ENV='development'
} = process.env;

module.exports = function (app) {
  if ( NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/", "build")));
    app.use(compression());
  }
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());

  // http logging
  // app.use(morgan("dev"));

//   let logger = new (winston.Logger)({
//     exitOnError: false,
//     level: 'info',
//     transports: [
//         new (winston.transports.Console)(),
//         new (winston.transports.File)({ filename: 'app.log'})
//     ]
// })

const myStream = {
    write: (text) => {
        logger.info(text)
    }
}
app.use(morgan('combined', { stream: myStream }));
};
