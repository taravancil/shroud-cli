const Shroud = require("shroud");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Command = require("../command");
const errors = require("../errors");

async function command(args) {
  const prompt = async (type, name, message) => {
    return (await inquirer.prompt([{ type, name, message }]))[name];
  };

  let shroud;
  try {
    shroud = Shroud();
  } catch (err) {
    console.error(errors.NOT_INITIALIZED);
    process.exit(1);
  }

  let secretName = args ? args._[1] : null;
  secretName =
    secretName ||
    (await prompt("text", "secretName", "Enter a name for your password"));
  console.log(secretName);
  if (!secretName) {
    // TODO: this usage message isn't all that helpful in this flow, use a more relevant error message
    console.log(this.usage);
    process.exit(1);
  }

  const category = args.category || args.c || null;

  const password = await prompt(
    "password",
    "password",
    `Enter the password for ${secretName}`,
  );

  const confirmPassword = await prompt(
    "password",
    "confirmPassword",
    `Confirm the password for ${secretName}`,
  );

  if (password !== confirmPassword) {
    console.error(chalk.red("Error: passwords don't match"));
    process.exit(1);
  }

  try {
    await shroud.add({
      name: secretName,
      secret: password,
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
