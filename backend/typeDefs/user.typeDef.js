const userTypeDef = `#graphql
   type User{
    _id: ID!
    email: String!
    name: String!
    password: String!
    role: String!
    owned_books: [Book]!
    borrowed_books: [Book]!
   }

   type Query{
    authUser: User
    user(userId: ID): User!
    owned_books: [Book]!
    borrowed_books: [Book]!
   }

   type Mutation{
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    buyBook(bookId: ID!): Book
    dropBook(bookId: ID!): Book
    borrowBook(bookId: ID!): Book
    logout: LogoutResponse
   }

   input SignUpInput{
    email: String!
    name: String!
    password: String!
   }

   input LoginInput{
    email: String!
    password: String!
   }

   type LogoutResponse {
    message: String!
   }

`;

export default userTypeDef;
