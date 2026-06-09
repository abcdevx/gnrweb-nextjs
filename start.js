// Passenger-compatible Next.js server for cPanel CloudLinux
const http = require('http')
const next = require('next')

const app = next({ dev: false })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on port ${port}`)
  })
})

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))
