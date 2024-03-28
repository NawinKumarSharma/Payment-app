# Payment application

Welcome to the project! This project aims to replicate the basic functionality of a simple payment exchange application, allowing users to perform transactions, view their account balance, and interact with other users.

## Features

- User Authentication & Authorization using JWT
- View Account Balance
- Search and view other users
- Send money to other users' accounts

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started

To get started with the PayTM Clone project, follow these steps:

1. **Clone the Repository**: Clone the repository from GitHub:

   ```
   git clone git@github.com:NawinKumarSharma/paytment-app.git
   ```

2. **Set Environment Variables**: Navigate to the `frontend` and `backend` folders and add necessary environment variables. You may need to create a `.env` file and configure it with required variables:
   In the backend/.env file:

   ```
   MONGODB_URI = your-mongo-url
   CORS_ORIGIN=*
   PORT = 3000
   JWT_SECRET = your-jwt-secret
   ```

   In the frontend/.env file:

   ```
   VITE_SERVER_URL = your-server-url
   ```
Replace the backend endpoints to your own, mainly in Frontend/src/pages portion.



3. **Install Dependencies**: Install dependencies in the `frontend` and `backend` folders using npm or yarn:

   ```
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. **Start the Backend Server**: In the `backend` folder, start the development server using npm:

   ```
   npm run dev
   ```

5. **Start the Frontend**: In the `frontend` folder, start the frontend application:

   ```
   npm run dev
   ```

## Database Transactions

This project implements MongoDB Transactions to ensure data consistency and reliability. Transactions follow the ACID properties of databases, ensuring that transactions are either fully completed and committed or reverted back in case of issues, thus preventing inconsistencies in the database.


## Author

**Author Name** &nbsp; : &nbsp; Nawin Kumar Sharma <br>

**GitHub URI** &nbsp; &nbsp; &nbsp; : &nbsp; [nawinkumarsharma](https://github.com/nawinkumarsharma)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)


## Contributions

Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.
