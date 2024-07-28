import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useGetPostById } from "@/features/posts/hooks/useGetPostById";
import { IoEyeOutline } from "react-icons/io5";
import { useDeletePost } from "@/features/posts/hooks/useDeletePost";

const DropdownMenuSection = ({
  isDialogOpen,
  onOpenDialog,
  postId,
  postDetailsSection = true,
  savedPostId,
}) => {
  const navigate = useNavigate();
  const { user } = useGetCurrentUser();
  const { post } = useGetPostById(postId);
  const { deletePost, isDeleting } = useDeletePost();

  const handleDeletePost = (e) => {
    e.stopPropagation(e);
    deletePost({ postId, savedPostId });

    onOpenDialog(false);
  };

  const handleEditPost = () => {
    navigate(`/editPost/${postId}`);
  };

  const handlePostDetails = () => {
    navigate(`/post/${post.$id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="dropdownMenu" className="z-10 h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-5 w-5 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.$id === post?.creator?.$id && (
          <DropdownMenuItem>
            <button
              className="0 flex items-center justify-start gap-1 text-center"
              onClick={handleEditPost}
            >
              <HiOutlinePencilSquare className="text-medium" /> Edit Post
            </button>
          </DropdownMenuItem>
        )}
        {postDetailsSection && (
          <DropdownMenuItem>
            <button
              className="0 flex items-center justify-start gap-1 text-center"
              onClick={handlePostDetails}
            >
              <IoEyeOutline className="text-medium" /> See Post Details
            </button>
          </DropdownMenuItem>
        )}
        {user.$id === post?.creator?.$id && (
          <DropdownMenuItem onSelect={() => onOpenDialog(true)}>
            <button className="flex items-center justify-start gap-1 text-center text-red-500">
              <HiOutlineTrash className="text-medium" />
              Delete Post
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>

      <Dialog open={isDialogOpen} onOpenChange={onOpenDialog}>
        <DialogContent className="bg-gray-950">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription className="font-roboto text-lg font-normal text-gray-100">
              Are you sure you want to delete this post?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => onOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
};
export default DropdownMenuSection;
