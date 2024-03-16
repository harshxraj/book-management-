const bookTypeDef = `#graphql
 type Book {
  _id: ID!
  title: String!
  author: String!
  genre: String!
  description: String!
  image: String!
  created_by: User! 
  owner: User
  status: String!
}

type Query {
  books: [Book]!
  searchBooks(query: String!, filterQuery: String): [Book]
  book(bookId: ID!): Book
}

type Mutation {
  addBook(input: BookInput!): Book!
  updateBook(bookId: ID!, input: BookInput!): Book!
  deleteBook(bookId: ID!): Book
}

input BookInput {
  title: String!
  author: String!
  genre: String!
  description: String!
  image: String!
}

`;

export default bookTypeDef;
