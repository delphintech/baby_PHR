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

## Quick Start
```bash
# Launch server
make

# Launch terminal of one of the containers
make term

# Stop the server
make stop

# Access app
https://localhost:8443
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