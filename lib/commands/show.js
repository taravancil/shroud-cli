// external
import Shroud from 'shroud'
import inquirer from 'inquirer'
import {bold, red, green} from 'chalk'
import {copy} from 'copy-paste'

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
  const category = args.category || args.c || null
  let password = args.password || args.p

  if (!password) {
    password = await inquirer.prompt([
      { type: 'password',
        name: 'password',
        message: 'Enter your password:'
      }])
  }

  try {
    const decrypted = await shroud.reveal(password.password, secretName, category)
    await copy(decrypted)

    console.log(green('Success!'))
    console.log(`Password for ${secretName}: ${decrypted} ${bold('(copied to clipboard)')}`)
  } catch (err) {
    console.error(red(`Error: ${err.message}`))
    process.exit(1)
  }
}

const show = {
  name: 'show',
  usage: '<show> secret-name [options]',
  options: [],
  command: command
}

export default new Command(show)
