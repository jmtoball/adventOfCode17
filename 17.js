'use strict'
import { readInput } from './input'

function spin (stepCount, maxNum) {
  let values = [0]
  let pos = 0
  for (let rep = 1; rep <= maxNum; rep++) {
    pos = (pos + stepCount) % values.length
    values = values.slice(0, pos + 1).concat([rep]).concat(values.slice(pos + 1))
    pos = values.indexOf(rep)
  }
  return values
}

function spin2 (stepCount, maxNum) {
  let pos = 0
  let length = 1
  let value = null
  for (let rep = 1; rep <= maxNum; rep++) {
    pos = (pos + stepCount) % length++
    pos += 1
    if (pos === 1) value = rep
  }
  return value
}

let result = spin(356, 2017)
console.log('part 1:', result[result.indexOf(2017) + 1])

console.log('part 2:', spin2(356, 50 * 1000 * 1000))
