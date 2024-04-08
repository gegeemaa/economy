# CRUD operation with image upload

Application is hosted at https://economy-smoky.vercel.app/

### Libraries

A following stack of libraries are used to build the application:

#### Frontend:

    - React + TypeScript + Vite
    - React Redux Toolkit
    - React Router Dom
    - Ant Design

#### Backend:

    - NestJS
    - Prisma ORM
    - Docker
    - AWS EC2

# Frontend installation

```bash
cd frontend

# Install dependencies
npm install

# Start

npm run dev
```

# Backend installation

## Prisma create migration and run it into DB command

```bash
# Create network
docker network create database

# Install dependencies
docker compose run --rm backend npm install

# Generate prisma client
docker compose run --rm backend npx prisma generate

# Generate database schema
docker compose up
docker compose run --rm backend npx prisma migrate dev --name init

# Connect to running database container
docker compose exec database bash
mysql -uroot -p
```
