const pack = require('./package.json')
console.log([`Clead BD`, `Edition: ${pack.version}`, ``].join('\n'))

const instructions = {
  get: () => console.log('get'),
  select: () => console.log('select'),
  insert: () => console.log('insert'),
  update: () => console.log('update'),
  delete: () => console.log('delete'),
  exit: () => process.exit()
}

process.stdin.on('data', (input) => {
  const [i, ...params] = input.toString().trim().split(' ')
  const instruction = instructions[i]

  if (i === '') {
  } else if (instruction === undefined) {
    console.error(new Error('Not found.'))
    process.exit()
  } else {
    instruction(...params)
  }
})
