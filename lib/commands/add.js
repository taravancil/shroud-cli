const Shroud = require("shroud");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Command = require("../command");
const errors = require("../errors");

async function command(args) {
  const promptPassword = async secretName => {
    return await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: `Enter the password for ${secretName}`,
      },
    ]);
  };

  const promptSecretName = async () => {
    return await inquirer.prompt([
      {
        type: "text",
        name: "secret name",
        message: `Enter a name for your password`,
      },
    ]);
  };

  let shroud;
  try {
    shroud = Shroud();
  } catch (err) {
    console.error(errors.NOT_INITIALIZED);
    process.exit(1);
  }

  const secretName = args ? args._[1] : null;
  if (!secretName) {
    console.log(errors.INVALID_PASSWORD_NAME);
    console.log(this.usage);
    process.exit(1);
  }

  const category = args.category || args.c || null;

  // prompt for the password
  const password = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: `Enter the password for ${secretName}`,
    },
  ]);

  const confirmPassword = await inquirer.prompt([
    {
      type: "password",
      name: "password",
      message: `Confirm the password for ${secretName}`,
    },
  ]);

  if (password.password !== confirmPassword.password) {
    console.error(chalk.red("Error: passwords don't match"));
    process.exit(1);
  }

  try {
    await shroud.add({
      name: secretName,
      secret: password.password,
      category: category,
    });
    console.log(chalk.green(`Password added for ${secretName}`));
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

const add = {
  name: "add",
  usage: "<add> secret-name [options]",
  options: [],
  examples: [
    `Add a secret to the vault\t\t${chalk.blue("shroud add github.com")}`,
    `Add a secret to the vault in category\t${chalk.blue(
      "shroud add github.com --category work",
    )}`,
  ],
  command: command,
};

module.exports = new Command(add);
