const Shroud = require("shroud");
const chalk = require("chalk");

const Command = require("../command");
const errors = require("../errors");

const command = async function(args) {
  let shroud;
  try {
    shroud = Shroud();
  } catch (err) {
    console.error(errors.NOT_INITIALIZED);
    process.exit();
  }

  const secretName = args._[1];
  if (!secretName) {
    console.error(
      chalk.red("Error: you must specify the name of the password to remove"),
    );
    // TODO show usage
    process.exit(1);
  }

  const category = args.category || args.c || null;

  try {
    await shroud.remove(secretName, category);
    console.log(chalk.green("Success!"));
    console.log(`The password for ${secretName} was removed`);
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
  }
};

const remove = {
  name: "remove",
  usage: "<rm | remove> secret-name [options]",
  examples: [
    `Remove a secret\t\t\t${chalk.blue("shroud rm github.com")}`,
    `Remove a secret from category\t${chalk.blue(
      "shroud rm github.com --category work",
    )}`,
  ],
  options: [],
  command: command,
};

module.exports = new Command(remove);
