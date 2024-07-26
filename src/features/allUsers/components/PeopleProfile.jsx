import MainContainerSection from "@/components/ui/MainContainerSection";
import { IoPeopleCircle } from "react-icons/io5";
import TopCreators from "./TopCreators";
import { useGetAllUsers } from "../hooks/useGetAllUsers";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import SpinnerComponent from "@/components/ui/SpinnerComponent";

const PeopleProfile = () => {
  const { getUsers, isGettingUsers } = useGetAllUsers();
  const { user: currentUser, isGettingUser } = useGetCurrentUser();

  if (isGettingUsers || isGettingUser) return <SpinnerComponent />;

  const usersArray = getUsers.filter((user) => user.$id !== currentUser.$id);

  return (
    <MainContainerSection iconSection={IoPeopleCircle} titleSection={"People"}>
      <div className="grid grid-cols-2 place-items-center gap-4 xl:grid-cols-3">
        {usersArray.map((user) => (
          <TopCreators key={user.$id} user={user} currentUser={currentUser} />
        ))}
      </div>
    </MainContainerSection>
  );
};

export default PeopleProfile;
