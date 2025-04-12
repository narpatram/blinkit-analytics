# Blinkit Analytics Dashboard

A modern analytics dashboard built with React, Material-UI, and Cube.js for efficient data visualization and querying.

## Tech Stack

- React 19
- Material-UI (MUI)
- Recharts for data visualization
- Cube.js for data querying
- Vite for build tooling
- TypeScript

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blinkit-analytics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_CUBEJS_TOKEN=your_cubejs_token
   VITE_CUBEJS_API_URL=your_cubejs_api_url
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features

- Interactive data visualizations
- Real-time data updates
- Responsive design
- JSON-controlled components
- Efficient data querying with Cube.js

## Project Structure

- `src/components/` - Reusable UI components
- `src/cubejs/` - Cube.js configuration and queries
- `src/utils/` - Utility functions and helpers