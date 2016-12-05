import add from './add'
import remove from './remove'
import list from './list'
import show from './show'
import init from './init'

const commands = new Map([
  ['add', add],
  ['remove', remove],
  ['list', list],
  ['show', show],
  ['init', init]
])

export default commands
