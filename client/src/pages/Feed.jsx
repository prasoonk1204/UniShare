import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FeedItems from "../components/FeedItems";

const Feed = () => {
  const [filters, setFilters] = useState({ search: "", tags: [] });

  const handleFilter = (search, tags) => {
    setFilters({ search, tags });
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <Sidebar onFilter={handleFilter} />
      <div className="md:w-[26vw] md:h-full"></div>
      <FeedItems filters={filters} />
    </div>
  );
};

export default Feed;
