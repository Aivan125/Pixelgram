import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/LazyImage";
import React, { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const PostAndSavesGrid = ({ user }) => {
  const [displayPosts, setDisplayPosts] = useState(true);
  const [displaySaved, setDisplaySaved] = useState(false);

  const handlePosts = () => {
    setDisplaySaved(false);
    setDisplayPosts(true);
  };

  const handleSaved = () => {
    setDisplaySaved(true);
    setDisplayPosts(false);
  };

  return (
    <section className="flex flex-col justify-center">
      <nav className="flex items-center justify-center gap-10">
        <Button
          variant="dropdownMenu"
          className={`flex items-center justify-center gap-1 ${displayPosts && "bg-gray-900/90"}`}
          onClick={handlePosts}
        >
          <IoGridOutline className="text-lg text-purple-700" />{" "}
          <p className="text-xl uppercase">Posts</p>
        </Button>
        <Button
          variant="dropdownMenu"
          className={`flex items-center justify-center gap-1 ${displaySaved && "bg-gray-900/90"}`}
          onClick={handleSaved}
        >
          <FaRegBookmark className="text-lg text-purple-700" />{" "}
          <p className="text-xl uppercase">Saved</p>
        </Button>
      </nav>
      <ul className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {displayPosts &&
          user?.posts?.map((post, index) => (
            <li key={post.$id} className="overflow-hidden rounded-lg">
              <Link to={`/post/${post.$id}`}>
                <LazyImage
                  src={post.imageUrl}
                  alt="Photo"
                  className="overflow-hidden rounded-lg object-cover transition-all duration-300 hover:scale-[105%]"
                  width="100%"
                  height="auto"
                  isFirstImage={index < 9}
                  skeletonClassName="bg-gray-700"
                  rootMargin="200px"
                  threshold={0.1}
                  errorMessage="Error loading image"
                />
              </Link>
            </li>
          ))}
        {displaySaved ? (
          user?.saves?.length > 0 ? (
            user?.saves?.map((save) => (
              <li key={save.post.$id}>
                <Link to={`/post/${save.post.$id}`}>
                  <LazyImage
                    src={save.post.imageUrl}
                    alt="Photo"
                    className="rounded-lg object-cover"
                    skeletonClassName="bg-gray-700"
                    rootMargin="400px 0px"
                    threshold={0}
                    errorMessage="Error loading image"
                  />
                </Link>
              </li>
            ))
          ) : (
            <p className="whitespace-nowrap text-xl text-gray-400">
              There are not posts saved
            </p>
          )
        ) : (
          ""
        )}
      </ul>
    </section>
  );
};

export default PostAndSavesGrid;
