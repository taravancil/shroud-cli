import * as commands from './commands/index'

export default function () {
  console.log(commands)
  console.log('Usage:\n')

  console.log('shroud-cli <command> [options]')

  for (const command in commands) {
    console.log(`${command}\t${command.usage}`)
  }
}