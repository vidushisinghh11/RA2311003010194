# Notification System

This project was built as part of the campus evaluation assignment. It includes a custom logging middleware, a backend service for fetching notifications, and a frontend application for displaying and prioritizing notifications.

## Project Structure

RA2311003010194/
- logging_middleware/
- notification_app_be/
- notification_app_fe/
- notification_system_design.md
- .gitignore
- README.md

## Features

### Logging Middleware
A reusable logging middleware was created to send logs to the evaluation logging API.  
It supports:
- backend logs
- frontend logs
- log levels such as info, error, warn, debug
- package level classification

### Notification Backend
The backend service:
- fetches notifications from the provided API
- handles authentication using access token
- exposes notifications through a local endpoint
- integrates logging for API requests and processing

Endpoint:
http://localhost:5000/notifications

### Notification Frontend
The frontend application provides:
- all notifications view
- priority inbox view
- filtering by notification type
- pagination
- viewed / unviewed state
- responsive design for desktop and mobile

Frontend runs on:
http://localhost:3000

## Prioritization Logic

Notifications are ranked using:

Priority order:
1. Placement
2. Result
3. Event

Within the same category, newer notifications are ranked higher using timestamp ordering.

A weighted scoring approach is used internally to sort notifications efficiently.

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
cd RA2311003010194
```

### 2. Install Dependencies

Logging Middleware:

```bash
cd logging_middleware
npm install
```

Backend:

```bash
cd ../notification_app_be
npm install
```

Frontend:

```bash
cd ../notification_app_fe
npm install
```

## Environment Variables

Create `.env` files based on `.env.example`.

Example:

Backend:

ACCESS_TOKEN=your_token_here

Frontend:

REACT_APP_ACCESS_TOKEN=your_token_here

## Run Application

Start backend:

```bash
cd notification_app_be
npx ts-node index.ts
```

Start frontend:

```bash
cd notification_app_fe
npm start
```

Test logging middleware:

```bash
cd logging_middleware
npx ts-node index.ts
```

## Technologies Used

- TypeScript
- Node.js
- Express
- React
- Material UI
- Axios

## Notes

Authentication tokens are not committed to the repository for security reasons.  
Environment variables should be configured locally before running the project.