import { useState } from "react";
import Select from "react-select";

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

const Sidebar = ({ onFilter }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onFilter(
      text,
      selectedTags.map((t) => t.value)
    );
  };

  const handleTagsChange = (tags) => {
    setSelectedTags(tags || []);
    onFilter(
      searchText,
      (tags || []).map((t) => t.value)
    );
  };

  const handleClear = () => {
    setSearchText("");
    setSelectedTags([]);
    onFilter("", []);
  };

  return (
    <div className="md:h-full w-full md:w-[20vw] pr-3 md:fixed z-5 flex flex-col gap-4 md:gap-0 mb-4 md:mb-0 items-start md:justify-start">
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search items..."
        className="w-full p-2 bg-black/10 rounded-lg mb-2"
      />

      <Select
        isMulti
        options={tagOptions}
        value={selectedTags}
        onChange={handleTagsChange}
        placeholder="Filter by tags..."
        className="w-full mb-2"
      />

      <button
        onClick={handleClear}
        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;
