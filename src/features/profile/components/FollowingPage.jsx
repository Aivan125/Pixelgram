import MainContainerSection from "@/components/ui/MainContainerSection";
import SpinnerComponent from "@/components/ui/SpinnerComponent";
import TopCreators from "@/features/allUsers/components/TopCreators";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useGetUserById } from "@/features/relatedPosts/hooks/useGetUserById";
import React from "react";
import { IoPeopleCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useGetListOfUsers } from "../hooks/useGetListOfUsers";

const FollowingPage = () => {
  const { userId } = useParams();
  const { userById, isGettingUser } = useGetUserById(userId);
  const { user: currentUser, isGettingUser: isGettingCurrentUser } =
    useGetCurrentUser();
  const { friendship: { following } = {} } = userById || {};
  const { listFollowers, isGettingFollowers } = useGetListOfUsers(following);

  if (isGettingUser || isGettingCurrentUser || isGettingFollowers)
    return <SpinnerComponent />;

  return (
    <MainContainerSection
      iconSection={IoPeopleCircle}
      titleSection={"Following"}
    >
      <div className="grid grid-cols-2 place-items-center gap-4 xl:grid-cols-3">
        {listFollowers?.map((user) => (
          <TopCreators key={user.$id} user={user} currentUser={currentUser} />
        ))}
      </div>
    </MainContainerSection>
  );
};

export default FollowingPage;
