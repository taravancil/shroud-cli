import add from './add'
import remove from './remove'
import list from './list'
import show from './show'

const commands = new Map([
  ['add', add],
  ['remove', remove],
  ['list', list],
  ['show', show]
])

export default commands
