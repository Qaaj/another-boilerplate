const serve = require('koa-static');
const Koa = require('koa');
const WebSocket = require('ws')
const http  = require('http');
const socket = require('socket.io')

const app = new Koa()
const wss = new WebSocket('wss://api.bitfinex.com/ws/2');
const server = http.createServer(app.callback())
const io = new socket(server);

io.set('transports', ['websocket', 'polling']);

wss.onmessage = (msg) => {
  console.log(msg.data);
  io.emit('action', {type: 'PRICES', data: msg.data});
};

wss.onopen = () => {
  wss.send(JSON.stringify({
    "event": "subscribe",
    "channel": "ticker",
    "symbol": "tBTCUSD"
  }));
};
// app.use(serve('.'));


// Basic.
app.use(async ctx => {
  ctx.body = 'Hello World'
})



io.on('connection', function(socket){
  console.log('a user connected')
})

server.listen(3001)