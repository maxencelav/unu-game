# Use an official Node runtime as the base image
FROM node:alpine

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
ENV NODE_ENV=production

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json for both backend and frontend
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Clear npm cache and remove node_modules if they exist
RUN npm cache clean --force && \
    rm -rf node_modules && \
    rm -rf frontend/node_modules && \
    rm -rf backend/node_modules

# Install dependencies
RUN npm install && \
    cd frontend && npm install && cd .. && \
    cd backend && npm install && cd ..

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