'use strict'
import { readInput } from './input'

function checkPassphrase (passphrase) {
  const words = passphrase.split(' ').sort()
  return words.every((word) => {
    return !words.includes(word, words.indexOf(word) + 1)
  })
}

function check (input) {
  return input.split('\n').filter(checkPassphrase).length
}

readInput().then((input) => {
  console.log('output:', check(input))
})
