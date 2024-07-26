import TopCreators from "@/features/allUsers/components/TopCreators";
import CreatorsPage from "@/features/allUsers/pages/CreatorsPage";
import React from "react";

const RightSidebar = () => {
  return (
    <div className="h-full h-screen overflow-y-auto overflow-y-scroll py-4 scrollbar-thin scrollbar-track-gray-600 scrollbar-thumb-gray-800 scrollbar-track-rounded-full scrollbar-thumb-rounded-full max-md:hidden">
      <CreatorsPage />
    </div>
  );
};

export default RightSidebar;
