const chalk = require("chalk");
const commands = require("./commands/index");

function usage() {
  console.log(chalk.bold("USAGE"));
  console.log("shroud-cli <command> [options]\n");

  let examples = [];
  for (const [name, command] of commands) {
    console.log(`${name}:\t${command.usage}`);
    examples = examples.concat(command.examples);
  }
}

module.exports = usage;
