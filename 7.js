'use strict'
import { readInput } from './input'

function parse (input) {
  const lines = input.split('\n')
  return lines.reduce((map, line) => {
    const match = line.match(/(\w+) \((\d+)\)( -> ([\w, ]+))?/)
    map[match[1]] = {
      weight: parseInt(match[2]),
      children: (match[4] && match[4].split(', ')) || []
    }
    return map
  }, {})
}

function tree (flatMap, nodes) {
  return nodes.reduce((subtree, node) => {
    subtree[node] = tree(flatMap, flatMap[node].children)
    return subtree
  }, {})
}

function weight (flatMap, tree) {
  return Object.keys(tree).map(key => {
    return flatMap[key].weight + weight(flatMap, tree[key])
  }).reduce((a, b) => { return a + b }, 0)
}

function findImbalance (flatMap, tree) {
  let weights = Object.keys(tree).reduce((weights, key) => {
    weights[key] = flatMap[key].weight + weight(flatMap, tree[key])
    return weights
  }, {})
  let keys = Object.keys(weights)
  let values = Object.values(weights)
  if (keys.length > 1) {
    let outsider = keys.filter((k) => {
      return values.indexOf(weights[k]) === values.lastIndexOf(weights[k])
    })[0]
    if (outsider && !findImbalance(flatMap, tree[outsider])) {
      return [outsider, flatMap[outsider].weight - (Math.max(...values) - Math.min(...values))]
    } else if (outsider) {
      return findImbalance(flatMap, tree[outsider])
    }
  } else if (keys.length === 1) {
    return findImbalance(flatMap, tree[Object.keys(tree)[0]])
  } else {
    return false
  }
}

readInput().then((input) => {
  let flatMap = parse(input)
  let rootNodes = Object.keys(flatMap)
  let largestTree = rootNodes.map((rootNode) => {
    return { node: rootNode, weight: weight(flatMap, tree(flatMap, [rootNode])) }
  }).sort((a, b) => b.weight - a.weight)[0]
  console.log('largest tree', largestTree.node)
  console.log('imbalance:', findImbalance(flatMap, tree(flatMap, [largestTree.node])))
}).catch(e => console.error(e))
