// external
import Shroud from 'shroud'
import inquirer from 'inquirer'
import {blue, red, green} from 'chalk'

// lib
import Command from '../command'

const command = async function (args) {
  try {
    // if this doesn't throw, shroud is already initialized
    Shroud()
    console.log('shroud is already initialized')
  } catch (err) {
    const password = await inquirer.prompt([
      { type: 'password',
        name: 'password',
        message: 'Enter a strong master password:'
      }])

    const confirmPassword = await inquirer.prompt([
      { type: 'password',
        name: 'password',
        message: 'Confirm your master password:'
      }])

    if (password.password !== confirmPassword.password) {
      console.error(red('Error: Passwords don\'t match'))
      process.exit(1)
    }

    console.log('Generating your keys...')
    Shroud({masterPassword: password.password})
    console.log(green('Success!'))
  }
}

const init = {
  name: 'init',
  usage: '<init>',
  examples: [
    `Initialize shroud\t${blue('shroud init')}`
  ],
  options: [],
  command: command
}

export default new Command(init)
