import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBook {
    books {
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

export const SEARCH_BOOKS_QUERY = gql`
  query SearchBooks($query: String!, $filterQuery: String) {
    searchBooks(query: $query, filterQuery: $filterQuery) {
      _id
      title
      description
      image
      genre
      author
      status
      owner {
        name
      }
    }
  }
`;
