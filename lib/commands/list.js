// external
import chalk from 'chalk'
import Shroud from 'shroud'

// lib
import Command from '../command'

let list = new Map()

list.set('name', 'list')
list.set('usage', '<ls | list> [options]')
list.set('options', [])
list.set('command', command)

const command = async function (args) {
  const shroud = Shroud()
  const secrets = await shroud.init()
 
  console.log(`> ${secrets.length} secrets found`)
  secrets.forEach(s => console.log(s)) 
}

export default new Command(...list)
