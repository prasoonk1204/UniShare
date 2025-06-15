import React from 'react'
import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="flex bg-black/5 backdrop-blur-lg justify-between items-center h-12 py-8 w-full px-4 sm:px-10 md:px-20 fixed top-0 left-0 right-0 z-10 rounded-lg mix-blend-difference text-white  ">
      <div className="font-bold text-lg w-[91px]">Logo</div>
      <div className="flex gap-12 text-md">
        <Link to="/">Feed</Link>
        <Link to="/requests">Requests</Link>
        <Link to="/myposts">My Posts</Link>
      </div>
      <div>
        <ul className="flex gap-6  text-lg">
          <li>N</li>
          <Link to="/profile">Profile</Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar