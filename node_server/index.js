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

const isValid = (data) => {
  if (!data) {
    console.log('price is invalid. Value = ', data)
  }
  return !!data
}
const initCash = function (dbName) {
  const filePath = `./${dbName}.json`
  let data
  try {
    data = fs.readFileSync(filePath, 'utf8')
  } catch (e) {
    // if no file - create one
    const examplePath = `./${dbName}_example.json`
    data = fs.readFileSync(examplePath, 'utf8')
    fs.writeFileSync(filePath, data, 'utf8')
  }
  return JSON.parse(data)
}

let orders, price, news
// eslint-disable-next-line prefer-const
orders = initCash('orders')
price = initCash('price')
news = initCash('news')

io.sockets.on('connection', function (socket) {
  socket.on('getPrice', (data, cb) => {
    return cb(price)
  })

  socket.on('getNews', (data, cb) => {
    return cb(news)
  })

  socket.on('updateNews', (data, cb) => {
    let msg = ''
    if (isValid(data)) {
      news = data
      fs.writeFileSync('./news.json', JSON.stringify(news, null, 2), 'utf-8')
      msg = 'News updated'
    } else {
      msg = 'Wrong news data from the client!'
    }
    return cb(msg)
  })

  socket.on('updatePrice', (data, cb) => {
    let msg = ''
    if (isValid(data)) {
      price = data
      fs.writeFileSync('./price.json', JSON.stringify(price, null, 2), 'utf-8')
      msg = 'Price list updated'
    } else {
      msg = 'Wrong price data from the client!'
    }
    return cb(msg)
  })

  socket.on('getNewOrders', () => {
    socket.emit('newOrderFromServer', orders)
  })
  socket.on('newOrderFromClient', (data, cb) => {
    orders.unshift(data)
    fs.writeFileSync('./orders.json', JSON.stringify(orders, null, 2), 'utf-8')
    /* Обновляем список новых заказов у админа */
    socket.emit('newOrderFromServer', orders)
    const msg = 'New order added'
    return cb(msg)
  })
  socket.on('removeOrder', (id, cb) => {
    orders = orders.filter(el => el.id !== id)
    fs.writeFileSync('./orders.json', JSON.stringify(orders, null, 2), 'utf-8')
    socket.emit('newOrderFromServer', orders)
    const msg = 'ok'
    return cb(msg)
  })
})

http.listen(8000, () => {
  console.log('listening on *:8000')
})
