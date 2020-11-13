import { NavLink } from "react-router-dom";
import './index.css';

export default function Header() {
  return <nav>
    <ul className="logo">
      <li><NavLink to="/" ><span>COVID19 </span><span>Србија</span></NavLink></li>
    </ul>
    <ul className="navigation">
      <li>
        <NavLink to="/details">О аналитикама</NavLink>
      </li>
    </ul>
  </nav>
}