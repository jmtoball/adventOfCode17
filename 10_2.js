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

function chunks (list, chunkSize) {
  let chunks = []
  for (let i = 0; i < list.length; i += chunkSize) {
    chunks.push(list.slice(i, i + chunkSize))
  }
  return chunks
}

function toHex (x) {
  const hex = x.toString(16)
  return '00'.substring(0, 2 - hex.length) + hex
}

function hash (list) {
  return chunks(list, 16).map((chunk) => {
    return chunk.reduce((tot, x) => {
      return tot ^ x
    }, 0)
  }).map(toHex).join('')
}

function shuffle (list, lengths) {
  let idx = 0
  let skip = 0
  for (let i = 0; i < 64; i++) {
    lengths.forEach((length) => {
      reverse(list, idx, length)
      idx = (idx + length + skip) % list.length
      skip += 1
    })
  }
}

readInput().then((input) => {
  let list = new Array(256).fill(0).map((x, i) => i)
  const lengths = input.trim().split('').map((x) => {
    return x.charCodeAt(0)
  }).concat([17, 31, 73, 47, 23])
  shuffle(list, lengths)
  console.log('final hash:', hash(list))
})
