// Passenger-compatible Next.js server for cPanel CloudLinux
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = false

const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res, parse(req.url, true))
  }).listen(port, '0.0.0.0', () => {
    console.log(`> Ready on port ${port}`)
  })
}).catch((err) => {
  console.error('Next.js failed to start:', err)
  process.exit(1)
})
