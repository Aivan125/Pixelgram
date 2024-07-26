import { MdOutlinePostAdd } from "react-icons/md";
import CreatePostForm from "../components/CreatePostForm";
import MainContainerSection from "@/components/ui/MainContainerSection";

const CreatePost = () => {
  return (
    <MainContainerSection
      iconSection={MdOutlinePostAdd}
      titleSection={"Create Post"}
    >
      <div className="flex w-full items-center justify-center pb-24 md:pb-4">
        <CreatePostForm />
      </div>
    </MainContainerSection>
  );
};

export default CreatePost;

// const CreatePost = () => {
//   return (
//     <>
//       <ContainerSection>
//         <ContainerHeader>
//           <TitlePage icon={MdOutlinePostAdd} title={"Create Post"} />
//         </ContainerHeader>
//         <div className="flex w-full items-center justify-center pb-4">
//           <CreatePostForm />
//         </div>
//       </ContainerSection>
//     </>
//   );
// };

// export default CreatePost;
