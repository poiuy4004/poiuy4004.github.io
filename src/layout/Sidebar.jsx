
import "../styles/Sidebar.css"

import dragon from "../assets/dragon.png"



function Sidebar(){
  return(
    <nav>
      <img src={dragon} alt="YongMin's Character" />
      <div id="info">
        <h3>YongMin's Portfolio</h3>
        <h4><i>
          안녕하세요.<br />
          프론트엔드 개발자<br />
          '장용민' 입니다.<br />
        </i></h4>
      </div>
      <div id="social">
        <a href="/*" target="_blank" id="instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="facebook"><i class="fab fa-facebook" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="youtube"><i class="fab fa-youtube" aria-hidden="true"></i></a>
        <a href="mailto:poiuy4004@naver.com" target="_blank" id="envelope" rel="noreferrer"><i class="fas fa-envelope" aria-hidden="true"></i></a>
        <a href="/*" target="_blank" id="rss"><i class="fas fa-rss" aria-hidden="true"></i></a>
      </div>
      <div id="ascoltare">
        <h3>Where U Want To Go?</h3>
        <div id="lista-siti">
          <ul id="siti">
            <li><a href="#"> Apple Podcast</a></li>
            <li><a href="#"> Spotify</a></li>
            <li><a href="#"> YouTube</a></li>
            <li><a href="#"> Android</a></li>
            <li><a href="#"> Spreaker</a></li>
            <li><a href="#"> Google Podcast</a></li>
            <li><a href="#"> Anchor</a></li>
            <li><a href="#"> Castbox</a></li>
            <li><a href="#"> Overcast</a></li>
            <li><a href="#"> RadioPublic</a></li>
            <li><a href="#"> Breaker</a></li>
            <li><a href="#"> RSS</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Sidebar;