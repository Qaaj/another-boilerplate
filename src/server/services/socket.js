const WebSocket = require('ws')
const socket = require('socket.io');

class SocketService {

  constructor(url, server) {

    this.url = url;
    this.activeConnections = {};
    this.io = new socket(server);

    this.io.set('transports', ['websocket', 'polling']);

    this.io.on('connection', (socket) => {
      this.socketConnected(socket.id)
      socket.on('disconnect', () => this.socketDisonnected(socket.id));
    });
  }

  initConnection(){

    this.channels = {};
    this.wss = new WebSocket(this.url);

    this.wss.onmessage = (msg) => {
      const message = JSON.parse(msg.data);
      if (message.event === 'subscribed') {
        this.channels[message.chanId] = message.channel.toUpperCase();
        console.log(this.channels);
      };

      if(message[1] !== 'hb' && !message.event) this.tick(this.channels[message[0]], message);
    };

    this.wss.onopen = () => {
      this.wss.send(JSON.stringify({
        "event": "subscribe",
        "channel": "ticker",
        "symbol": "tBTCUSD"
      }));
      this.wss.send(JSON.stringify({
        "event": "subscribe",
        "channel": "trades",
        "symbol": "tBTCUSD"
      }));
      this.wss.send(JSON.stringify({
        "event": "subscribe",
        "channel": "book",
        "chanId": 4,
        "symbol": "tBTCUSD",
        "prec": "P0",
        "freq": "F0",
        "len": 25
      }));
    };
  }

  tick(type, data) {
    if (Object.keys(this.activeConnections).length > 0) {
      data.shift();
      this.io.emit('action', {type, data});
    }
  }

  socketConnected(socket) {
    console.log('socket', socket, 'connected');
    if(Object.keys(this.activeConnections).length === 0){
      this.activeConnections[socket] = new Date();
      this.initConnection()
    }
    this.activeConnections[socket] = new Date();

  }

  socketDisonnected(socket) {
    delete(this.activeConnections[socket]);
    console.log('socket', socket, 'disconnected')
    if (Object.keys(this.activeConnections).length === 0) {
      console.log("No active connections - stopping socket emits");
      this.wss.close();
    }
  }

}

module.exports = SocketService;