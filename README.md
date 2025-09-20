# Node.js JWT Authentication

This project demonstrates a simple **Node.js authentication system** using:

- **bcrypt** for password hashing
- **JWT (JSON Web Token)** for authentication

## Routes

- `POST /signup` → Register a new user  
- `POST /login` → Login and receive JWT  
- `GET /protected` → Protected route (requires JWT in Authorization header)

## Usage

1. Install dependencies:
