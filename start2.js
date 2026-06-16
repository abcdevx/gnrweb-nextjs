const http = require('http')
const port = process.env.PORT || 3000

let next
try {
  next = require('next')
} catch(e) {
  http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('FAIL: require next\n' + e.message + '\n' + e.stack)
  }).listen(port)
  return
}

const app = next({ dev: false })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    http.createServer((req, res) => {
      handle(req, res).catch((e) => {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.end('REQUEST FAIL:\n' + e.message + '\n' + e.stack)
      })
    }).listen(port, (err) => {
      if (err) throw err
      console.log('Ready on port ' + port)
    })
  })
  .catch((e) => {
    http.createServer((req, res) => {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end('PREPARE FAIL:\n' + e.message + '\n' + e.stack)
    }).listen(port)
  })

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))
