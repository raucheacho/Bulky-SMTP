# Bulky - Bulk Email Management System

Bulky is a modern web application designed for efficient bulk email management. It provides a user-friendly interface for creating, managing, and sending bulk emails with template support.

## Features

- User-friendly web interface for email management
- Template-based email composition
- Bulk email sending capabilities
- Real-time status tracking
- Docker-based deployment

## Technologies Used

### Frontend
- React
- Vite (Build tool)
- Node.js v18
- NGINX (Production server)

### Backend
- Node.js v18
- Express.js
- Docker

### Database
- PostgreSQL

## Project Structure

```
bulky/
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static files
│   └── Dockerfile    # Frontend container configuration
│
├── backend/          # Node.js backend application
│   ├── src/         # Source code
│   └── Dockerfile   # Backend container configuration
│
└── docker-compose.yml # Container orchestration
```

## Installation

### Prerequisites

- Docker Desktop
- Docker Compose
- Git

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bulky.git
cd bulky
```

2. Create a `.env` file in the root directory with the following variables:
```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=bulky_db
DB_HOST=db
```

3. Start the application:
```bash
docker compose up -d
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

1. Access the web interface at http://localhost:3000
2. Log in with your credentials
3. Create email templates
4. Upload recipient lists
5. Schedule or send bulk emails
6. Monitor sending status through the dashboard

## Development

To run the application in development mode:

1. Frontend:
```bash
cd frontend
npm install
npm run dev
```

2. Backend:
```bash
cd backend
npm install
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

