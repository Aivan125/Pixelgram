const TitlePage = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center justify-start gap-4 py-6">
      {<Icon className="text-4xl" />}
      <h2 className="text-center text-3xl font-bold uppercase sm:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default TitlePage;
