import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const Post = () => {

  const navigate = useNavigate()

  const [photo, setPhoto] = useState(null);
  const [itemName, setItemName] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !itemName ||
      !tags ||
      !photo 
    ) {
      return alert("Please fill all fields and upload photo");
    }

    try{
      const token = localStorage.getItem("token");

      const newPost = {
        itemName,
        photo,
        tags,
        createdAt: new Date().toISOString(),
      };

      await axios.post(`${BACKEND_URL}/post/new`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setItemName("");
      setPhoto(null);
      setTags([]);
      setTagInput("");

      window.alert("Posted successfully");

      navigate("/");
    }catch(err){
      console.error(err);
      alert(err.response?.data?.error || "Submission failed.");
    }

    
  };

  return (
    <div className="w-[60vw] mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Share an Item</h2>

      <div>
        <label className="block text-gray-700 font-medium">Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g., Table Fan, Textbook"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Item Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
        />
        {photo && (
          <p className="mt-2 text-sm text-gray-600">Selected: {photo.name}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Tags</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(i)}
                className="ml-2 text-red-500 hover:text-red-700 text-xl"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Post Item
        </button>
      </div>
    </div>
  );
};

export default Post;