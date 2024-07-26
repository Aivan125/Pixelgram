import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="w-36">
        <img src="../../../public/assets/images/Pixelgram.png" alt="logo" />
      </div>
    </Link>
  );
};

export default Logo;
