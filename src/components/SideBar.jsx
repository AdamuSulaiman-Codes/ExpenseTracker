import React from "react";
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom"; // Corrected import
import routeData from "../assets/routeData"; // Ensure this path is correct

const SideBar = () => {
  return (
    <section className="side-bar">
      <ul className="side-bar-items">
        {routeData.map((data) => (
          <li key={data.id}>
            <NavLink to={data.path} className="side-bar-link">
              <GoDotFill />
              <span>{data.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SideBar;
