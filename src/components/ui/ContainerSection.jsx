const ContainerSection = ({ children, className }) => {
  return (
    <section
      className={`relative h-screen overflow-y-scroll scrollbar-thin scrollbar-track-gray-600 scrollbar-thumb-gray-800 scrollbar-track-rounded-full scrollbar-thumb-rounded-full ${className}`}
    >
      {children}
    </section>
  );
};

export default ContainerSection;
