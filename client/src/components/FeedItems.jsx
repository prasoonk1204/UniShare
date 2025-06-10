import React, { useEffect, useState } from "react";

const FeedItems = () => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setFeedItems(storedPosts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:pl-4">
      {feedItems.length > 0 ? (
        feedItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col w-full bg-black/5 relative rounded-lg border border-black/20"
          >
            <div className="h-full">
              <img
                src={
                  item.photoName ? `/uploads/${item.photoName}` : "/item.jpg"
                }
                alt={item.itemName}
                className="h-50 w-full object-cover rounded-t-lg"
              />
            </div>

            <div className="p-4 flex flex-col justify-between w-full">
              <div>
                <h1 className="font-semibold text-xl">{item.itemName}</h1>
                <h2 className="text-gray-600 text-sm overflow-hidden mb-2">
                  By:{item.userName}
                </h2>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-black/10 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className=" text-white bg-blue-400 px-6 py-2 text-lg rounded-lg cursor-pointer hover:bg-blue-500 transition-all duration-300 md:self-end">
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
