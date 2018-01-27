import io from 'socket.io-client';
const io_options = {reconnect: true, transports: ['websocket', 'polling']};

module.exports = io('http://localhost:3001',io_options);
