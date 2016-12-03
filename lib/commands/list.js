// external
import chalk from 'chalk'
import Shroud from 'shroud'

// lib
import Command from '../command'

const command = async function (args) {
  const shroud = Shroud()
  const secrets = await shroud.list()

  console.log(`> ${secrets.length} secrets found`)
  secrets.forEach(s => console.log(`- ${s}`))
}

let list = new Map()

list.set('name', 'list')
list.set('usage', '<ls | list> [options]')
list.set('options', [])
list.set('command', command)

export default new Command(list)
