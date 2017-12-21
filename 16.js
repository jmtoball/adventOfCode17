'use strict'
import { readInput } from './input'

let programs = 'abcdefghijklmnop'

function spin (n, positions) {
  return positions.slice(-n).concat(positions.slice(0, -n))
}

function swap (posA, posB, positions) {
  let tmp = positions[posA]
  positions[posA] = positions[posB]
  positions[posB] = tmp
  return positions
}

function apply (move, positions) {
  let command = move[0]
  let args = move.slice(1).split('/')
  switch (command) {
    case 's':
      positions = spin(parseInt(args[0]), positions)
      break
    case 'p':
      positions = swap(
        positions.indexOf(args[0]),
        positions.indexOf(args[1]),
        positions
      )
      break
    case 'x':
      positions = swap(
        parseInt(args[1]),
        parseInt(args[0]),
        positions
      )
      break
  }
  return positions
}

function dance (moves, positions) {
  moves.forEach(function (move) {
    positions = apply(move, positions)
  })
  return positions
}

const fs = require('fs')
fs.readFile('16.txt', 'utf-8', (err, input) => {
  if (err) {
    console.error(err)
    return
  }
  let results = []
  let positions = programs.split('')
  while (true) {
    positions = dance(input.split(','), positions)
    if (results.includes(positions.join(''))) {
      break
    }
    results.push(positions.join(''))
  }
  console.log(results)
  console.log('positions after first dance', results[0])
  console.log('duplicate at iteration', results.length)
  console.log('positions after a billion dances', results[(1000000000 - 1) % results.length])
})
