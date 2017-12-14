
'use strict'
import { readInput } from './input'

function parse (input) {
  const lines = input.split('\n')
  return lines.reduce((map, line) => {
    const match = line.match(/(\d+) <-> ([\d, ]+)/)
    map[match[1]] = match[2].split(', ') || []
    return map
  }, {})
}

function networkOf (node, flatMap, predecessors) {
  if (predecessors.includes(node)) return []
  let results = flatMap[node].map((neighbor) => {
    return networkOf(neighbor, flatMap, predecessors.concat([node]))
  })
  return [node].concat(results.reduce((a, b) => a.concat(b), []))
}

readInput().then((input) => {
  const flatMap = parse(input)
  console.log(
    'group of 0 has',
    new Set(networkOf('0', flatMap, [])).size,
    'members'
  )
  console.log(
    'The total number of groups is',
    new Set(Object.keys(flatMap).map((node) => {
      let group = new Set(networkOf(node, flatMap, []))
      return group.toJSON().sort().join(':')
    })).size
  )
})
