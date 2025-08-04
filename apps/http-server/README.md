# HTTP Server

A Node.js Express server with Prisma integration for the Turborepo monorepo.

## Features

- Express.js HTTP server
- Prisma database integration
- CORS enabled
- Security middleware (Helmet)
- Request logging (Morgan)
- Health check endpoint
- User management API endpoints
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

The server will run on `http://localhost:3001` by default.

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
  - Body: `{ "email": "user@example.com", "name": "John Doe" }`

## Environment Variables

- `PORT` - Server port (default: 3001)

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