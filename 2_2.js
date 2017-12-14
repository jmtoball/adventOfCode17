'use strict'
import { readInput } from './input'

function checksum (input) {
  const lines = input.split('\n')
  return lines.reduce((checksum, line) => {
    const numbers = line.split(/\s+/).map((x) => parseInt(x)).sort((x, y) => x - y)
    return checksum + numbers.map((x, ix) => {
      let y = numbers.find((n, iy) => iy > ix && !(n % x))
      if (y) return y / x
    }).filter((n) => n)[0]
  }, 0)
}

readInput().then((input) => {
  console.log('output:', checksum(input))
})
