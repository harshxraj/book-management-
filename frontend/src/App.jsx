import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Books";
import Lectures from "./pages/Lectures";
import { useQuery } from "@apollo/client";
import {
  GET_AUTHENTICATED_USER,
  GET_BORROWED_BOOKS,
  GET_OWNED_BOOKS,
} from "../graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import Books from "./pages/Books";
import { GET_BOOKS, SEARCH_BOOKS_QUERY } from "../graphql/queries/book.query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBooks, setBorrowedBooks, setOwnedBooks } from "../redux/user.slice";

function App() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(SEARCH_BOOKS_QUERY, {
    variables: { query: "code" },
  });
  if (error) console.log("ERROR", err);

  console.log("QUER", data);
  const {
    loading: userLoading,
    data: userData,
    error: userError,
  } = useQuery(GET_AUTHENTICATED_USER);

  const {
    loading: ownedBookLoading,
    data: ownedBookData,
    error: ownedBookError,
  } = useQuery(GET_OWNED_BOOKS);
  console.log("OWNED BOOKS", ownedBookData);

  const {
    loading: bookLoading,
    data: AllbookData,
    error: bookError,
  } = useQuery(GET_BOOKS);
  console.log("BOOKS", AllbookData);

  const {
    loading: borrowedBookLoading,
    data: borrowedBookData,
    error: borrowedBookError,
  } = useQuery(GET_BORROWED_BOOKS);
  console.log(borrowedBookData);

  useEffect(() => {
    if (!bookLoading) {
      dispatch(setBooks(AllbookData.books));
    }
  }, [bookLoading, AllbookData, dispatch]);

  useEffect(() => {
    if (!ownedBookLoading) {
      dispatch(setOwnedBooks(ownedBookData.owned_books));
    }
  }, [ownedBookData, ownedBookLoading, dispatch]);

  useEffect(() => {
    if (!borrowedBookLoading) {
      dispatch(setBorrowedBooks(borrowedBookData.borrowed_books));
    }
  }, [borrowedBookData, borrowedBookLoading, dispatch]);

  if (userLoading) return null;
  if (userError) return <p>Error fetching user data</p>;

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            userData?.authUser ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        {/* <Route
          path="/books"
          element={userData?.authUser ? <Books /> : <Navigate to="/login" />}
        /> */}

        <Route
          path="/books"
          element={userData?.authUser ? <Books /> : <Navigate to="/login" />}
        />
        <Route path="/lectures" element={<Lectures />} />

        <Route
          path="/register"
          element={!userData.authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData.authUser ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
