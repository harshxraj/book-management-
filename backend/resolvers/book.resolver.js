import Book from "../models/book.model.js";
import User from "../models/user.model.js";

const bookResolver = {
  Query: {
    books: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user = await context.getUser();

        const books = await Book.find({})
          .populate("created_by")
          .populate("owner");
        return books;
      } catch (err) {
        console.error("Error getting books:", err);
        throw new Error("Error getting books");
      }
    },
    book: async (_, { bookId }) => {
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error("Book not found");
        }
        return book;
      } catch (error) {
        console.error("Error getting book:", error);
        throw new Error("Error getting book");
      }
    },
    searchBooks: async (_, { query, filterQuery }) => {
      try {
        console.log("filterQuery", filterQuery);
        let searchCriteria = {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { author: { $regex: query, $options: "i" } },
          ],
        };

        if (filterQuery) {
          searchCriteria.status = filterQuery;
        }

        const books = await Book.find(searchCriteria).populate("owner");
        return books;
      } catch (error) {
        console.error("Error searching books:", error);
        throw new Error("Failed to search books");
      }
    },
  },
  Mutation: {
    addBook: async (_, { input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user_role = await context.getUser().role;

        if (user_role !== "admin") {
          throw new Error("Only admins can add books");
        }

        const newBook = new Book({
          ...input,
          created_by: context.getUser()._id,
        });
        await newBook.save();
        return newBook;
      } catch (err) {
        console.error("Error creating Book", err);
        throw new Error("Error creating Book");
      }
    },

    updateBook: async (_, { bookId, input }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user_role = await context.getUser().role;

        if (user_role !== "admin") {
          throw new Error("Only admins can update books");
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, input, {
          new: true,
        });
        return updatedBook;
      } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Error updating book");
      }
    },

    deleteBook: async (_, { bookId }, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user_role = await context.getUser().role;

        if (user_role !== "admin") {
          throw new Error("Only admins can delete books");
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);
        return deletedBook;
      } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Error deleting book");
      }
    },
  },
};

export default bookResolver;
