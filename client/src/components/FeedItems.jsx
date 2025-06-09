import React from "react";

const FeedItems = () => {
  const feedItems = [
    {
      id: 1,
      name: "Feed Item 1",
      author: "Author 1",
      pic: "/item.jpg",
      tags: ["tag1", "tag2"],
    },
    {
      id: 2,
      name: "Feed Item 2",
      author: "Author 2",
      pic: "/item.jpg",
      tags: ["tag1", "tag2"],
    },
    {
      id: 3,
      name: "Feed Item 3",
      author: "Author 3",
      pic: "/item.jpg",
      tags: ["tag1", "tag2"],
    },
    {
      id: 4,
      name: "Feed Item 3",
      author: "Author 3",
      pic: "/item.jpg",
      tags: ["tag1", "tag2"],
    },
    // Add more items as needed
  ];

  return { feedItems } ? <div className="flex flex-col gap-4 w-full md:pl-4 ">
    {feedItems.map((item) => {
      return (
        <div className="flex w-full bg-black/5 h-35 relative rounded-lg border-1 border-black/50">
          <div className="h-full">
            <img src={item.pic} alt="" className="h-full w-55 object-cover rounded-bl-lg rounded-tl-lg" />
          </div>
          <div className="px-2 py-4 flex flex-col justify-between w-full">
            <div>
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <h2>{item.author}</h2>
            </div>

            <div className="flex gap-2 flex-wrap">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-black/10 p-1 rounded-md text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="absolute right-4 top-4 text-white bg-blue-400 px-3 py-1 text-sm rounded-lg cursor-pointer hover:bg-blue-500 transition-all duration-300">
            Request
          </button>
        </div>
      );
    })}
  </div> : <div>UFaigef</div>;
};

export default FeedItems;
