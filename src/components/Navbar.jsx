import "./Navbar.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
  <h2 className="logo">NatyaMudra AI</h2>

  <ul>
    <li>
  <Link to="/">Home</Link>
</li>
    <li>
  <Link to="/detect">Detect Mudra</Link>
</li>
    <li>Learn Mudras</li>
    <li>History</li>
    <li>About</li>
    <li>Login</li>
  </ul>
</nav>
  );
}

export default Navbar;