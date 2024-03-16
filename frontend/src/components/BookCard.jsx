import React from "react";
import { Button, Tooltip } from "antd";
import {
  BORROW_BOOK_MUTATION,
  BUY_BOOK_MUTATION,
  DROP_BOOK_MUTATION,
} from "../../graphql/mutations/user.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

const statusColors = {
  available: "bg-green-600",
  borrowed: "bg-blue-500",
  bought: "bg-red-500",
};

const BookCard = ({
  title,
  author,
  genre,
  description,
  image,
  status,
  _id,
  owner,
}) => {
  const { data, error: authErr } = useQuery(GET_AUTHENTICATED_USER);
  const role = data?.authUser?.role;
  const [buyBook, { loading: buyLoading, error }] = useMutation(
    BUY_BOOK_MUTATION,
    {
      refetchQueries: ["GetBook", "GetOwnedBook"],
    }
  );
  const [borrowBook, { loading: borrowLoading, error: borrowError }] =
    useMutation(BORROW_BOOK_MUTATION, {
      refetchQueries: ["GetBook", "GetBorrowedBook"],
    });
  const [dropBook, {}] = useMutation(DROP_BOOK_MUTATION, {
    refetchQueries: ["GetOwnedBook", "GetBorrowedBook", "GetBook"],
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const handleBuyBook = async (id) => {
    try {
      const data = await buyBook({
        variables: {
          bookId: id,
        },
      });
      toast.success("Book Bought Sucessfully! Check your collections 👍");
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBorrowBook = async (id) => {
    try {
      const data = await borrowBook({
        variables: {
          bookId: id,
        },
      });

      toast.success("Book borrowed Sucessfully! Check your collections 👍");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropBook = async (id) => {
    try {
      const data = await dropBook({
        variables: {
          bookId: id,
        },
      });

      toast.success("Book dropped Sucessfully! Check your collections 👍");

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="border p-4 bg-gray-100 border-black/15 rounded-md flex items-center relative"
      onClick={() => console.log(owner.name)}
    >
      <div
        className={`absolute top-5 left-4 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 ${statusColors[status]} text-white  px-2 rounded-md capitalize`}
      >
        {status}
      </div>
      <div className="hidden md:block">
        <img src={image} alt="" className="w-40 h-40 object-cover rounded-md" />
      </div>
      <div className="w-[90%] ml-4">
        <h1 className="text-xl sm:text-normal">
          <span className="text-sky-600"> Title: </span>
          {title}
        </h1>
        <p className="text-xl">
          <span className="text-sky-600">Author:</span> {author}
        </p>
        <p className="text-xl">
          <span className="text-sky-600">Genre: </span>
          {genre}
        </p>
        <p className="line-clamp-2">{description}</p>
        {pathname != "/" && role !== "admin" && (
          <>
            <Tooltip
              placement="topLeft"
              title={status !== "available" ? `Owned by ${owner?.name}` : ""}
            >
              <Button
                className="bg-green-500 mr-4 mt-3 text-white"
                onClick={() => handleBuyBook(_id)}
                disabled={status != "available"}
              >
                {buyLoading ? "Buying..." : "Buy"}
              </Button>
            </Tooltip>

            <Tooltip
              placement="topLeft"
              title={status !== "available" ? `Owned by ${owner?.name}` : ""}
            >
              <Button
                className="bg-yellow-500 text-white"
                onClick={() => handleBorrowBook(_id)}
                disabled={status != "available"}
              >
                {borrowLoading ? "Borrowing..." : "Borrow"}
              </Button>
            </Tooltip>
          </>
        )}

        {role === "admin" && owner !== null && owner?.name !== null && (
          <div className="bg-green-600 flex items-center justify-center text-white p-1 mt-2 rounded-md">
            {" "}
            Owned by: {owner?.name}
          </div>
        )}

        {pathname == "/" && (
          <div>
            <Button
              className="bg-sky-400 text-white mt-2 hover:cursor-pointer"
              onClick={() => handleDropBook(_id)}
            >
              Drop Book
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
