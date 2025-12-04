import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="">
        <img src="home.png" alt="home" className="left-2" />
        Home
      </Link>
      <Link to="/about">
        <img src="info.png" alt="about" className="left-2" />
        About
      </Link>
    </div>
  );
};

export default Navbar;
