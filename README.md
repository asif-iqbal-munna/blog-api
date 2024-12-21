# Blog API

## Overview

Blog API is a blogging platform where users can create, update, and delete their blogs. There is Admin role who can manage users and their blogs. This project has CURD opersations, secure authentication and authorization.


## Demo Link:  [Open =>](https://blog-api-seven-eta.vercel.app/api/)
- API BASE URL
```bash
  https://bike-store-flame.vercel.app/api/
```

---

## Technologies Used

- **Backend Framework**: Express.js
- **Programming Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Zod
- **ODM**: Mongoose
- **Environment Management**: dotenv
- **Testing**: Postman

---

## Setup and Installation

### Prerequisites

- Node.js (>= 16.x)
- MongoDB (local or cloud instance)
- npm (comes with Node.js)

### Steps

#### 1. Clone the repository:
   ```bash
   git clone https://github.com/asif-iqbal-munna/blog-api
   cd blog-api
  ```

 #### 2. Install Dependencies

  ```bash
  npm install
  ```
#### 3. Set Up Environment Variables: Create a .env file in the root directory and configure the variables listed here.

```plaitext
PORT=5000                  # Port for the server
MONGO_URI=mongodb://...    # MongoDB connection string
BCRYPT_SALT_ROUNDS=        # Round Number
JWT_SECRET=                # JWT Secret
JWT_EXPIRES_IN=            # JWT Expiry Time
```
 #### 2. Start the Application:
   ```bash
  npm run dev
  ```

## Project Structure
```bash
src/
├── config/           # Database and app configuration
├── modules/          # API controllers for products and orders
├── routes/           # Express route definitions
├── middlewares/      # Custom middleware (error handling, validation)
├── utils/            # Helper functions (e.g., response handlers)
├── app.ts            # App initialization
└── server.ts         # Entry point to the application


```

## API Endpoints

### 1\. Authentication

#### 1.1 Register User

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

####   

#### 1.2 Login User

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

###   

### 2\. Blog Management

#### 2.1 Create Blog

**POST** `/api/blogs`

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

####   

#### 2.2 Update Blog

**PATCH** `/api/blogs/:id`

**Request Body:**

```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

####   

#### 2.3 Delete Blog

**DELETE** `/api/blogs/:id`


####   

#### 2.4 Get All Blogs (Public)

**GET** `/api/blogs`

**Query Parameters**:

*   `search`: Search blogs by title or content (e.g., `search=blogtitle`).
*   `sortBy`: Sort blogs by specific fields such as `createdAt` or `title` (e.g., `sortBy=title`).
*   `sortOrder`: Defines the sorting order. Accepts values `asc` (ascending) or `desc` (descending). (e.g., `sortOrder=desc`).
*   `filter`: Filter blogs by author ID (e.g., `author=authorId`).


**Example Request URL**:

```sql
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=60b8f42f9c2a3c9b7cbd4f18
```  

###   

### 3\. Admin Actions

#### 3.1 Block User

**PATCH** `/api/admin/users/:userId/block`

####   

#### 3.2 Delete Blog

**DELETE** `/api/admin/blogs/:id`

* * *
