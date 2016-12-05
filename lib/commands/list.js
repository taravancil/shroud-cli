// external
import Shroud from 'shroud'

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

  const secrets = await shroud.list()

  console.log(`> ${secrets.length} secrets found`)
  secrets.forEach(s => console.log(`- ${s}`))
}

const list = {
  name: 'list',
  usage: '<ls | list> [options]',
  options: [],
  command: command
}

export default new Command(list)
