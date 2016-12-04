// external
import Shroud from 'shroud'
import inquirer from 'inquirer'
import {red} from 'chalk'

// lib
import Command from '../command'

const command = async function (args) {
  let shroud
  try {
    shroud = Shroud()
  } catch (err) {
    console.error(red('Error: not initialized. Run shroud init'))
    process.exit(1)
  }

  const secretName = args._[1]
  const category = args.category || null

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
    await shroud.add(secretName, category, password.password)
  } catch (err) {
    console.error(red(`Error: ${err.message}`))
    process.exit(1)
  }
}

const add = {
  name: 'add',
  usage: '<add> secret-name [options]',
  options: [],
  command: command
}

export default new Command(add)
