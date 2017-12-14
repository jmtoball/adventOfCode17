'use strict'
import { readInput } from './input'

function * layerPositions (layers) {
  let layerPositions = new Array(layers.length).fill(-1)
  while (true) {
    layerPositions.forEach((p, i) => {
      let weight = layers[i]
      if (!weight) return -1
      if (p === weight - 1) { p = -weight + 1 }
      layerPositions[i] = p + 1
    })
    yield layerPositions
  }
}

function passFirewall (layers, delay) {
  let severity = 0
  let scanners = layerPositions(layers)
  for (let pos = -delay; pos <= layers.length; pos += 1) {
    let positions = scanners.next().value
    if (positions[pos] === 0) {
      severity += pos * layers[pos]
    }
  }
  return severity
}

function findDelay (layers) {
  let scannerPositions = layerPositions(layers)
  let delay = 0
  let candidates = {}
  while (true) {
    candidates[delay] = 0
    let scannerPosition = scannerPositions.next().value
    for (let candidate in candidates) {
      let candidatePosition = candidates[candidate]
      if (candidatePosition === layers.length) return candidate
      if (scannerPosition[candidatePosition] === 0) {
        delete candidates[candidate]
        continue
      }
      candidates[candidate] += 1
    }
    delay += 1
  }
}

readInput().then((input) => {
  const layers = input.split('\n').reduce((layers, line) => {
    let idx, weight
    const match = line.match(/(\d+): (\d+)/)
    idx = parseInt(match[1])
    weight = parseInt(match[2])
    while (layers.length < idx) {
      layers[layers.length] = 0
    }
    layers[idx] = weight
    return layers
  }, [])
  console.log('severity:', passFirewall(layers, 0))
  console.log('safe delay:', findDelay(layers))
}).catch(e => console.error(e))
