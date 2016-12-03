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

export default new Command(list)
