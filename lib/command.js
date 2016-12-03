import {bold} from 'chalk'

export default class Command {
  constructor (args) {
    [this.name, this.usage, this.options, this.command] = [...args.values()]
  }

  help () {
    return `${bold('shroud-cli ' + this.name)}\n${this.usage}\nOptions:\n` +
           `${this.options}\nExamples:\n${this.examples}`
  }

  run () {
    this.command()
  }
}
