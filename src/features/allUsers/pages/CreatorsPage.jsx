import React from "react";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import TopCreators from "../components/TopCreators";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { getTopSixFollowedUsers } from "@/lib/utils";

const CreatorsPage = () => {
  const { getUsers, isGettingUsers } = useGetAllUsers();
  const { user: currentUser, isGettingUser } = useGetCurrentUser();

  if (isGettingUsers || isGettingUser) return <SpinnerComponent />;

  const users = getUsers.filter((user) => user.$id !== currentUser.$id);
  const topCreators = getTopSixFollowedUsers(users);

  console.log(getUsers);
  console.log(topCreators);
  return (
    <div className="h-full pl-4">
      <h2 className="py-4 text-lg font-bold">Top Creators</h2>
      <div className="flex flex-wrap gap-4">
        {topCreators.map((user) => (
          <TopCreators key={user.$id} user={user} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default CreatorsPage;
