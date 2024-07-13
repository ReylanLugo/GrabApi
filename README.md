# Express API with Prisma and SQLite

This project is an Express API with the following features:

- User login via username
- Validation for existing username, and password length
- Encrypted passwords
- Endpoints for user management
  
## Key Features

- SQLite: A simple, lightweight, and portable database that is easy to dockerize.
- Prisma: Used for data modeling and migrations, making database management effortless.

## Endpoints

1. List All Users (with Pagination)
- URL: GET /api/v1/users?limit=10&page=1
- Description: Retrieve a paginated list of users.
- Parameters:
    - page: The page number (default is 1).
    - limit: Number of users per page (default is 10).

2. Get a Single User
- URL: GET /api/v1/users/{ID}
- Description: Retrieve details of a single user by ID.
- Parameters:
    - ID: The unique identifier of the user.

3. Update a User
- URL: PUT /api/v1/users/{ID}
- Description: Update user information.
- Parameters:
    - ID: The unique identifier of the user.
    - Request body containing fields to update (e.g., username, password).

1. Delete a User
- URL: DELETE /api/v1/users/{ID}
- Description: Delete a user by ID.
- Parameters:
    - ID: The unique identifier of the user.


## Setup and Installation

### Prerequisites
- Node.js
- npm
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/ReylanLugo/GrabApi.git
cd GrabApi
```

2. Install dependencies:

```sh
npm install
```


3. Set up the database:

```sh
npx prisma migrate dev --name init
```

4. Start the server:

```sh
npm start
```

## Usage

### Environment Variables
Create a .env file in the root directory with the following content:

```env
SECRET="your_secret_mandoca"
```

### Prisma
- Data Modeling: Define your data models in prisma/schema.prisma.
- Migrations: Use Prisma migrations to manage your database schema.

```sh
npx prisma migrate dev --name migration_name
```

### Docker
To run the application in a Docker container, use the provided Dockerfile:

Build the Docker image:

```sh
docker build -t grabapi .
```

Run the Docker container:

```sh
docker run -p 3000:3000 grabapi
```

### Security
- Passwords are encrypted using bcrypt before storing them in the database.
- JWT is used for authentication.

## Conclusion
This project demonstrates a simple and effective way to build an Express API with Prisma and SQLite, providing a portable and easy-to-dockerize solution. The use of Prisma for data modeling and migrations makes it easy to manage and scale your database.