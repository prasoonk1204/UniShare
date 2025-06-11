import axios from "axios";
import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const FeedItems = () => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/post/all`)
      .then((res) => setFeedItems(res.data))
      .catch((err) => console.error("Fetching posts failed:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full md:pl-4">
      {feedItems.length > 0 ? (
        feedItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col w-full bg-black/5 relative rounded-lg border border-black/20"
          >
            <div className="h-full">
              <img
                src={item.photoUrl}
                alt={item.itemName}
                className="h-60 w-full object-cover rounded-t-lg"
              />
            </div>

            <div className="p-4 flex justify-between items-start w-full">
              <div className="w-2/3">
                <h1 className="font-semibold text-xl">{item.itemName}</h1>
                <h2 className="text-gray-600 text-sm overflow-hidden mb-2">
                  By : {item.userName}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-black/10 px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
                <button className=" text-white bg-blue-400 px-4 py-2 text-[16px] md:text-lg rounded-lg cursor-pointer hover:bg-blue-500 transition-all duration-300 ">
                  Request
                </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center text-gray-600">
          No posts available.
        </div>
      )}
    </div>
  );
};

export default FeedItems;
