
import styled from "styled-components";

import "../styles/Sidebar.css"

import dragon from "../assets/dragon.png"

const SidebarNav = styled.nav`
  
`

function Sidebar(){
  return(
    <SidebarNav id="sidebarNav">
      <img src={dragon} alt="YongMin's Character" />
      <div id="info">
        <h4><i>
          Hello !<br />
          I'm Frontend Developer<br />
          Yong-Min, Jang<br />
        </i></h4>
      </div>
      <div id="social">
        <a href="https://github.com/poiuy4004" target="_blank" id="envelope" rel="noreferrer"><i class="fa-brands fa-github"></i></a>
        <a href="mailto:poiuy4004@naver.com" target="_blank" id="envelope" rel="noreferrer"><i className="fas fa-envelope" aria-hidden="true"></i></a>
        <a href="https://kkamjang.tistory.com" target="_blank" id="rss" rel="noreferrer"><i class="fa-brands fa-blogger"></i></a>
        <a href="/*" target="_blank" id="instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="facebook"><i className="fab fa-facebook" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="youtube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
        <a href="https://kkamjang.tistory.com" target="_blank" id="rss" rel="noreferrer"><i className="fas fa-rss" aria-hidden="true"></i></a>
      </div>
      <div>
        <div>
          <ul>
            <li><a href="#introduceContainer">CoverLetter</a></li>
            <li><a href="#profileContainer">Profile</a></li>
            <li><a href="#resumeContainer">Resume</a></li>
            <li><a href="#skillContainer">SkillSkack</a></li>
            <li><a href="#projectContainer">Project</a></li>
            <li><a href="#header">TOP</a></li>
          </ul>
        </div>
      </div>
    </SidebarNav>
  )
}
export default Sidebar;