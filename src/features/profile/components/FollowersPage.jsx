import MainContainerSection from "@/components/ui/MainContainerSection";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import TopCreators from "@/features/allUsers/components/TopCreators";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useGetUserById } from "@/features/relatedPosts/hooks/useGetUserById";
import React from "react";
import { IoPeopleCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useGetListOfUsers } from "../hooks/useGetListOfUsers";

const FollowersPage = () => {
  const { userId } = useParams();
  const { userById, isGettingUser } = useGetUserById(userId);
  const { user: currentUser, isGettingUser: isGettingCurrentUser } =
    useGetCurrentUser();
  const { friendship: { followers } = {} } = userById || {};
  const { listFollowers, isGettingFollowers } = useGetListOfUsers(followers);

  if (isGettingUser || isGettingCurrentUser || isGettingFollowers)
    return <SpinnerComponent />;

  if (followers.length === 0)
    return (
      <p className="grid h-screen place-items-center font-bold text-gray-500">
        No followers yet
      </p>
    );

  return (
    <MainContainerSection
      iconSection={IoPeopleCircle}
      titleSection={"Followers"}
    >
      <div className="grid grid-cols-2 place-items-center gap-4 xl:grid-cols-3">
        {listFollowers?.map((user) => (
          <TopCreators key={user.$id} user={user} currentUser={currentUser} />
        ))}
      </div>
    </MainContainerSection>
  );
};

export default FollowersPage;
