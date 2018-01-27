const WebSocket = require('ws')
const socket = require('socket.io');

class SocketService {

  constructor(url, server) {
    this.activeConnections = {};

    this.wss = new WebSocket(url);
    this.io = new socket(server);
    this.io.set('transports', ['websocket', 'polling']);

    this.io.on('connection', (socket) => {
      this.socketConnected(socket.id)
      socket.on('disconnect', () => this.socketDisonnected(socket.id));
    });

    this.wss.onmessage = (msg) => this.tick(msg.data);

    this.wss.onopen = () => {
      this.wss.send(JSON.stringify({
        "event": "subscribe",
        "channel": "ticker",
        "symbol": "tBTCUSD"
      }));
    };
  }

  tick(data) {
    if (Object.keys(this.activeConnections).length > 0) {
      this.io.emit('action', {type:'PRICES', data});
    }
  }

  socketConnected(socket) {
    console.log('socket', socket, 'connected')
    this.activeConnections[socket] = new Date();
  }

  socketDisonnected(socket) {
    delete(this.activeConnections[socket]);
    console.log('socket', socket, 'disconnected')
    if (Object.keys(this.activeConnections).length == 0) this.stopTicking();
  }

}

module.exports = SocketService;