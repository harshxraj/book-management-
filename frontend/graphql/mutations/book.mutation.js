import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($input: BookInput!) {
    addBook(input: $input) {
      _id
      title
      description
      author
      genre
      image
    }
  }
`;
