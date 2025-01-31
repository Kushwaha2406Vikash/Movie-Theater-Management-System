# Movie Theater Management System

**Live Project:** [https://movie-theater-management-system.onrender.com](https://movie-theater-management-system.onrender.com)

A backend system for managing movie theaters, schedules, reservations, and payments using Node.js, Express, MongoDB, and Stripe.

## Features

- **User Authentication**
  - Registration and login with JWT
  - Role-based access control (user/admin)
  
- **Movie Management**
  - CRUD operations for movies
  - Associate movies with theaters

- **Schedule Management**
  - Create and manage movie schedules
  - Track available seats

- **Reservation System**
  - Reserve seats for movie schedules
  - Track payment status

- **Payment Processing**
  - Stripe integration for payment processing
  - Webhook handling for payment events

- **Validation**
  - Request validation using Joi
  - Centralized error handling

## Technologies

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Processing**: Stripe API
- **Validation**: Joi
- **Environment Management**: Dotenv

## Live Demo

The project is deployed on Render and can be accessed at:  
[https://movie-theater-management-system.onrender.com](https://movie-theater-management-system.onrender.com)

**Note:** Please allow a few seconds for the server to wake up on initial load (Render spins down inactive free instances).

## Installation

Install dependencies

bash
Copy
npm install
Set up environment variables

Create .env file in root directory

Use .env.example as a template

Start the server

bash
Copy
npm start
Configuration
Environment Variables
## env
Copy
PORT=5000
MONGO_URI=mongodb://localhost:27017/movie-theater
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
## API Endpoints
# Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
## Movies
# Method	Endpoint	Description
GET	/api/movies	Get all movies
GET	/api/movies/:id	Get single movie
POST	/api/movies	Create new movie
PUT	/api/movies/:id	Update movie
DELETE	/api/movies/:id	Delete movie
## Payments
## Method	Endpoint	Description
POST	/api/payments/create-payment-intent	Create payment intent
POST	/api/payments/webhook	Handle Stripe webhooks
## Reservations
# Method	Endpoint	Description
POST	/api/reservations	Create reservation
GET	/api/reservations	Get all reservations
GET	/api/reservations/:id	Get single reservation
## Schedules
# Method	Endpoint	Description
POST	/api/schedules	Create schedule
GET	/api/schedules	Get all schedules
GET	/api/schedules/:id	Get single schedule
## Error Handling
The API returns standardized error responses:

json
Copy
{
  "message": "Error description"
}
Common Status Codes:

400 Bad Request - Validation errors

401 Unauthorized - Missing/invalid JWT

403 Forbidden - Insufficient permissions

404 Not Found - Resource not found

500 Internal Server Error - Server-side errors

Validation
All incoming requests are validated using Joi schemas. Example validation error:

json
Copy
{
  "message": "\"email\" must be a valid email",
  "errors": {
    "email": "\"email\" must be a valid email"
  }
}
Contributing
Fork the repository

Create your feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Express.js team

MongoDB and Mongoose

Stripe API documentation

Joi validation library

JSON Web Token implementation
