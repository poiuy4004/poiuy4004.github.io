


import { Link } from "react-router-dom";

import "../styles/Header.css"

function Header(){
  return(
    <header id="header">
      <h1>
        <Link to="*">YongMin's Portfolio</Link>
      </h1>
      <nav>
        <div id="desktop-nav">
          <ul id="desktop-menu">
            <li><a href="#profileContainer">Profile</a></li>
            <li><a href="#resumeContainer"> Resume</a></li>
            <li><a href="#skillContainer"> SkillSkack</a></li>
            <li><a href="#projectContainer"> Project</a></li>
          </ul>
        </div>
        <div id="hammenuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <li><a href="#profileContainer">Profile</a></li>
            <li><a href="#resumeContainer"> Resume</a></li>
            <li><a href="#skillContainer"> SkillSkack</a></li>
            <li><a href="#projectContainer"> Project</a></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header;