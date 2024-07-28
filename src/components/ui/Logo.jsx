import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="w-12 md:w-32">
        <img src="/assets/images/Pixelgram.png" alt="logo" />
      </div>
    </Link>
  );
};

export default Logo;
