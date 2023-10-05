
import "../styles/Sidebar.css"

import dragon from "../assets/dragon.png"


function Sidebar(){
  return(
    <nav id="sidebarNav">
      <img src={dragon} alt="YongMin's Character" />
      <div id="info">
        <h3>YongMin's Portfolio</h3>
        <h4><i>
          안녕하세요.<br />
          꼰대같은 개발자<br />
          '장용민' 입니다.<br />
        </i></h4>
      </div>
      <div id="social">
        <a href="/*" target="_blank" id="instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="facebook"><i className="fab fa-facebook" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="youtube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
        <a href="mailto:poiuy4004@naver.com" target="_blank" id="envelope" rel="noreferrer"><i className="fas fa-envelope" aria-hidden="true"></i></a>
        <a href="https://kkamjang.tistory.com" target="_blank" id="rss" rel="noreferrer"><i className="fas fa-rss" aria-hidden="true"></i></a>
      </div>
      <div id="ascoltare">
        <div id="lista-siti">
          <ul id="siti">
            <li><a href="#header"> CoverLetter</a></li>
            <li><a href="#profileContainer">Profile</a></li>
            <li><a href="#resumeContainer"> Resume</a></li>
            <li><a href="#skillContainer"> SkillSkack</a></li>
            <li><a href="#projectContainer"> Project</a></li>
            <li><a href="#header">TOP</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Sidebar;