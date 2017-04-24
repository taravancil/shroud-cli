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
    console.error(red('Error: you must enter a name for the password'))
    // TODO print usage
    process.exit(1)
  }
  const category = args.category || args.c || null

  // prompt for the password
  const password = await inquirer.prompt([
    { type: 'password',
      name: 'password',
      message: `Enter the password for ${secretName}`
    }])

  const confirmPassword = await inquirer.prompt([
    { type: 'password',
      name: 'password',
      message: `Confirm the password for ${secretName}`
    }])

  if (password.password !== confirmPassword.password) {
    console.error(red('Error: passwords don\'t match'))
    process.exit(1)
  }

  try {
    await shroud.add({
      name: secretName,
      secret: password.password,
      category: category
    })
    console.log(green(`Password added for ${secretName}`))
  } catch (err) {
    console.error(red(`Error: ${err.message}`))
    process.exit(1)
  }
}

const add = {
  name: 'add',
  usage: '<add> secret-name [options]',
  options: [],
  examples: [
    `Add a secret to the vault\t\t${blue('shroud add github.com')}`,
    `Add a secret to the vault in category\t${blue('shroud add github.com --category work')}`
  ],
  command: command
}

export default new Command(add)
