// external
import Shroud from 'shroud'
import {blue} from 'chalk'

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

  const category = args.category || args.c || null
  const pattern = args.pattern || args.p || null
  const secrets = await shroud.list(category, pattern)

  let count = 0

  for (const category in secrets) {
    const secretNames = secrets[category]
    count += secretNames.length

    if (category !== 'uncategorized') {
      console.log(`/${category}`)
      printSecrets(secretNames, true)
    } else {
      printSecrets(secretNames)
    }
    console.log('')
  }
  console.log(`${count} secrets found`)
}

function printSecrets (secretNames, indent) {
  const spaces = indent ? '  ' : ''
  secretNames.forEach(s => console.log(`${spaces}- ${s}`))
}

const list = {
  name: 'list',
  usage: '<ls | list> [options]',
  examples: [
    `List all of the secrets in the vault\t ${blue('shroud ls')}`,
    `List secrets that match a pattern\t ${blue('shroud ls --pattern github')}`,
    `List all the secrets in a category\t ${blue('shroud ls --category work')}`
  ],
  options: [],
  command: command
}

export default new Command(list)
