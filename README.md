## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Navigate to the `backend` directory and run `npm install`
3. Navigate to the `frontend` directory and run `npm install`

### Configuration

1. Create a `.env` file in the `backend` directory and add the following:
   ```
   WEBSOCKET_URL=ws://localhost:3000
   ```

2. Create a `.env` file in the `frontend` directory and add the following:
   ```
   VITE_WEBSOCKET_URL=ws://localhost:3000
   ```

### Running the Application

1. Start the backend server:
   ```sh
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

To deploy the application, make sure to set the appropriate environment variables for the WebSocket URL and port.

