import itemService from './itemService';

const ws = new WebSocket('ws://localhost:3000/');

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});