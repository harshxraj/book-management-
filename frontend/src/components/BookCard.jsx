import React from "react";
import { Button } from "antd";

const statusColors = {
  available: "bg-green-600",
  borrowed: "bg-blue-500",
  bought: "bg-red-500",
};

const BookCard = ({ title, author, genre, description, image, status }) => {
  return (
    <div className="border p-4 bg-gray-100 border-black/15 rounded-md flex items-center relative">
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
        <Button className="bg-green-300 mr-4 mt-3">Buy</Button>
        <Button className="bg-yellow-300">Borrow</Button>
      </div>
    </div>
  );
};

export default BookCard;
