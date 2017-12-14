'use strict'
import { readInput } from './input'

function checksum (input) {
  const lines = input.split('\n')
  return lines.reduce((checksum, line) => {
    const numbers = line.split(/\s+/).map((x) => parseInt(x))
    const max = Math.max.apply(null, numbers)
    const min = Math.min.apply(null, numbers)
    return checksum + max - min
  }, 0)
}

readInput().then((input) => {
  console.log('output:', checksum(input))
})
