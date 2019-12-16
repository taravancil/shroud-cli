import add from "./add";
import remove from "./remove";
import list from "./list";
import show from "./show";
import init from "./init";
import edit from "./edit";

const commands = new Map([
  ["add", add],
  ["remove", remove],
  ["list", list],
  ["show", show],
  ["init", init],
  ["edit", edit],
]);

export default commands;
