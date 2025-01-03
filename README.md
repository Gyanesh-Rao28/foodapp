
# Food Delivery App Backend

A backend API for a food delivery application built with Node.js, Express, and MongoDB.

## Folder Structure
```
src/
├── controllers/        # Route handlers for different entities
├── middlewares/       # Custom middleware functions
├── models/           # Database models/schemas
│   ├── menu.model.js
│   ├── order.model.js
│   └── user.model.js
├── routes/           # API route definitions
│   ├── menu.route.js
│   ├── order.route.js
│   └── user.route.js
├── utils/            # Utility functions
│   └── db.js        # Database connection
└── index.js         # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000                   # Port number for server
MONGO_URI=<your_mongo_uri>  # MongoDB connection string 
JWT_SECRET=<your_secret>    # Secret key for JWT
```

## API Endpoints

### User Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/getUser` - Get user details (Protected)

### Menu Operations
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item (Protected)
- `PUT /api/menu/:id` - Update menu item (Protected)
- `DELETE /api/menu/:id` - Delete menu item (Protected)

### Order Operations  
- `POST /api/food/order` - Place new order (Protected)
- `GET /api/food/orders` - Get user's orders (Protected)

## Setup Instructions

1. Clone repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with required variables

4. Start development server:
```bash
npm run dev
```

5. For production:
```bash 
npm start
```

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Required Dependencies
```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5", 
  "dotenv": "^16.0.3",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.0",
  "mongoose": "^7.0.3"
}
```

