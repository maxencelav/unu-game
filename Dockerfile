# Use an official Node.js LTS image as the base
FROM node:lts

ARG RAILWAY_TCP_PROXY_DOMAIN
RUN echo $RAILWAY_TCP_PROXY_DOMAIN

ARG RAILWAY_TCP_PROXY_PORT
RUN echo $RAILWAY_TCP_PROXY_PORT

# Set the working directory
WORKDIR /usr/app

# Copy only package files first to leverage Docker caching
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

# Install dependencies for frontend
WORKDIR /usr/app/frontend
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install --no-optional --legacy-peer-deps && \
    npm install --force @rollup/rollup-linux-x64-gnu

# Install dependencies for backend
WORKDIR /usr/app/backend
RUN rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install --no-optional --legacy-peer-deps

# Copy the rest of the application
WORKDIR /usr/app
COPY . .

# Build the frontend
RUN cd frontend && npm rebuild esbuild && npm rebuild rollup && npm run build

# Expose the port (change as needed)
EXPOSE 8080

# Start the backend
CMD ["node", "backend/server.js"]
