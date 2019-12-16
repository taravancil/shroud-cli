// external
import Shroud from "shroud";
import { green, red, blue } from "chalk";

// lib
import Command from "../command";
import { NOT_INITIALIZED } from "../error";

const command = async function(args) {
  let shroud;
  try {
    shroud = Shroud();
  } catch (err) {
    console.error(NOT_INITIALIZED);
    process.exit();
  }

  const secretName = args._[1];
  if (!secretName) {
    console.error(
      red("Error: you must specify the name of the password to remove"),
    );
    // TODO show usage
    process.exit(1);
  }

  const category = args.category || args.c || null;

  try {
    await shroud.remove(secretName, category);
    console.log(green("Success!"));
    console.log(`The password for ${secretName} was removed`);
  } catch (err) {
    console.error(red(`Error: ${err.message}`));
  }
};

const remove = {
  name: "remove",
  usage: "<rm | remove> secret-name [options]",
  examples: [
    `Remove a secret\t\t\t${blue("shroud rm github.com")}`,
    `Remove a secret from category\t${blue(
      "shroud rm github.com --category work",
    )}`,
  ],
  options: [],
  command: command,
};

export default new Command(remove);
