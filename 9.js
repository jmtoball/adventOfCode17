'use strict'
import { readInput } from './input'

function count (input) {
  let sum = 0
  let depth = 1
  let garbage = false
  let negated = false
  let garbageCount = 0
  input.split('').forEach((char, idx) => {
    if (char === '!' || negated) {
      negated = !negated
    } else if (garbage) {
      if (char === '>') {
        garbage = false
      } else {
        garbageCount += 1
      }
    } else if (char === '<') {
      garbage = true
    } else if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      sum += depth
    }
  })
  console.log('cleaned', garbageCount, 'characters garbage')
  return sum
}

readInput().then((input) => {
  console.log('count', count(input))
})
