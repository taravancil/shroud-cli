// external
import { bold } from "chalk";

export default class Command {
  constructor(args) {
    Object.assign(this, args);
  }

  help() {
    console.log(`${bold("shroud-cli " + this.name)}`);
    console.log(`${this.usage}\n\nOptions:\n${this.options}`);

    console.log("Examples:\n");
    this.examples.forEach(example => console.log(example));
  }

  run(args) {
    this.command(args);
  }
}
