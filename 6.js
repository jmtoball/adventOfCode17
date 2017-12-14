'use strict'
import { readInput } from './input'

function cycle (input) {
  let results = []
  while (!results.find((x) => x === input.join(','))) {
    results = results.concat([input.join(',')])
    const maxBlock = Math.max.apply(null, input)
    const maxPos = input.indexOf(maxBlock)
    input[maxPos] = 0
    let remainder = maxBlock
    let idx = maxPos
    while (remainder > 0) {
      idx = (idx + 1) % input.length
      remainder--
      input[idx] += 1
    }
  }
  return results
}

readInput().then((raw) => {
  let input = raw.split(/\s+/).map((x) => parseInt(x))
  let cycled = cycle(input)
  console.log('cycle after:', cycled.length)
  console.log('cycle size:', cycled.length - cycled.indexOf(input.join(',')))
})
