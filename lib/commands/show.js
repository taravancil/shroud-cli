// external
const Shroud = require("shroud");
const inquirer = require("inquirer");
const chalk = require("chalk");
const copyPaste = require("copy-paste");
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
  const category = args.category || args.c || null;
  let password = args.password || args.p;

  if (!password) {
    password = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "Enter your master password:",
      },
    ]);
  }

  try {
    const decrypted = await shroud.reveal(
      password.password,
      secretName,
      category,
    );
    await copyPaste.copy(decrypted);

    console.log(chalk.green("Success!"));
    console.log(
      `Password for ${secretName}: ${decrypted} ${chalk.bold(
        "(copied to clipboard)",
      )}`,
    );
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
};

const show = {
  name: "show",
  usage: "<show> secret-name [options]",
  examples: [
    `Show a secret\t\t\t${chalk.blue("shroud show github.com")}`,
    `Show a secret from category\t${chalk.blue(
      "shroud show --category github.com",
    )}`,
  ],
  options: [],
  command: command,
};

module.exports = new Command(show);
