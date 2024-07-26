import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { createPostValidation } from "../utils/validation";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useCreatePost } from "../hooks/useCreatePost";
import { useNavigate } from "react-router-dom";
import { useEditPost } from "../hooks/useEditPost";
import SpinnerComponent from "@/components/ui/SpinnerComponent";

const CreatePostForm = ({ post, type }) => {
  const { user, isGettingUser } = useGetCurrentUser();
  const { createPost, isCreatingPost } = useCreatePost();
  const { updatePost, istEditing } = useEditPost();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      caption: post?.caption || "",
      file: [],
      location: post?.location || "",
      tags: post?.tags?.join(", ") || "",
    },
  });

  if (isGettingUser) return <SpinnerComponent />;

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (!values) return;

    if (type === "update") {
      updatePost(
        {
          ...values,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageUrl,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        },
      );
    } else {
      createPost(
        {
          ...values,
          userId: user.$id,
        },
        {
          onSuccess: () => {
            navigate("/");
          },
        },
      );
    }
  }

  return (
    <Form {...form}>
      <div className="flex w-3/4 justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Caption</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-36 border-gray-600 bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Add photos</FormLabel>
                <FormControl>
                  <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Location</FormLabel>
                <FormControl>
                  <Input className="border-gray-600 bg-gray-900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Tags</FormLabel>
                <span className="text-sm tracking-wider text-gray-400">
                  {" "}
                  (Separate tags by commas &quot;travel, trip, happy &quot;)
                </span>
                <FormControl>
                  <Input className="border-gray-600 bg-gray-900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-6 flex-1 text-lg"
            disabled={isCreatingPost || istEditing}
          >
            {type === "update" ? "Update Post" : "Create Post"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default CreatePostForm;
