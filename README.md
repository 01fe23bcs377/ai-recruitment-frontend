# RecruitAI - Cloud-Based AI Recruitment Verification System

RecruitAI is a smart hiring platform that leverages AI and blockchain technology to streamline the recruitment process. The system provides features for resume parsing, candidate ranking, and certificate verification.

## Features

- AI-powered resume parsing and candidate ranking
- Blockchain-based certificate verification
- Secure user authentication
- Dashboard with analytics
- File upload and management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Gemini API key for AI features

## Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ..
   npm install
   ```

## Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend server:
   ```bash
   cd ..
   npm start
   ```

3. Access the application at `http://localhost:8080`

## Deployment

For deployment to cloud platforms like Heroku, AWS, or Azure:

1. Set the environment variables in your deployment environment
2. Ensure MongoDB is accessible
3. Deploy both the frontend and backend components
4. Configure the proxy settings if needed

## API Endpoints

- `/api/auth` - Authentication endpoints
- `/api/resume` - Resume upload and management
- `/api/ai` - AI parsing endpoints
- `/api/rank` - Candidate ranking endpoints
- `/api/verify` - Certificate verification endpoints
- `/api/dashboard` - Dashboard statistics endpoints

## License

This project is licensed under the MIT License.