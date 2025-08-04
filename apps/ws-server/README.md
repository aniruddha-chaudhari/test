# WebSocket Server

A Node.js WebSocket server with Prisma integration for the Turborepo monorepo.

## Features

- WebSocket server using `ws` library
- Prisma database integration
- Real-time user management
- Client connection management
- Message broadcasting
- Graceful shutdown handling

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Ensure the Prisma package is built:
```bash
pnpm build --filter=@repo/prisma
```

3. Set up your database and run Prisma migrations:
```bash
cd packages/prisma
pnpm prisma migrate dev
```

## Development

Start the development server:
```bash
pnpm dev
```

The server will run on `ws://localhost:3002` by default.

## WebSocket Messages

### Client to Server

#### Get Users
```json
{
  "type": "get_users"
}
```

#### Create User
```json
{
  "type": "create_user",
  "data": {
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Ping
```json
{
  "type": "ping"
}
```

### Server to Client

#### Connection Established
```json
{
  "type": "connection",
  "data": {
    "clientId": "abc123",
    "message": "Connected to WebSocket server"
  }
}
```

#### Users List
```json
{
  "type": "users_list",
  "data": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### User Created
```json
{
  "type": "user_created",
  "data": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### User Added (Broadcast)
```json
{
  "type": "user_added",
  "data": {
    "id": 2,
    "email": "newuser@example.com",
    "name": "Jane Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Pong
```json
{
  "type": "pong",
  "data": {
    "timestamp": 1704067200000
  }
}
```

#### Error
```json
{
  "type": "error",
  "data": {
    "message": "Error description"
  }
}
```

## Environment Variables

- `WS_PORT` - WebSocket server port (default: 3002)

## Build

Build for production:
```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## Clean

Remove build artifacts:
```bash
pnpm clean
```

## Testing with WebSocket Client

You can test the WebSocket server using a browser console or tools like `wscat`:

```bash
# Install wscat
npm install -g wscat

# Connect to the server
wscat -c ws://localhost:3002

# Send messages
{"type": "get_users"}
{"type": "create_user", "data": {"email": "test@example.com", "name": "Test User"}}
{"type": "ping"}
``` 