import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import bookResolver from "./book.resolver.js";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId).populate(
          "owned_books borrowed_books"
        );
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        console.error("Error getting user:", error);
        throw new Error("Error getting user");
      }
    },
    owned_books: async (_, __, context) => {
      try {
        console.log("inside");
        // if (!context.getUser()) throw new Error("Unauthorized");
        if (!context.getUser()) {
          return [];
        }

        if (context.getUser().role !== "user") {
          return [];
        }
        const id = context.getUser()._id;
        const user = await User.findById(id).populate("owned_books");

        const ownedBooks = user.owned_books;

        const populatedOwnedBooks = await Book.populate(ownedBooks, [
          { path: "created_by" },
          { path: "owner" },
        ]);

        return populatedOwnedBooks;
      } catch (err) {
        console.error(err);
        throw new Error(err.message || "Error getting user");
      }
    },

    borrowed_books: async (_, __, context) => {
      try {
        // if (!context.getUser()) throw new Error("Unauthorized");
        if (!context.getUser()) {
          return [];
        }
        if (context.getUser().role !== "user") {
          return [];
        }
        const id = await context.getUser()._id;
        const user = await User.findById(id).populate("borrowed_books");

        const borrowedBooks = user.borrowed_books;

        const populatedBorrowedBooks = await Book.populate(borrowedBooks, [
          { path: "created_by" },
          { path: "owner" },
        ]);

        return populatedBorrowedBooks;
      } catch (err) {
        console.log(err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { name, email, password } = input;
        console.log("input", input);

        if (!name || !email || !password) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
          email,
          name,
          password: hashedPassword,
        });

        await newUser.save();
        await context.login(newUser);

        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { email, password } = input;
        if (!email || !password) throw new Error("All fields are required");
        const { user } = await context.authenticate("graphql-local", {
          email,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    buyBook: async (_, { bookId }, context) => {
      try {
        const user_id = await context.getUser()._id;

        const user = await User.findById(user_id);

        user.owned_books.push(bookId);
        await user.save();

        const book = await Book.findById(bookId);
        book.status = "bought";
        book.owner = user_id;
        await book.save();

        return book;
      } catch (error) {
        console.error("Error buying book:", error);
        throw error;
      }
    },
    borrowBook: async (_, { bookId }, context) => {
      try {
        const user_id = await context.getUser()._id;

        const user = await User.findById(user_id);

        user.borrowed_books.push(bookId);
        await user.save();

        const book = await Book.findById(bookId);
        book.status = "borrowed";
        book.owner = user_id;
        await book.save();

        return book;
      } catch (error) {
        console.error("Error borrowing book:", error);
        throw error;
      }
    },
    dropBook: async (_, { bookId }, context) => {
      try {
        const user_id = await context.getUser()._id;

        const user = await User.findById(user_id);

        user.owned_books = user.owned_books.filter(
          (book) => book.toString() !== bookId
        );

        user.borrowed_books = user.borrowed_books.filter(
          (book) => book.toString() !== bookId
        );
        await user.save();

        const book = await Book.findById(bookId);
        book.status = "available";
        book.owner = null;

        await book.save();

        return book;
      } catch (error) {
        console.error("Error dropping book:", error);
        throw error;
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
