import MainContainerSection from "@/components/ui/MainContainerSection";
import React from "react";
import CreatePostForm from "../components/CreatePostForm";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGetPostById } from "../hooks/useGetPostById";
import { Spinner } from "@nextui-org/spinner";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const { post, isGettingPost } = useGetPostById(postId);

  if (isGettingPost) return <Spinner />;

  return (
    <MainContainerSection
      iconSection={HiOutlinePencilSquare}
      titleSection={"Edit Post"}
    >
      <div className="flex w-full items-center justify-center pb-24">
        <CreatePostForm post={post} type="update" />
      </div>
    </MainContainerSection>
  );
};

export default EditPost;
