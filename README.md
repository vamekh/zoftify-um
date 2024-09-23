# NestJS User Management API

### **A test task project for Zoftify**

This is a NestJS application that provides a CRUD API for managing users, with JWT authentication and role-based access
control (RBAC) using Prisma as the database ORM. It includes features such as user registration, authentication, and
role checking for certain operations.

### Table of Contents

* [Quick Setup And Run](#quick-setup-and-run)
* [Authentication and API Access](#authentication-and-api-access)
* [Features](#features)
* [Technologies](#technologies)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Running the Application](#running-the-application)
* [Seeding Initial Data](#seeding-initial-data)
* [API Endpoints](#api-endpoints)
* [Role-Based Access Control](#role-based-access-control)

## Quick Setup and Run

Follow these instructions to quickly set up the project for development or testing.

#### 1. Clone the Repository

   ```bash
   git clone https://github.com/vamekh/zoftify-um.git
   cd zoftify-um
   ```

#### 2. Create a .env File

You need to create a .env file in the root directory. Copy the template from .env.example

   ```bash
   cp .env.example .env
   ```

Example file already contains ready to go dev configuration. Modify if needed.

#### 3. Create a .env File

To automate the initial setup, including installing dependencies, generating the Prisma client, running migrations, and
optionally seeding the database, run:

```bash
npm run setup
```
This script will:
* Install the required dependencies.
* Generate the Prisma client.
* Apply Prisma database migrations.
* Optionally seed the database with initial data

#### 4. Run

Simply use npm start script
   ```bash
   npm run start
   ```

The API will be available at http://localhost:3000.

## Authentication and API Access
### 1. Authentication Requirement
In order to access most of the API endpoints, users must first authenticate by obtaining a JWT token. The API is protected with JWT authentication, meaning that each request to a protected route must include a valid JWT token in the Authorization header.

#### Steps to Access the API:
1. Login: Send a `POST` request to the `/auth/sign-in` endpoint with your email and password to obtain a JWT token. 

   
   **Credentials for the root user are configured in `.env` file**

   Example request:
   ```bash
   POST /auth/login
   Content-Type: application/json
   Body: { "email": "admin@example.com", "password": "password123" }
   ```
2. Receive a JWT Token: The response will include a token like this:

   ```json
   {
       "access_token": "your_jwt_token_here"
   }
   ```
3. Access Protected Endpoints: Include the token in the `Authorization` header of your subsequent requests:

   `Authorization: Bearer your_jwt_token_here`
   

## Features

* User CRUD: Create, read, update, and delete users.
* JWT Authentication: Secure authentication using JSON Web Tokens (JWT).
* Role-Based Access Control: Only allow `admin` users to access certain endpoints.
* Pagination Support: Fetch users with pagination and search functionality.
* Prisma ORM: Manage the PostgreSQL (or SQLite) database using Prisma.

## Technologies

* NestJS: Framework for building efficient and scalable server-side applications.
* Prisma: Next-generation ORM for database management.
* Passport: Middleware for authentication.
* JWT: For secure user authentication.
* Bcrypt: Password hashing for security.
* SQLite/PostgreSQL: Database (supports both development and production).

## Installation

Clone the repository:

```bash
git clone https://github.com/your-repo-url.git
cd your-project-directory
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

```bash
# .env file

# Database settings
DATABASE_URL="file:./dev.db"  # If using SQLite for development

# JWT settings
JWT_SECRET="yourSecretKey"
JWT_EXPIRATION="1d"  # 1 day token expiration
```

You can modify `DATABASE_URL` if you are using PostgreSQL or another database.

## Database Setup

If you are using Prisma with SQLite, you can use the following steps to set up your database:

1. Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
2. Apply migrations to the database:
    ```bash
    npx prisma migrate dev --name init
    ```
3. To view your database schema using Prisma Studio, run:
    ```bash
    npx prisma studio
    ```

## Running the Application

To start the NestJS application, run:

```bash
npm run start:dev
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Seeding Initial Data

To seed the database with initial data (e.g., admin users), run the following command:

```bash
npm run seed
```

This will execute the seed script located in the `prisma/seed.ts` file.

## API Endpoints
Following API endpoints are available:

### Authentication
Public endpoints
* Sign In: `POST /auth/sign-in`
* Sign Up: `POST /auth/sign-up`

### User Management
These endpoints are accessible only for admin users.
* Get All Users: `GET /users`
* Create User: `POST /users`
* Get User by ID: `GET /users/:id`
* Update User: `PUT /users/:id`
* Delete User: `DELETE /users/:id`

## Role-Based Access Control

CRUD routes are protected by role-based access control (RBAC). You need to be authenticated as an `admin` to perform
certain operations (e.g., creating or deleting users). To authenticate 
