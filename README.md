# NestJS User Management API

### **A test task project for Zoftify**

This is a NestJS application that provides a CRUD API for managing users, with JWT authentication and role-based access
control (RBAC) using Prisma as the database ORM. It includes features such as user registration, authentication, and
role checking for certain operations.

### Table of Contents

* [Quick Setup](#quick-setup)
* [Features](#features)
* [Technologies](#technologies)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Running the Application](#running-the-application)
* [Seeding Initial Data](#seeding-initial-data)
* [API Endpoints](#api-endpoints)
* [Role-Based Access Control](#role-based-access-control)
* [Testing](#testing)

## Quick Setup

Follow these instructions to quickly set up the project for development or testing.

#### 1. Clone the Repository

   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-project-directory
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

Below are some of the main API endpoints:

### Authentication

* Sign In: `POST /auth/sign-in`
* Sign Up: `POST /auth/sign-up`

### User Management

* Get All Users (Admin Only): `GET /users`
* Create User (Admin Only): `POST /users`
* Get User by ID: `GET /users/:id`
* Update User (Admin Only): `PUT /users/:id`
* Delete User (Admin Only): `DELETE /users/:id`

## Role-Based Access Control

Some routes are protected by role-based access control (RBAC). You need to be authenticated as an `admin` to perform
certain operations (e.g., creating or deleting users).

In the controllers, the role check is enforced using the `@Roles('admin')` decorator. The user’s role is included in the
JWT token and extracted via the `RolesGuard`.

## Testing

You can add unit tests to ensure your services and guards are functioning correctly. To run the tests:

```bash
npm run test
```

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes.
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a pull request.
