import React from 'react'

const Sidebar = () => {
  return (
    <div className='md:h-full w-full md:w-[20vw] pr-3  md:border-r-1 border-black/50 md:fixed z-5 flex flex-col gap-4 md:gap-0 mb-4 md:mb-0 items-start md:justify-start'>
        <div className='bg-black/10 py-2 px-4 md:mb-4 w-full rounded-lg'>Search</div>
        <ul className='flex flex-wrap md:gap-1 md:flex-col text-md gap-4'>
            <li>filter1</li>
            <li>filter2</li>
            <li>filter3</li>
            <li>filter4</li>
            <li>filter5</li>
        </ul>
    </div>
  )
}

export default Sidebar