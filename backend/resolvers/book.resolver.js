import Book from "../models/book.model.js";
import User from "../models/user.model.js";

const bookResolver = {
  Query: {
    books: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthorized");
        const user = await context.getUser();
        const role = user.role;
        console.log(role);

        const books = await Book.find({})
          .populate("created_by")
          .populate("owner");
        return books;
      } catch (err) {
        console.error("Error getting books:", err);
        throw new Error("Error getting books");
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

        // Add additional filtering based on filterQuery if provided
        if (filterQuery) {
          // Example: Filtering by genre
          searchCriteria.status = filterQuery;
        }

        const books = await Book.find(searchCriteria);
        return books;
      } catch (error) {
        console.error("Error searching books:", error);
        throw new Error("Failed to search books");
      }
    },
    // searchBooks: async (_, { query }) => {
    //   try {
    //     const books = await Book.find({
    //       $or: [
    //         { title: { $regex: query, $options: "i" } },
    //         { author: { $regex: query, $options: "i" } },
    //       ],
    //     });

    //     return books;
    //   } catch (error) {
    //     console.error("Error searching books:", error);
    //     throw new Error("Failed to search books");
    //   }
    // },
  },
  Mutation: {
    addBook: async (_, { input }, context) => {
      try {
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
  },
};

export default bookResolver;
