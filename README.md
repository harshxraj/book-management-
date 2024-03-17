
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

<a href="https://gist.github.com/harshxraj/54d1aeaf93d67ae83d285981a4285049" target="_blank">db data</a>

## Preview


https://github.com/harshxraj/book-management-/assets/128404446/da66af53-bbd4-4517-b556-cf44c4a89566

## Screenshot
- Register / Login Page![Screenshot 2024-03-17 172443](https://github.com/harshxraj/book-management-/assets/128404446/8f996c61-ca92-46d2-959d-8273d80d669d)
![Screenshot 2024-03-17 172449](https://github.com/harshxraj/book-management-/assets/128404446/bf16ab46-1a63-4eee-bbf6-df84e8b8afc4)

- Dashboard (Admin)![Screenshot 2024-03-17 172510](https://github.com/harshxraj/book-management-/assets/128404446/c456a56a-8d77-4546-89d2-3471dfe07102)

- Books (Admin)![Screenshot 2024-03-17 172519](https://github.com/harshxraj/book-management-/assets/128404446/664b2150-8a5d-42a6-ae0e-14439a38d3cb)

- Book Creation (Admin)![Screenshot 2024-03-17 172537](https://github.com/harshxraj/book-management-/assets/128404446/c005f8ab-c28e-4e0f-af5f-383f8fe79ae9)

- Dashboard (normal user)![Screenshot 2024-03-17 172558](https://github.com/harshxraj/book-management-/assets/128404446/42602dc7-6599-4485-a607-5e1eecf68ee5)

- Books (normal user)![Screenshot 2024-03-17 172603](https://github.com/harshxraj/book-management-/assets/128404446/73c4a4dc-4472-480e-9790-376c5a5d2b3c)

  
