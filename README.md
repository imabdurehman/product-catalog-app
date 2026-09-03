# TechShack – Full-Stack MERN Product Catalog

A full-stack e-commerce platform built with the MERN stack. The project includes a customer-facing product catalog, an admin dashboard for product management, JWT-based authentication, and a RESTful backend API.

## Features

### Client

- Responsive product catalog
- Product listing
- Product details
- Search products by name
- Filter products by category
- Sort products by:
  - Default
  - Price (Low to High)
  - Price (High to Low)
  - Rating
  - Name (A–Z)

- Load More functionality
- Shopping cart
- Add and remove products from cart
- Increase and decrease product quantity
- Dynamic cart count
- Real-time total price calculation
- Cart persistence using Local Storage
- Responsive design

### Admin Dashboard

- Admin login
- JWT authentication
- Protected product management routes
- View all products
- Add products
- Edit products
- Delete products
- Product count
- Category count
- Logout functionality
- Loading and error handling

### Backend

- RESTful API with Express.js
- MongoDB database with Mongoose
- Product CRUD operations
- JWT authentication
- HTTP-only cookie authentication
- Protected admin routes
- Input validation
- Error handling
- CORS configuration

## Tech Stack

### Client

- React.js
- React Router DOM
- Context API
- CSS Modules
- React Icons
- Local Storage

### Admin

- React.js
- React Router DOM
- Context API
- CSS Modules
- JWT authentication

### Server

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Cookie Parser
- CORS
- dotenv

## Project Structure

```text
TechShack/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── admin/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── server/
│   ├── src/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## API Endpoints

### Products

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/product`     | Get all products  |
| GET    | `/api/product/:id` | Get product by ID |
| POST   | `/api/product`     | Create product    |
| PUT    | `/api/product/:id` | Update product    |
| DELETE | `/api/product/:id` | Delete product    |

### Authentication

| Method | Endpoint            | Description  |
| ------ | ------------------- | ------------ |
| POST   | `/api/users/login`  | Admin login  |
| POST   | `/api/users/logout` | Admin logout |

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd TechShack
```

### Server

```bash
cd server
npm install
```

For development:

```bash
npx nodemon index.js
```

For production:

```bash
npm start
```

### Client

Open a new terminal:

```bash
cd client
npm install
npm start
```

### Admin

Open another terminal:

```bash
cd admin
npm install
npm start
```

## Environment Variables

Create a `.env` file in the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the `client` folder:

```env
REACT_APP_API_URL=your_backend_url
```

Create a `.env` file in the `admin` folder:

```env
REACT_APP_API_URL=your_backend_url
```

## Authentication

The admin dashboard uses JWT-based authentication.

After successful login, the JWT is stored in an HTTP-only cookie and automatically sent with authenticated requests.

The following product operations require authentication:

- Create product
- Update product
- Delete product

## Development Ports

```text
Client  → http://localhost:3000
Admin   → http://localhost:3001
Server  → http://localhost:8080
```

## Deployment

The project can be deployed using:

- Client → Vercel
- Admin → Vercel
- Server → Render
- Database → MongoDB Atlas

Production environment variables should be configured through the respective deployment platforms.

## Author

**Abdulrehman Siddiqi**

GitHub: https://github.com/imabdurehman

LinkedIn: https://www.linkedin.com/in/imabdurehman
