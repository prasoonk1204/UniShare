import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Select from "react-select";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5555";

const Post = () => {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [itemName, setItemName] = useState("");
  const [tags, setTags] = useState([]);

  const predefinedTags = [
    "Book",
    "Stationery",
    "Calculator",
    "Electronics",
    "Kit",
    "Notes",
    "Question paper",
  ];

  const tagOptions = predefinedTags.map((tag) => ({ label: tag, value: tag }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !tags.length || !photo) {
      return alert("Please fill all fields and upload photo");
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("itemName", itemName);
      formData.append("photo", photo);
      formData.append(
        "tags",
        JSON.stringify(tags.map((tag) => tag.value))
      );
      formData.append("createdAt", new Date().toISOString());

      await axios.post(`${BACKEND_URL}/post/new`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setItemName("");
      setPhoto(null);
      setTags([]);

      window.alert("Posted successfully");
      navigate("/");
    } catch (err) {
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
        <Select
          isMulti
          options={tagOptions}
          value={tags}
          onChange={(selected) => setTags(selected)}
          className="react-select-container mt-1"
          classNamePrefix="react-select"
          placeholder="Select tags..."
        />
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
