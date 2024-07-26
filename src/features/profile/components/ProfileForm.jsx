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
import AvatarUser from "./AvatarUser";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { editProfileValidation } from "../utils/validation";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const { user } = useGetCurrentUser();
  const { updateProfile, isUpdatingProfile } = useUpdateProfile();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(editProfileValidation),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
      avatar: user.avatarUrl,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    if (!values) return;

    const data = { ...values };

    updateProfile({ data, avatarId: user.avatarId, userId: user.$id });
  }

  return (
    <div className="flex w-full flex-col xl:w-3/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center gap-6"
        >
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel className="text-base">Profile Image</FormLabel>
                <FormControl>
                  <AvatarUser
                    name={"avatar"}
                    onChange={(value) => form.setValue("avatar", value)}
                    value={form.watch("avatar")}
                    disabled={isUpdatingProfile}
                    {...field}
                    onBlur={() => form.trigger("avatar")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel className="text-base">Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdatingProfile}
                    placeholder="Your name"
                    className="border-gray-600 bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel className="text-base">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isUpdatingProfile}
                    placeholder="Tell us something about you"
                    className="h-36 resize-none border-gray-600 bg-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-3/4 flex-col items-center justify-center gap-8">
            <Button
              type="submit"
              variant="primary"
              className="w-full text-lg"
              disabled={isUpdatingProfile}
            >
              Edit Profile
            </Button>
            <Button
              type="button"
              variant="primary"
              className="w-full text-lg"
              disabled={isUpdatingProfile}
              onClick={() => navigate(`/profile/${user.$id}`)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
