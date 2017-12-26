'use strict'
import { readInput } from './input'

let registers = {0: {p: 0}, 1: {p: 1}}
let queue = {0: [], 1: []}
let lock = {0: false, 1: false}
let sendCount = {0: 0, 1: 0}

function value (id, operand) {
  if (operand.match(/[a-z]+/)) {
    return registers[id][operand]
  } else {
    return parseInt(operand)
  }
}

function execute (id, command, register, operand) {
  switch (command) {
    case 'set':
      registers[id][register] = value(id, operand)
      return 1
    case 'add':
      registers[id][register] += value(id, operand)
      return 1
    case 'mul':
      registers[id][register] *= value(id, operand)
      return 1
    case 'mod':
      registers[id][register] %= value(id, operand)
      return 1
    case 'snd':
      sendCount[id] += 1
      queue[(id + 1) % 2].push(value(id, register))
      return 1
    case 'rcv':
      if (!queue[0].length && !queue[1].length && lock[0] && lock[1]) {
        throw new Error(`deadlock`)
      } else if (queue[id].length) {
        lock[id] = false
        registers[id][register] = queue[id][0]
        queue[id] = queue[id].slice(1)
        return 1
      } else {
        lock[id] = true
        return 0
      }
    case 'jgz':
      if (value(id, register) > 0) {
        return value(id, operand)
      }
      return 1
  }
}

function run (instructions) {
  let cursors = {0: 0, 1: 0}
  while (cursors[0] < instructions.length && cursors[1] < instructions.length) {
    [0, 1].forEach(function (id) {
      let instruction = instructions[cursors[id]]
      let command, register, operand
      [command, register, operand] = instruction.split(' ')
      cursors[id] += execute(id, command, register, operand)
      // console.log(id, '::', command, register, operand || '', '=>', registers[id][register])
      // console.log(id, registers[id], queue[id])
    })
  }
}

readInput().then((input) => {
  let instructions = input.split('\n')
  try {
    run(instructions)
  } finally {
    console.log('sendCounts', sendCount)
  }
}, (e) => console.error(e))
