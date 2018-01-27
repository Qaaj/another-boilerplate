const serve = require('koa-static');
const Koa = require('koa');
const http  = require('http');

const SocketService = require('./services/socket');

const app = new Koa()
const server = http.createServer(app.callback())

new SocketService('wss://api.bitfinex.com/ws/2', server)

server.listen(3001)