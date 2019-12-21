const add = require("./add");
const remove = require("./remove");
const list = require("./list");
const show = require("./show");
const init = require("./init");
const edit = require("./edit");

const commands = new Map([
  ["add", add],
  ["remove", remove],
  ["list", list],
  ["show", show],
  ["init", init],
  ["edit", edit],
]);

module.exports = commands;
