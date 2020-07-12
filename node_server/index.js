const path = require('path')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

const http = require('http').createServer(app)
const io = require('socket.io')(http)

/* App logic here */

const initCash = function (filePath) {
  let data = {}
  try {
    data = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    // if no file - create one
    fs.writeFileSync(filePath, data, 'utf8')
  }
  return data
}

/* cash variables */
let orders, price
// eslint-disable-next-line prefer-const
orders = initCash('./orders.json')
price = initCash('./price.json')

app.post('/api/new_order', (req, res) => {
  orders[req.body.id] = req.body
  fs.writeFileSync('./orders.json', JSON.stringify(orders, null, 2), 'utf-8')
  hasNewOrder = true
  res.send('OK')
})

app.post('/api/change_price', (req, res) => {
  price = req.body
  fs.writeFileSync('./price.json', JSON.stringify(req.body, null, 2), 'utf-8')
  res.send('OK')
})

app.get('/api/get_price', (req, res) => {
  res.send(price)
})

let hasNewOrder = false
io.sockets.on('connection', function (socket) {
  setInterval(() => {
    if (hasNewOrder) {
      socket.emit('newOrder', orders)
      hasNewOrder = false
    }
  }, 10000)

  socket.on('getPrice', () => {
    socket.emit(price)
  })

  socket.on('getNewOrders', () => {
    socket.emit('newOrder', orders)
  })
})

http.listen(8000, () => {
  console.log('listening on *:8000')
})
