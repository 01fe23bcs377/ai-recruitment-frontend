#!/usr/bin/env node

// Deployment script for RecruitAI application
console.log('🚀 Starting RecruitAI Deployment Process...');

// Check if required environment variables are set
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET', 'GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  console.error('Please set these environment variables before deployment.');
  process.exit(1);
}

console.log('✅ All required environment variables are set');

// Check if required directories exist
const fs = require('fs');
const path = require('path');

const requiredDirs = ['backend', 'js', 'styles'];
const missingDirs = requiredDirs.filter(dir => !fs.existsSync(path.join(__dirname, dir)));

if (missingDirs.length > 0) {
  console.error('❌ Missing required directories:', missingDirs);
  process.exit(1);
}

console.log('✅ All required directories are present');

// Check if required files exist
const requiredFiles = ['index.html', 'server.js', 'backend/server.js'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:', missingFiles);
  process.exit(1);
}

console.log('✅ All required files are present');

// Check if node_modules exists in backend
if (!fs.existsSync(path.join(__dirname, 'backend', 'node_modules'))) {
  console.log('⚠️  Backend node_modules not found. Please run "npm install" in the backend directory.');
}

// Check if node_modules exists in root
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('⚠️  Frontend node_modules not found. Please run "npm install" in the root directory.');
}

console.log('✅ Deployment pre-checks completed successfully');
console.log('📋 To deploy this application:');
console.log('   1. Ensure MongoDB is accessible with the provided MONGO_URI');
console.log('   2. Install dependencies in both root and backend directories:');
console.log('      - cd backend && npm install');
console.log('      - cd .. && npm install');
console.log('   3. Set environment variables:');
console.log('      - MONGO_URI (MongoDB connection string)');
console.log('      - JWT_SECRET (Secret for JWT tokens)');
console.log('      - GEMINI_API_KEY (API key for Gemini AI)');
console.log('   4. Start the backend server: cd backend && npm start');
console.log('   5. Start the frontend server: cd .. && npm start');
console.log('   6. Access the application at http://localhost:8080');
console.log('🎉 Deployment ready!');