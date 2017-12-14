'use strict'
import { readInput } from './input'

function sides (input) {
  let pos = { 0: 0, 1: 0 }
  let sidelength = 1
  let sidesteps = 0
  let sidesofsize = 0
  for (let step = 1; step < input; step += 1) {
    sidesteps += 1
    pos[sidesofsize] += 1
    if (sidesteps === sidelength) {
      sidesofsize += 1
      sidesteps = 0
    }
    if (sidesofsize === 2) {
      sidesofsize = 0
      sidelength += 1
      pos = {0: -Math.floor(sidelength / 2), 1: -Math.floor(sidelength / 2)}
    }
  }
  return Math.abs(pos[0]) + Math.abs(pos[1])
}

readInput().then((input) => {
  console.log('output:', sides(parseInt(input)))
})
