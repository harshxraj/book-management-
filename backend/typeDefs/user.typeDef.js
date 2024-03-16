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
