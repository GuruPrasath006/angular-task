const express = require('express');
const app = express();
var cors = require('cors');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fsPromises = require('fs').promises;
const path = require('path');

const port = 3456;

let stocks = [];

async function loadStocks() {
  try {
    const data = await fsPromises.readFile('./src/assets/stocks.json', 'utf8');
    stocks = JSON.parse(data);

    setTimeout(simulateStockChange, 5000);
  } catch (err) {
    console.error(err);
  }
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function simulateStockChange() {
  const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
  const randomChange = Math.floor(Math.random() * (8 - 2 + 1) + 2);
  var randomUpdated =0;
      if(randomChange % 2 == 0) {
        randomUpdated = parseFloat((randomStock.LAST + randomStock.LAST * randomChange/100).toFixed(2));
      }else{
        randomUpdated = parseFloat((randomStock.LAST - randomStock.LAST * randomChange/100).toFixed(2));
      }
  
  io.to("stocks").emit("stock_update", {
    code: randomStock.SC_CODE,
    name: randomStock.SC_NAME,
    previous: randomStock.LAST,
    price: randomUpdated
  });
  
  setTimeout(simulateStockChange, 500);
}

loadStocks();


// Socket

io.on("connection", (socket) => {
  console.log('user connected: ', socket.id);
  socket.join('stocks');
});


// Endpoints

app.use(cors());

app.get('/stocks', async (req, res) => {
  res.send({ status: 1, data: { stocks: stocks }});
});

app.get('/watch-list', async (req, res) => {
  var rnd_stocks = getRandom(stocks, 5);
  // console.log(rnd_stocks);
  res.send({ status: 1, data: { stocks: rnd_stocks }});
});



http.listen(port, function() {
  var host = http.address().address
  var port = http.address().port
  console.log('App listening at http://%s:%s', host, port)
});