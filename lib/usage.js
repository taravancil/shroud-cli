// external
import {bold} from 'chalk'

import commands from './commands/index'

export default function () {
  console.log(bold('Usage:\n'))
  console.log('shroud-cli <command> [options]\n')

  // TODO what's up with this? -tbv
  const _commands = commands._c

  let examples = []
  for (const [name, command] of _commands) {
    console.log(`${name}:\t${command.usage}`)
    examples = examples.concat(command.examples)
  }

  console.log(bold('\nExamples:\n'))
  examples.forEach(example => console.log(example))
}
