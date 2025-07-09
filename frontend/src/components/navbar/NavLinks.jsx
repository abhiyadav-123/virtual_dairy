import { Link } from "react-router-dom";
import { FaHome, FaBookOpen, FaInfo, FaEnvelope, FaGithub } from "react-icons/fa";

const NavLinks = ({ toggle }) => {
  return (
    <>
      <li onClick={toggle}>
        <Link to="/">
          <FaHome className="mr-2" />
          Home
        </Link>
      </li>
      <li onClick={toggle}>
        <Link to="/entries">
          <FaBookOpen className="mr-2" />
          Your Entries
        </Link>
      </li>
      <li onClick={toggle}>
        <Link to="/about">
          <FaInfo className="mr-2" />
          About
        </Link>
      </li>
      <li onClick={toggle}>
        <Link to="/contact">
          <FaEnvelope className="mr-2" />
          Contact
        </Link>
      </li>
      <li onClick={toggle}>
        <Link to="/GitHub">
          <FaGithub className="mr-2" />
          GitHub
        </Link>
      </li>
    </>
  );
};

export default NavLinks;
