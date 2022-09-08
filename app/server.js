const net = require('net')

const res = ({ type = 'text/html', body = '' }) => `HTTP/1.1 200 OK
Content-Type: ${type}
Content-Length: ${body.length}

${body} 
`

class AppRequest {
  request = ''

  constructor(request) {
    this.request = request
  }

  get url() {
    return ''
  }

  get params() {
    return {}
  }

  get query() {
    return {}
  }

  get headers() {
    return {}
  }

  get body() {
    return {}
  }
}

class AppResponse {

  status = 200
  data = null
  error = ''

  constructor() {
  }

  json(obj = {}) {
    this.data = null

    Object.keys(obj)
      .map((key) => this.data[key] = obj[key], this)

    return this
  }

  text(obj = '') {
    this.data = obj.toString()

    return this
  }

  file(file = {}) {
    this.data = Buffer.from([file])

    return this
  }

  toJSON() {
    const { status, data, error = null } = this

    return { status, data, error }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

const helper = (req, res) => {
}

net.createServer((socket) =>
  socket.on('data', (data) =>
    socket.write(helper(new AppRequest(data.toString()), new AppResponse()))
  )
)

net.listen(process.env.HTTP_PORT, () => console.log(`listening ${process.env.HTTP_PORT}`))

