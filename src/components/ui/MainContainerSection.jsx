import TitlePage from "@/components/ui/TitlePage";
import ContainerSection from "@/components/ui/ContainerSection";
import ContainerHeader from "@/components/ui/ContainerHeader";

const MainContainerSection = ({ iconSection, titleSection, children }) => {
  return (
    <ContainerSection>
      <ContainerHeader>
        <TitlePage icon={iconSection} title={titleSection} />
      </ContainerHeader>
      {children}
    </ContainerSection>
  );
};

export default MainContainerSection;
