const { createLogger, transports, format } = require("winston");

const {
  NODE_ENV='development'
} = process.env;

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "accessibility-app" },
  transports: [
    new transports.File({
      filename: "quick-start-error.log",
      level: "error",
    }),
    new transports.File({ filename: "quick-start-combined.log" }),
  ],
});

if (NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;