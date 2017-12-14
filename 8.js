'use strict'
import { readInput } from './input'

let registers = {}

function lookup (register) {
  return registers[register] || 0
}

function check (register, operator, value) {
  const comparisonValue = lookup(register)
  return eval(`${comparisonValue} ${operator} ${value}`)
}

function apply (register, operator, value) {
  switch (operator) {
    case 'inc':
      registers[register] = lookup(register) + parseInt(value)
      break
    case 'dec':
      registers[register] = lookup(register) - parseInt(value)
      break
  }
}

function run (instruction) {
  const match = instruction.match(/(\w+) (inc|dec) (-?\d+) if (\w+) ([><=!]{1,2}) (-?\d+)/)
  let register, operator, value, checkRegister, checkOperator, checkValue
  [register, operator, value, checkRegister, checkOperator, checkValue] = match.slice(1)
  if (check(checkRegister, checkOperator, checkValue)) {
    apply(register, operator, value)
  }
}

readInput().then((input) => {
  let instructions = input.split('\n')
  let max = 0
  instructions.forEach(instruction => {
    run(instruction)
    max = Math.max(max, ...Object.values(registers))
  })
  console.log('overall max', max)
  console.log('max:', Math.max(...Object.values(registers)))
})
