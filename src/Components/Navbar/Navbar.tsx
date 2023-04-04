import "./Navbar.css";
import { NavLink } from "react-router-dom";
import backcountryLogo from "../../Assets/backcountryLogo.png";

const Navbar = () => {
  return (
    <nav className="nav-main">
      <NavLink className="title-link" to={"/"}>
        <img src={backcountryLogo} alt="Backcountry Logo" className="logo" />
        <h1 className="site-title">Backcountry Bookings</h1>
      </NavLink>
    </nav>
  );
};

export default Navbar;
