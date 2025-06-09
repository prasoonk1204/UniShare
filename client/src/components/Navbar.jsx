import React from 'react'
import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="flex bg-black/5 backdrop-blur-lg justify-between items-center h-12  p-4 my-2 mx-4 sm:mx-10 md:mx-20 fixed top-0 left-0 right-0 z-10 rounded-lg ">
      <div className="font-bold">Logo</div>
      <div className="flex gap-12 text-sm">
        <Link to="/">Feed</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/myposts">My Posts</Link>
      </div>
      <div>
        <ul className="flex gap-6">
          <li>N</li>
          <Link to="/profile">Profile</Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar