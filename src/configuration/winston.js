const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: process.env.logLevel || "crit",
  format: format.combine(
    format.splat(),
    format.timestamp({
      format: process.env.timestampFormat,
    }),
    format.printf(
      (info) => `[${info.timestamp}]:[${info.level}] ${info.message}`
    )
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
