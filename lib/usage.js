// external
import {bold} from 'chalk'

import commands from './commands/index'

export default function () {
  console.log(bold('Usage:'))
  console.log('shroud-cli <command> [options]\n')

  // TODO what's up with this? -tbv
  const _commands = commands._c

  for (const [name, command] of _commands) {
    console.log(`${name}:\t${command.usage}`)
  }
}
