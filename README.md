# E-Commerce App

## Setup

### Requirements
- Node.js 20.9.0
- Docker and Docker Compose

### Backend and Frontend Setup
1. Clone the project repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```
2. Configure environment variables:
   - Create the `app-backend/.env` file and fill in the necessary values.
   - Create the `app-frontend/.env` file and fill in the necessary values. Example content:
     ```env
     API_BASE_URL=http://localhost:3000
     ```

### Running the Project with Docker
1. Build and start the Docker containers:
   ```bash
   docker-compose up --build
   ```
2. Access the Frontend application at [http://localhost:8080](http://localhost:8080) and the Backend API at [http://localhost:3000](http://localhost:3000).

### Notes
- The Backend runs on port 3000 for API requests.
- The Frontend runs on port 8080.
