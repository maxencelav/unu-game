# Use an official Node runtime as the base image
FROM node:lts

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /usr/app

# Copy package.json and package-lock.json for frontend and backend
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies for the frontend
WORKDIR /usr/app/frontend
RUN npm install

# Install dependencies for the backend
WORKDIR /usr/app/backend
RUN npm install

# Set the working directory back to root
WORKDIR /usr/app

# Copy the rest of the application code
COPY . .

# Environment variables for Vite and Node.js runtime
ARG VITE_WS_URL
ARG WS_PORT

# Build the frontend
RUN cd frontend && npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "backend/index.js"]
