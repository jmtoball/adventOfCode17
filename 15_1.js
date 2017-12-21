'use strict'
import { readInput } from './input'

const factorA = 16807
const factorB = 48271
const mod = 2147483647

function binpairs (a, b) {
  let pairCount = 0
  let currA = a
  let currB = b
  for (let rep = 0; rep < 40 * 1000000; rep++) {
    currA = currA * factorA % mod
    currB = currB * factorB % mod
    if (currA << 16 === currB << 16) {
      pairCount += 1
    }
  }
  return pairCount
}

readInput().then((input) => {
  console.log('output:', binpairs(...input.match(/(\d+)/g)))
})
