'use strict'
import { readInput } from './input'

function stepsToExit (jumps, threshold) {
  let steps = 0
  let pos = 0
  while (pos < jumps.length && pos >= 0) {
    const offset = jumps[pos]
    jumps[pos] += offset >= threshold ? -1 : 1
    pos += offset
    steps += 1
  }
  return steps
}

readInput().then((input) => {
  console.log(
    'output 1:',
    stepsToExit(input.split('\n').map(x => parseInt(x)))
  )
  console.log(
    'output 2:',
    stepsToExit(input.split('\n').map(x => parseInt(x)), 3)
  )
})
