/**
 * Footer component with links to the "About" page and the GitHub repository.
 */

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <img src="/grassFooter.png" alt="Grass footer" />
      <div className="w-full mx-auto px-4 pb-4 md:flex md:items-center md:justify-between bg-secondary text-background-light">
        <span className="text-sm text-body sm:text-center">
          {new Date().getFullYear()} • Marta FMS.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-body sm:mt-0">
          <li>
            <Link to="/about" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/mfms5/ghibliArchive"
              target="_blank"
              className="hover:underline me-4 md:me-6"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
