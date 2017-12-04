'use strict'
import { readInput } from './input'

function sumDigits (input) {
  let sum = 0;
  const numbers = input.split('').map((x) => parseInt(x))
  for (let idx = 0; idx < numbers.length; idx += 1) {
    if (numbers[idx] == numbers[(idx + 1) % numbers.length]) sum += numbers[idx]
  }
  console.log("output:", sum)
}

readInput().then(sumDigits)
