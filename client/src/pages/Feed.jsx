import React from 'react'
import Sidebar from '../components/Sidebar'
import FeedItems from '../components/FeedItems'


const Feed = () => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <Sidebar />
      <div className="md:w-[26vw] md:h-full"></div>
      <FeedItems />
    </div>
  );
}

export default Feed