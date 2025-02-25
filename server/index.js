import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer();
const wss = new WebSocketServer({ server });

const users = new Map();
const offlineMessages = new Map();

wss.on('connection', (ws) => {
  let userId;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'register':
        userId = data.userId;
        users.set(userId, ws);
        
        // Send any offline messages
        if (offlineMessages.has(userId)) {
          const messages = offlineMessages.get(userId);
          messages.forEach(msg => ws.send(JSON.stringify(msg)));
          offlineMessages.delete(userId);
        }
        break;

      case 'message':
        const targetWs = users.get(data.to);
        if (targetWs) {
          targetWs.send(JSON.stringify({
            type: 'message',
            from: userId,
            content: data.content,
            timestamp: new Date().toISOString()
          }));
        } else {
          // Store offline message
          if (!offlineMessages.has(data.to)) {
            offlineMessages.set(data.to, []);
          }
          offlineMessages.get(data.to).push({
            type: 'message',
            from: userId,
            content: data.content,
            timestamp: new Date().toISOString()
          });
        }
        break;
    }
  });

  ws.on('close', () => {
    if (userId) {
      users.delete(userId);
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});