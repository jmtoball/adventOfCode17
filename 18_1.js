'use strict'
import { readInput } from './input'

let registers = {}

function value (operand) {
  if (operand.match(/[a-z]+/)) {
    return registers[operand]
  } else {
    return parseInt(operand)
  }
}

function execute (command, register, operand) {
  switch (command) {
    case 'set':
      registers[register] = value(operand)
      return 1
    case 'add':
      registers[register] += value(operand)
      return 1
    case 'mul':
      registers[register] *= value(operand)
      return 1
    case 'mod':
      registers[register] %= value(operand)
      return 1
    case 'snd':
      registers['snd'] = registers[register]
      return 1
    case 'rcv':
      if (registers[register]) {
        throw new Error(`recovered ${registers['snd']}`)
      }
      return 1
    case 'jgz':
      if (registers[register]) {
        return value(operand)
      }
      return 1
  }
}

function run (instructions) {
  let cursor = 0
  while (cursor < instructions.length) {
    let instruction = instructions[cursor]
    let command, register, operand
    [command, register, operand] = instruction.match(/([a-z]+) ([a-z]) ?(-?\d+|[a-z]+)?/).slice(1)
    cursor += execute(command, register, operand)
  }
}

readInput().then((input) => {
  console.log('output:', run(input.split('\n')))
}, (e) => console.error(e))
