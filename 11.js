'use strict'
import { readInput } from './input'

function distance (steps) {
  let positions = []
  let xPos = 0
  let yPos = 0
  steps.forEach((step) => {
    switch (step) {
      case 's':
        yPos += 2
        break
      case 'n':
        yPos -= 2
        break
      case 'se':
        yPos += 1
        xPos += 1
        break
      case 'ne':
        yPos -= 1
        xPos += 1
        break
      case 'sw':
        yPos += 1
        xPos -= 1
        break
      case 'nw':
        yPos -= 1
        xPos -= 1
        break
    }
    positions.push((Math.abs(yPos) - Math.abs(xPos)) / 2 + Math.abs(xPos))
  })
  console.log('furthest distance', Math.max.apply(null, positions))
  return positions.slice(-1)
}

readInput().then((input) => {
  console.log('output:', distance(input.split(',')))
})
