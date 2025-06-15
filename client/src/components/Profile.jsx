import React from 'react'

const Profile = () => {

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <div>
      <button className='bg-gray-300 p-4' onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default Profile