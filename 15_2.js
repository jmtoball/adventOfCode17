'use strict'
import { readInput } from './input'

const factorA = 16807
const factorB = 48271
const multipleA = 4
const multipleB = 8
const mod = 2147483647

function * gen (start, factor, multipleOf) {
  let curr = start
  while (true) {
    curr = curr * factor % mod
    if (curr % multipleOf === 0) {
      yield curr
    }
  }
}

function binpairs (a, b) {
  let pairCount = 0
  let genA = gen(a, factorA, multipleA)
  let genB = gen(b, factorB, multipleB)
  for (let rep = 0; rep < 5 * 1000000; rep++) {
    if (genA.next().value << 16 === genB.next().value << 16) {
      pairCount += 1
    }
  }
  return pairCount
}

readInput().then((input) => {
  console.log('output:', binpairs(...input.match(/(\d+)/g)))
})
