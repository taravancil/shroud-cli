const Shroud = require("shroud");
const inquirer = require("inquirer");
const chalk = require("chalk");
const Command = require("../command");

async function command(args) {
  try {
    // if this doesn't throw, shroud is already initialized
    Shroud();
    console.log(`${chalk.green("✓")} shroud is already initialized`);
  } catch (err) {
    const password = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "Enter a strong master password:",
      },
    ]);

    const confirmPassword = await inquirer.prompt([
      {
        type: "password",
        name: "password",
        message: "Confirm your master password:",
      },
    ]);

    if (password.password !== confirmPassword.password) {
      console.error(chalk.red("Error: Passwords don't match"));
      process.exit(1);
    }

    console.log("Generating your keys...");
    Shroud({ masterPassword: password.password });
    console.log(chalk.green("Success!"));
  }
}

const init = {
  name: "init",
  usage: "<init>",
  examples: [`Initialize shroud\t${chalk.blue("shroud init")}`],
  options: [],
  command: command,
};

module.exports = new Command(init);
