import readline from 'readline'

function readInput () {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    let lines = []
    rl.setPrompt('input: ')
    rl.prompt()
    rl.on('line', (line) => {
      if (line.trim().length === 0) {
        resolve(lines.join('\n'))
        rl.close()
      } else {
        lines.push(line)
      }
    })
  })
}

export { readInput }
