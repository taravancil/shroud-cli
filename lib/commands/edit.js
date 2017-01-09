// external
import Shroud from 'shroud'
import inquirer from 'inquirer'
import {red, green, blue} from 'chalk'

// lib
import Command from '../command'
import {NOT_INITIALIZED} from '../error'

const command = async function (args) {
  let shroud
  try {
    shroud = Shroud()
  } catch (err) {
    console.error(NOT_INITIALIZED)
    process.exit(1)
  }

  const secretName = args._[1]
  if (!secretName) {
    console.error(red('Error: you must specify a secret to edit'))
    // TODO print usage
    process.exit(1)
  }
  const category = args.category || args.c || null
  let masterPassword = args.password || args.p

  if (!masterPassword) {
    masterPassword = await inquirer.prompt([
      { type: 'password',
        name: 'password',
        message: 'Enter your master password:'
      }])
  }

  // prompt for the password
  const newPassword = await inquirer.prompt([
    { type: 'password',
      name: 'password',
      message: `Enter a new password for ${secretName}`
    }])

  const confirmNewPassword = await inquirer.prompt([
    { type: 'password',
      name: 'password',
      message: `Confirm the new password for ${secretName}`
    }])

  if (newPassword.password !== confirmNewPassword.password) {
    console.error(red('Error: passwords don\'t match'))
    process.exit(1)
  }

  try {
    await shroud.update(secretName, category, newPassword.password)
    console.log(green(`Password updated for ${secretName}`))
  } catch (err) {
    console.error(red(`Error: ${err.message}`))
    process.exit(1)
  }
}

const edit = {
  name: 'edit',
  usage: '<edit> secret-name [options]',
  options: [],
  examples: [
    `Update a secret in the work category\t\t ${blue('shroud edit --category work github.com')}`
  ],
  command: command
}

export default new Command(edit)
