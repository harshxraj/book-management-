import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      name
      role
    }
  }
`;

export const GET_OWNED_BOOKS = gql`
  query GetOwnedBook {
    owned_books {
      _id
      title
      description
      image
      genre
      author
      created_by {
        _id
        name
        email
      }
      owner {
        _id
        name
        email
      }
      status
    }
  }
`;

export const GET_BORROWED_BOOKS = gql`
  query GetBorrowedBook {
    borrowed_books {
      _id
      title
      description
      image
      genre
      author
      created_by {
        _id
        name
        email
      }
      owner {
        _id
        name
        email
      }
      status
    }
  }
`;
