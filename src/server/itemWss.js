import WebSocket from 'ws';

let wss = null;

export const initWss = (server) => {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws, request) => {
    console.log('server - wss on connection');
    ws.on('message', (message) => {
      console.log('server - wss received: %s', message);
      ws.send('echo' + message);
    });
  });
};

export const notifyClients = message => {
  if (!wss) {
    return;
  }
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify(message));
  })
};
