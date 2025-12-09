/**
 * Navigation bar shown at the top of the website for all its pages.
 * Contains buttons to navigate to the "Home" page and the "About" page.
 */

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="">
        <img
          src={`${import.meta.env.BASE_URL}home.png`}
          alt="home"
          className="left-2"
        />
        Home
      </Link>
      <Link to="/about">
        <img
          src={`${import.meta.env.BASE_URL}info.png`}
          alt="about"
          className="left-2"
        />
        About
      </Link>
    </div>
  );
};

export default Navbar;
