# Baby PHR - Personal Health Record Web App

## Overview
Full-stack web application built with Express (backend), React + Vite (frontend), PostgreSQL (database), and Nginx (reverse proxy).

## Tech Stack
- **Backend:** Node.js + Express (REST API)
- **Frontend:** React 19 + Vite
- **Database:** PostgreSQL 15
- **Proxy:** Nginx (TLS/HTTPS)
- **Containerization:** Docker + Docker Compose

## Project Structure
```
baby_PHR/
├── Back/          # Express REST API (MVC)
├── Front/         # React + Vite frontend
├── Nginx/         # Nginx reverse proxy + TLS
├── Data/          # PostgreSQL data volume
├── docker-compose.yml
├── Makefile
└── .env
```

## ❗❗ Getting started ❗❗
- **Update .env :** Credentials are to be updated in every .env
- **⚠️ To know:** Volume Data (database) is in .gitignore
- **Add migration Database:**
	`npm run migrate create migration-name # Create new migration`
	`npm run migrate up   # run migrations`
	[`Doc for migration module`](https://salsita.github.io/node-pg-migrate/)

## Usage
```bash
# Launch server
make

# Access app
https://localhost:8443

# Launch terminal of one of the containers
make term

# See logs of one of the containers
make log

# List containers
make state

# Stop the server
make stop
```
`
## API Documentation
See `Back/API.md`

## Testing
```bash
cd Back
npm test              # run tests
npm run test:watch   # watch mode
npm run test:coverage # coverage report
```