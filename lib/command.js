// external
import {bold} from 'chalk'

export default class Command {
  constructor (args) {
    Object.assign(this, args)
  }

  help () {
     console.log(`${bold('shroud-cli ' + this.name)}\n${this.usage}\nOptions:\n` +
                 `${this.options}\nExamples:\n${this.examples}`)
  }

  run (args) {
    this.command(args)
  }
}
