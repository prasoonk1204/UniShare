import axios from "axios";
import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const MyPostItems = ({ filters }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`${BACKEND_URL}/post/all`)
      .then((res) => {
        const userPosts = res.data.filter((post) => post.userId === userId);
        setMyPosts(userPosts);
        setDisplayItems(userPosts);
      })
      .catch((err) => console.error("Fetching posts failed:", err));
  }, []);

  useEffect(() => {
    let filtered = myPosts;

    if (filters.search) {
      filtered = filtered.filter((item) =>
        item.itemName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter((item) =>
        filters.tags.every((tag) => item.tags.includes(tag))
      );
    }

    setDisplayItems(filtered);
  }, [filters, myPosts]);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) return alert("You're not authenticated");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BACKEND_URL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyPosts((prev) => prev.filter((post) => post._id !== postId));
      alert("Post deleted successfully");
    } catch (err) {
      console.error("Deletion failed:", err);
      alert("Could not delete the post");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:w-[80vw] md:pl-16">
      {displayItems.length > 0 ? (
        displayItems.map((item) => (
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
                  {item.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-black/10 px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-white bg-red-500 px-4 py-2 text-[16px] md:text-lg rounded-lg cursor-pointer hover:bg-red-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center text-gray-600">
          You haven't posted anything yet.
        </div>
      )}
    </div>
  );
  
};

export default MyPostItems;
