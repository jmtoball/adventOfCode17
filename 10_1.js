'use strict'
import { readInput } from './input'

function reverse (list, start, length) {
  for (let idx = 0; idx < length / 2; idx += 1) {
    let posA = (start + idx) % list.length
    let posB = (start + length - 1 - idx) % list.length
    let tmp = list[posB]
    list[posB] = list[posA]
    list[posA] = tmp
  }
}

function hash (list, ops) {
  let idx = 0
  let skip = 0
  ops.forEach((length) => {
    reverse(list, idx, length)
    idx += length + skip
    skip += 1
  })
  return list[0] * list[1]
}

readInput().then((input) => {
  let list = new Array(256).fill(0).map((x, i) => i)
  const lengths = input.split(',').map(x => parseInt(x))
  console.log('output:', hash(list, lengths))
})
