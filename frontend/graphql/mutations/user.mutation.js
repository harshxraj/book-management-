import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      _id
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const BUY_BOOK_MUTATION = gql`
  mutation BuyBook($bookId: ID!) {
    buyBook(bookId: $bookId) {
      _id
      title
      description
      author
      genre
      image
    }
  }
`;

export const BORROW_BOOK_MUTATION = gql`
  mutation BorrrowBook($bookId: ID!) {
    borrowBook(bookId: $bookId) {
      _id
      title
      description
      author
      genre
      image
    }
  }
`;

export const DROP_BOOK_MUTATION = gql`
  mutation DropBook($bookId: ID!) {
    dropBook(bookId: $bookId) {
      _id
      title
      description
      author
      genre
      image
    }
  }
`;
