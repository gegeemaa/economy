# Backend

## Prisma create migration and run it into DB command

```bash
# Create network
docker network create database

# Install dependencies
docker compose run --rm backend npm install

# Generate prisma client
docker compose run --rm backend npx prisma generate

# Generate database schema
docker compose run --rm backend npx prisma migrate dev --name init

# Start containers
docker compose up
```
