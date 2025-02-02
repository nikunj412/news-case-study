# News Case Study - Frontend Developer Challenge

This project is a front-end application for a news aggregator website built using React.js with TypeScript. The application allows users to search for articles by keyword and filter results by date, category, and source. Users can also customize their news feed by selecting preferred sources, categories, and authors.

## Features

- **Article Search and Filtering**: Users can search for articles by keyword and filter results by date, category, and source.
- **Personalized News Feed**: Users can customize their news feed by selecting preferred sources, categories, and authors.
- **Mobile-Responsive Design**: The website is optimized for viewing on mobile devices.

## Data Sources

The application fetches articles from the following data sources:

- NewsAPI
- OpenNews
- The Guardian

## Technologies Used

- React.js
- TypeScript
- Docker
- Material-UI (MUI)
- Axios

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikunj412/news-case-study.git
   ```
2. Navigate to the project directory:
    ```bash 
    cd news-case-study
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

### Option 1: Running Locally (Without Docker)
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to:
    ```bash 
    http://localhost:3000
    ```

### Option 2: Running with Docker

### Build the Docker Image
1. Run the following command to build the Docker image:
   ```bash
   docker build -t news-case-study .
   ```
2. Run the Docker Container:
    ```bash 
    docker run -p 3000:3000 news-case-study
    ```
3. Open your browser and navigate to:
    ```bash 
    http://localhost:3000
    ```

