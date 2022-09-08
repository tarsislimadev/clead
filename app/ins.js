const db = require('./db')

module.exports = {
  get: () => console.log('get'),

  // select id, name, age from people;
  select: (instr) => {
    const [i, ...params] = instr.toString().trim().split(' ')

    const state = params.reduce((prev, cur) => {
      if (prev.before) {
        if (cur === 'from') {
          prev.before = false
        } else {
          prev.columns.push(cur.replace(',', ''))
        }
      } else {
        prev.table = cur.replace(';', '')
      }

      return prev
    }, {
      before: true,
      columns: [],
      table: ''
    })

    const list = db.in(state.table).listJSON()

    if (list.length) console.table(list) 
    else console.log('returning `nothing to see` ')
  },

  // insert into people (name, age) values ('Janaina', '23')
  insert: (instr) => {
    const [i1, i2, ...params] = instr.toString().split(' ')
    const [table, ...params1] = params.map((str) => str.toString().replace(/\W/ig, ''))
    const { names, values } = params1.reduce((prev, cur) => {
      if (prev.before) {
        if (cur === 'values') {
          prev.before = false
        } else {
          prev.names.push(cur.replace(',', ''))
        }
      } else {
        prev.values.push(cur.replace(',', ''))
      }

      return prev
    }, {
      names: [],
      values: [],
      before: true
    })

    const obj = names.reduce((prev, cur, ix) => {
      prev[cur] = values[ix]
      return prev
    }, {})

    db.in(table).new().writeMany(obj)

    console.log({ table, names, values })
  },

  update: () => console.log('update'),

  delete: () => console.log('delete'),

  exit: () => process.exit()
}
