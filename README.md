## **Book Management App**
This is a Full-Stack MERN application built with GraphQL for managing books and users, integrated with MongoDB for database storage. 
It provides functionalities for users to browse, search, borrow, and buy books from the library, with authentication and authorization features implemented using passport.js.

## Features
- User Authentication: Users can register, login, and logout securely. Different roles (admin, regular user) are implemented with appropriate permissions.
- Admins can add new books to the library.
- Users can browse and search for available books.
- Users can borrow or buy books from the library.
- Each book can only be owned by one user at a time.
- Users can request to borrow a book from another user, and upon approval, the ownership is transferred.

## Technologies Used
- **GraphQL**: A query language for APIs that enables efficient data fetching.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development.
- **Express.js**: A minimalist web framework for Node.js that simplifies building web applications and APIs.
- **MongoDB**: A NoSQL document-oriented database for storing data in flexible, JSON-like documents.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js that provides a schema-based solution to model application data.
- **Passport.js**: An authentication middleware for Node.js that provides a simple and modular way to authenticate requests.
- **Ant Design**: A design system and React UI library with a set of high-quality components for building elegant user interfaces.
- **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development by providing pre-defined utility classes for styling elements.
- **Redux Toolkit**: An opinionated, batteries-included toolset for efficient Redux development, providing utilities and best practices out of the box.

  ## Get Started:
1. **Clone the Repository**:

   ```bash
   git clone https://github.com/harshxraj/book-management-.git
   ```

2. **Install Backend Dependencies**:

   ```bash
   cd backend
   npm install
   ```

3. **Backend (.env)**

 Create a file named `.env` in the `backend` directory and add the following environment variables:

  ```
  MONGO_URI=
  SESSION_SECRET=
  ```
4. **Install Frontend Dependencies**:

   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Backend Server**:

   ```bash
   npm run start
   ```

6. **Start the Frontend Development Server**:

   ```bash
   npm run dev
   ```
**Admin credentials - [email - admin@gmail.com] [password - 123]**

**Normal user credentials - [email - user@gmail.com] [password - 123]**

<a href="https://gist.github.com/harshxraj/3897a4a0bcef1a2153d3790029e9902d" target="_blank">typeDefs</a>

<a href="https://gist.github.com/harshxraj/69e1b1d70278947e14ce60f3ab710391" target="_blank">resolvers</a>

<a href="https://gist.github.com/harshxraj/745d877353f3ddd99c5bc0f98ceef38d" target="_blank">queries</a>

