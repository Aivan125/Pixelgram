import MainContainerSection from "@/components/ui/MainContainerSection";
import ProfileForm from "@/features/profile/components/ProfileForm";
import { CiFaceSmile } from "react-icons/ci";

const EditProfile = () => {
  return (
    <MainContainerSection
      iconSection={CiFaceSmile}
      titleSection={"Edit Profile"}
    >
      <div className="mt-4 flex flex-col items-center justify-center space-y-4 p-4">
        <ProfileForm />
      </div>
    </MainContainerSection>
  );
};

export default EditProfile;
