// external
const chalk = require("chalk");

class Command {
  constructor(args) {
    Object.assign(this, args);
  }

  help() {
    console.log(`${chalk.bold("shroud-cli " + this.name)}`);
    console.log(`${this.usage}\n\nOptions:\n${this.options}`);

    console.log("Examples:\n");
    this.examples.forEach(example => console.log(example));
  }

  run(args) {
    this.command(args);
  }
}

module.exports = Command;
