import React from "react";
import ImageCard from "./ImageCard";

const PostGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => (
        <ImageCard key={post.$id} post={post} index={index} />
      ))}
    </div>
  );
};

export default PostGrid;
