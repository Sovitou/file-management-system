# File Management System

## Overview

This File Management System is a backend application built with Express.js, Multer, and Prisma ORM. It handles file operations such as uploading, listing, downloading, and deleting files. The system includes user authentication for secure access and follows a modular architecture to ensure scalability and maintainability.

## Features

-   **User Authentication**: Secure registration and login system with JWT-based authentication.
    
-   **File Operations**: Upload, list, download, and delete files via RESTful API endpoints , powered by Multer.
    
-   **Database Management**: Uses Prisma ORM for database interactions, with as the default database (configurable for other databases like MySQL, or SQLite).

    
-   **Modular Design**: Organized into controllers, routes, and middleware for clean code separation.

    

## Tech Stack

-   **Backend**: Express.js
    
-   **ORM**: Prisma
    
-   **Database**: PostgreSQL
-   **File Operation** :  Multer
    
-   **Authentication**: JSON Web Tokens (JWT)
    

## Folder Structure

```
file-management-system/
├── prisma/
│   └── schema.prisma           # Prisma schema for database models
├── src/
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic (register, login)
│   │   └── fileController.js   # File operations (upload, list, search, download, delete, view)
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   └── fileRoutes.js       # File-related routes
│   └── server.js               # Main server entry point
│   └── swagger.js              # API Docs
├── uploads/                    # Folder for storing uploaded files (created manually)
└── package.json                # Project dependencies and scripts
   ```

## Installation

### Prerequisites

-   Node.js 16+
    
-   npm
    
-   Git
    

### Steps

1.  **Clone the Repository**
    
    ```bash
    git clone <repository-url>
    cd file-management-system
    ```
    
2.  **Install Dependencies**
    
    ```bash
    npm install
    ```
    
3.  **Set Up Prisma**
    
    -   Initialize the database:
        
        ```bash
        npx prisma migrate dev --name init
        ```
        
    -   Ensure schema.prisma is configured with your database (default: PostgreSQL).
        
4.  **Environment Setup**
    
    -   Create a .env file in the root directory:
        
        ```env
        DATABASE_URL="file:./dev.db"
        JWT_SECRET="your_jwt_secret_here"
        PORT=3000
        ```
        
    -   Update the DATABASE_URL if using a different database.
        
5.  **Start the Server**
    
    ```bash
    npm run dev
    ```
    
    -   The server will run on http://localhost:3000 (or the port specified in .env).
        

## Usage

-   **API Endpoints**:
    
    -   **Auth**:
        
        -   POST /api/auth/register: Register a new user.
            
        -   POST /api/auth/login: Log in and receive a JWT token.
            
    -   **Files**:
        
        -   POST /api/files/upload: Upload a file (requires authentication).
            
        -   GET /api/files: List all files (requires authentication).
            
        -   GET /api/files/:id: Download a file by ID (requires authentication).
            
        -   DELETE /api/files/:id: Delete a file by ID (requires authentication).
            
-   Use tools like Postman or cURL to test the API endpoints.
    
-   Include the JWT token in the Authorization header for protected routes (e.g., Bearer <token>).
    

## Contributing

Contributions are welcome! To contribute:

1.  Fork the repository.
    
2.  Create a new branch (git checkout -b feature/your-feature).
    
3.  Commit your changes (git commit -m 'Add your feature').
    
4.  Push to the branch (git push origin feature/your-feature).
    
5.  Open a pull request.
    

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or support, reach out via [GitHub Issues](/issues).
