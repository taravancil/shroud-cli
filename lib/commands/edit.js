const Shroud = require("shroud");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Command = require("../command");
const errors = require("../errors");

const command = async function(args) {
  let shroud;
  try {
    shroud = Shroud();
  } catch (err) {
    console.error(errors.NOT_INITIALIZED);
    process.exit(1);
  }

  const secretName = args._[1];
  if (!secretName) {
    console.error(chalk.red("Error: you must specify a secret to edit"));
    // TODO print usage
    process.exit(1);
  }
  const category = args.category || args.c || null;
  // prompt for the password
  const newPassword = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: `Enter a new password for ${secretName}`,
    },
  ]);

  const confirmNewPassword = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: `Confirm the new password for ${secretName}`,
    },
  ]);

  if (newPassword.password !== confirmNewPassword.password) {
    console.error(chalk.red("Error: passwords don't match"));
    process.exit(1);
  }

  try {
    await shroud.update(secretName, category, newPassword.password);
    console.log(chalk.green(`Password updated for ${secretName}`));
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
};

const edit = {
  name: "edit",
  usage: "<edit> secret-name [options]",
  options: [],
  examples: [
    `Update a secret in the work category\t\t ${chalk.blue(
      "shroud edit --category work github.com",
    )}`,
  ],
  command: command,
};

module.exports = new Command(edit);
