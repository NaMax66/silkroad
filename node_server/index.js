const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const io = require('socket.io').listen(8000);
// const cors = require('cors')

let hasNewOrder = false
io.set('log level', 1);
// Навешиваем обработчик на подключение нового клиента
/* https://habr.com/ru/post/127525/ */
io.sockets.on('connection', function (socket) {
  // Т.к. чат простой - в качестве ников пока используем первые 5 символов от ID сокета
  const ID = (socket.id).toString().substr(0, 5);
  setInterval(()=> {
    if (hasNewOrder) {
      const orders = JSON.parse(fs.readFileSync('./orders.json', 'utf8'))
      socket.emit('newOrder', orders)
      hasNewOrder = false
    }
  }, 10000)

  socket.on('getNewOrders', () => {
    const orders = JSON.parse(fs.readFileSync('./orders.json', 'utf8'))
    socket.emit('newOrder', orders)
  })

  // При отключении клиента - уведомляем остальных


  socket.on('disconnect', function() {
    const time = (new Date).toLocaleTimeString();
    io.sockets.json.send({'event': 'userSplit', 'name': ID, 'time': time});
  });
});

const app = express();
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//reloading in a route
const history = require('connect-history-api-fallback');

const book_database = require("./book_database.json");

app.use(history());
app.use(express.static(path.join(__dirname, "public")));
app.use(async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
/*app.get("/book_database", (req, res) => {
    res.send(book_database);
});*/
/*app.use("*", function(req, res) {
    res.status(404).send("404");
});*/

app.post("/api/new_order", (req, res) => {
  const orders = JSON.parse(fs.readFileSync('./orders.json', 'utf8'))
  orders[req.body.id] = req.body
  fs.writeFileSync('./orders.json', JSON.stringify(orders) , 'utf-8')
  hasNewOrder = true
  res.send('OK')
});

app.post("/api/change_price", (req, res) => {
  fs.writeFileSync('./price.json', JSON.stringify(req.body) , 'utf-8')
  res.send('OK')
});

app.get("/api/get_price", (req, res) => {
  const price = fs.readFileSync('./price.json', 'utf8')
  res.send(JSON.parse(price))
});

app.listen(5000, "localhost", () => {
    console.log(`Server running at http://localhost:8000/` + "\n");
});


