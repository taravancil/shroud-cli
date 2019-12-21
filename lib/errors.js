const chalk = require("chalk");

const ERROR_PREFIX = chalk.red("Error: ");

module.exports = {
  NOT_INITIALIZED: `${ERROR_PREFIX}shroud not initialized\nRun shroud-cli init`,
  INVALID_PASSWORD_NAME: "Enter a name for your password",
};
