import MenuBottombar from "./MenuBottombar";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 right-0 z-50 h-20 w-full bg-gray-900/50 px-4 shadow-sm backdrop-blur-md md:hidden">
      <MenuBottombar />
    </div>
  );
};

export default BottomNavbar;
