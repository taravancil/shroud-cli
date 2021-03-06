#!/usr/bin/env node

const minimist = require("minimist");
const commands = require("./commands/index");
const usage = require("./usage");

const argv = minimist(process.argv.slice(2));

const aliases = new Map([
  ["ls", "list"],
  ["rm", "remove"],
]);

// default command is help
let command = argv._[0] || "help";

if (command === "help") {
  usage();
  process.exit();
}

// if the command is an alias, redefine it
if (aliases.has(command)) {
  command = aliases.get(command);
}

if (!commands.has(command) && command !== "help") {
  console.log(red(`Error: ${command} is not a valid command`));
  usage();
  process.exit(1);
}

command = commands.get(command);

if (argv.help || argv.h) {
  command.help();
  process.exit(0);
}

command.run(argv);
