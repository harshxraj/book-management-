import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  name: "",
  all_books: [],
  owned_books: [],
  borrowed_books: [],
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setBooks: (state, { payload }) => {
      state.all_books = payload;
    },
    setOwnedBooks: (state, { payload }) => {
      state.owned_books = payload;
    },
    setBorrowedBooks: (state, { payload }) => {
      state.borrowed_books = payload;
    },
    addBook: (state, { payload }) => {
      state.all_books.push(payload);
    },
    buyBook: (state, { payload }) => {
      state.owned_books.push(payload);
      state.all_books.push(payload);
    },
  },
});

export const {
  authenticate,
  logout,
  setBooks,
  setOwnedBooks,
  setBorrowedBooks,
  addBook,
  buyBook,
} = userSlice.actions;
export default userSlice.reducer;
