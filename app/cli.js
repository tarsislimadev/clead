const ins = require('./ins')

process.stdin.on('data', (input) => {
  const [i, ...params] = input.toString().trim().split(' ')
  const instr = ins[i]

  if (i === '');
  else if (instr === undefined) {
    console.error(new Error('Not found.'))
    process.exit()
  } else {
    instr([i, ...params].join(' '))
  }
})

process.on('SIGINT', () => ([
  console.info('Exiting...'),
  process.exit()
]))
