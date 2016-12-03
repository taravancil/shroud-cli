import {bold} from 'chalk'

export default class Command {
  constructor (...args) {
    const [name, usage, examples, command] = args
  }

  help () {
    return `${bold('shroud-cli ' + this.name)}\n${this.usage}\nOptions:\n` +
           `${this.options}\nExamples:\n${this.examples}`
  }

  run () {
    this.command()
  }
}
