# SaveRaks 2.0

Eco-Guardian Platform for Surasakmontree School

## Quick Start

### Development
```bash
# Copy environment file
cp .env.example .env

# Start with Docker Compose (dev mode)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f
```

### Production
```bash
# Start all services
docker-compose up -d

# Check health
curl http://localhost:3000/health
```

## Services

| Service | Dev Port | Prod Port |
|---------|----------|-----------|
| Frontend | 5173 | 80 |
| Backend | 3000 | 3000 |
| PostgreSQL | 5432 | 5432 |
| Redis | 6379 | 6379 |
| MinIO Console | 9001 | 9001 |

## Default Credentials

- **Student Login**: Any 5-digit ID (e.g., 12345) + password123
- **Admin**: admin@saveraks.school.th / password123
