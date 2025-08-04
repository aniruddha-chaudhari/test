import { WebSocketServer, WebSocket } from 'ws';
import { client } from '@repo/prisma/client';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;

// Create WebSocket server
const wss = new WebSocketServer({ port: PORT });

console.log(`🚀 WebSocket server running on ws://localhost:${PORT}`);

// Handle connections
wss.on('connection', async (ws: WebSocket) => {
  const res = await client.user.create({
    data: {
      username: Math.random().toString(36).substring(2, 15),
      password: Math.random().toString(36).substring(2, 15),
    },
  });
  ws.send(JSON.stringify(res));
});
 