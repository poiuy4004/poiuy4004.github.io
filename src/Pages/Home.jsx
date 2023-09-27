



import "../styles/Home.css"

import profile from "../assets/profile.png"

function Home(){

  return(
    <main>
      <h1 id="introduce1">
        안녕하세요
      </h1>
      <h1 id="introduce2">
        꼰대같은 개발자
      </h1>
      <h1 id="introduce3">
        장용민 입니다
      </h1>
      <p>
        <strong>호기심</strong>이 많은 저는 어려서부터 호기심을 따라 걸었습니다.
        <br />
        그렇게 도착한 곳은, 끝없는 지식이 펼쳐진 보물창고 <strong>코딩</strong>이었습니다.
      </p>
      <p>
        단순히 궁금증을 해결해주는 것을 넘어, 눈으로 직접 확인시켜주는
        <br />
        <strong>프론트엔드의 매력</strong>에
        <br />
        빠지는 것은 어쩌면 필연이었을지 모릅니다.
      </p>
      <p>
         - LatteTime - <br />
        노력은 배신하지 않는다는 말을 믿습니다.<br />
        실패는 성공의 어머니라는 말을 믿습니다.
      </p>
      <div className="container">
        <div className="content">
          <article className="post" id="profileContainer">
            <h1>
              Profile
            </h1>
            <section id="profileBox">
              <span>
                <img src={profile} alt="Profile Picture" />
              </span>
              <span>
                <p>
                  <i className="fa-solid fa-user">
                    <a href="#profileContainer">장용민</a>
                  </i>
                  <i className="fa-solid fa-cake-candles">
                    <a href="#profileContainer">1994. 03. 18</a>
                  </i>
                  <i className="fa-solid fa-house-chimney-user">
                    <a href="#profileContainer">경기도 남양주시</a>
                  </i>
                  <i className="fa-solid fa-envelope">
                    <a href="mailto:poiuy4004@naver.com" target="_blank" rel="noreferrer">poiuy4004@naver.com</a>
                  </i>
                </p>
                <p>
                  <i className="fa-brands fa-github">
                    <a href="https://github.com/poiuy4004" target="_blank" rel="noreferrer">https://github.com/poiuy4004</a>
                  </i>
                  <i class="fa-brands fa-blogger">
                    <a href="https://kkamjang.tistory.com" target="_blank" rel="noreferrer">https://kkamjang.tistory.com</a>
                  </i>
                </p>
              </span>
            </section>
          </article>
          <article className="post" id="resumeContainer">
            <h1>
              Resume<br />
              <a href="https://www.notion.so/_-1d48f0248b894d149e1b12ed04a4d83a?pvs=4" target="_blank" rel="noreferrer"><button>Notion Resume Page</button></a>
            </h1>
            <section id="resumeBox">
              <span>
                <img src={profile} alt="Profile Picture" />
              </span>
              <span>
                <h2>
                  🎓 Education
                </h2>
                <div>
                  <strong>
                    Software Engineering Bootcamp Frontend<br />
                    (코드스테이츠)
                  </strong><br />
                    2021.01 - 2021.05
                  <p>
                    - rkskek
                  </p>
                </div>
              </span>
            </section>
          </article>
          <div className="post">
            <div>
              <img src="https://" alt="Profile Picture" />
            </div>
            <div>
              <h2><a href="https://jekyll-podcaster.netlify.app//example-1">A random main episode</a></h2>
              <div>
                <span>
                  <i className="far fa-calendar" aria-hidden="true"></i> 17 Novembre 2019
                  {/* Whitespace added for readability */}
                  <span> - </span>
                  <i className="far fa-clock"></i> 52:14
                </span>
              </div>
            </div>
            <div>
            </div>
            <div>
              <p> Description goes here
                <span>
                  <a href="https://jekyll-podcaster.netlify.app//example-1">Continue</a>
                </span>
              </p>
            </div>
            <div>
              <p> Description goes here
                <span>
                  <a href="https://jekyll-podcaster.netlify.app//example-1">Continue</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default Home;