import { useState } from "react";

import styled from "styled-components";

import profileImg from "../assets/profile.jpg"
import resumeImg from "../assets/resume.png";

import Modal from "../components/Modal";
import Button from "../components/Button";
import skills from "../assets/skills";
import Skill from "../components/skill/Skill";
import projects from "../assets/projects";
import Project from "../components/project/Project";

import "../styles/Home.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Post = styled.article`
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.5);
  padding: 3%;
  margin: 3% 0;
  text-align: center;
  width: 64%;
  &>h1{
    margin-bottom: 5%;
  }
  @media (max-width: 800px),(max-height: 888px) {
    width: 90% !important;
  }
`

const OneOnOneBox = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3%;
  align-items: center;
  @media (max-width: 800px),(max-height: 888px) {
    grid-template-columns: 1fr;
    &>:nth-child(even){
      margin: 20%;
    }
  }
`

const ProfileImg = styled.img`
  width: 80%;
  box-shadow: 0px 3px 10px 5px rgb(150,200,255,0.3);
  @media (max-width: 800px),(max-height: 888px) {
    width: 90%;
  }
`
const ResumeImg = styled.img`
  width: 80%;
  box-shadow: 0px 3px 10px 5px rgb(150,200,255,0.3);
  @media (max-width: 800px),(max-height: 888px) {
    width: 50%;
  }
`

const OneOnOneInfo = styled.p`
  display: flex;
  flex-direction: column;
  padding: 3%;
  text-align: left;
  &>div{
    margin-top: 7%;
    display: flex;
    flex-direction: column;
    >a{
      margin: 3% 0;
      @media (max-width: 800px),(max-height: 888px) {
        text-align: center; 
      }
    }
  }
  &>a{
    margin: 3% 0;
    font-size: 120%;
  }
  & i{
    margin: 0 3%;
  }
  &>h2{
    margin: 3%;
    text-align: center;
  }
  &>p>ul>li{
    margin: 3% 0;
  }
  &>p>ul>ul{
    margin: 3%;
  }
`

const MainSkillBox = styled.section`
  margin-top: -3%;
`

const OtherContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 6fr;
`
const OtherBox = styled.section`
  display: flex;
  text-align: left;
  flex-wrap: wrap;
`
const Other = styled.span`
  margin-right: 14px;
  margin-bottom: 5px;
  padding: 2px 8px;
  color: blueviolet;
  font-size: large;
  border: solid 1px gray;
  border-radius: 20px;
  white-space: nowrap;
  @media (max-width: 800px),(max-height: 888px) {
    font-size: xx-small !important;
    margin-right: 3px !important;
  }
`

const ProjectContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  margin: 5%;
  & img{
    width: 50%;
    align-self: center;
  }
  @media (max-width: 800px),(max-height: 888px) {
    display: block;
    &>*{
      margin: 10% 0;
    }
  }
`

function Home(){

  const [isOpen,setIsOpen] = useState(false)
  const [isModal,setIsModal] = useState({})

  return(
    <main>
      <h1 id="introduceContainer1">
        <span>
          <div >안녕하세요</div>
          <div >꼰대같은 개발자</div>
          <div >장용민 입니다</div>
        </span>
      </h1>
      <h1 id="introduceContainer2">
        <span>
          <div id="introduce1">안녕하세요</div>
          <div id="introduce2">꼰대같은 개발자</div>
          <div id="introduce3">장용민 입니다</div>
        </span>
      </h1>

      <div id="introduceDetailBox">
        <p className="introduceDetail">
          <strong>호기심</strong>이 많은 저는 어려서부터 호기심을 따라 걸었습니다.
          <br />
          그렇게 도착한 곳은, 끝없는 지식이 펼쳐진 보물창고 <strong>코딩</strong>이었습니다.
        </p>
        <p className="introduceDetail">
          단순히 궁금증을 해결해주는 것을 넘어, 눈으로 직접 확인시켜주는
          <br />
          <strong>프론트엔드의 매력</strong>에
          <br />
          빠지는 것은 어쩌면 필연이었을지 모릅니다.
        </p>
        <p>
          - LatteTime - <br />
          '노력은 배신하지 않는다'<br />
          '실패는 성공의 어머니'
        </p>
      </div>

      <Container>
        <Post id="profileContainer">
          <h1>
            Profile
          </h1>
          <OneOnOneBox>
            <span>
              <ProfileImg src={profileImg} alt="Profile Picture" />
            </span>
            <OneOnOneInfo>
              <a href="#profileContainer">
                <i className="fa-solid fa-user"></i>
                장용민
              </a>
              <a href="#profileContainer">
                <i className="fa-solid fa-cake-candles"></i>
                1994. 03. 18
              </a>
              <a href="#profileContainer">
                <i className="fa-solid fa-house-chimney-user"></i>
                경기도 남양주시
              </a>
              <a href="mailto:poiuy4004@naver.com" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-envelope"></i>
                poiuy4004@naver.com
              </a>
              <div>
                <a href="https://github.com/poiuy4004" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-github"></i>
                  <b className="fa-solid">https://github.com/poiuy4004</b>
                  <b className="fa-solid">바로가기</b>
                </a>
                <a href="https://kkamjang.tistory.com" target="_blank" rel="noreferrer">
                  <i className="fa-brands fa-blogger"></i>
                  <b className="fa-solid">https://kkamjang.tistory.com</b>
                  <b className="fa-solid">바로가기</b>
                </a>
              </div>
            </OneOnOneInfo>
          </OneOnOneBox>
        </Post>
        <Post id="resumeContainer">
          <h1>
            Resume<br />
            <a href="https://yielding-brick-c96.notion.site/_FE_Developer-aba8940403614692b42001035017a628?pvs=4" target="_blank" rel="noreferrer">
              <Button name="Notion" colorType="black" size="small" />
            </a>
          </h1>
          <OneOnOneBox>
              <span>
                <ResumeImg src={resumeImg} alt="Resume Picture" />
              </span>
              <OneOnOneInfo>
                <h2>
                  💻 Career
                </h2>
                <p>
                  <ul>
                    <li>
                      <strong>청주대학교 상담사</strong><br />
                      2022. 10 - 2023. 02
                    </li>
                    <li>
                      <strong>스탭스 고용노동부 사업관리</strong><br />
                      2020. 05 - 2022. 11
                    </li>
                    <li>
                      <strong>특허청(한국지식재산보호원) 면접관</strong><br />
                      2021. 04 - 2021. 04
                    </li>
                    <li>
                      <strong>한국척수장애인협회 강사</strong><br />
                      2021. 04 - 2021. 04
                    </li>
                    <li>
                      <strong>한화생명</strong><br />
                      2019. 10 - 2020. 03
                    </li>
                  </ul>
                </p>
                <h2>
                  🎓 Education
                </h2>
                <p>
                  <ul>
                    <li>
                      <strong>
                        Software Engineering Bootcamp Frontend<br />
                        (코드스테이츠)
                      </strong><br />
                      2023. 04 - 2023. 11
                    </li>
                    <ul>
                      <li>백엔드 API에서 가져온 데이터의 출력, 입력을 통한 비즈니스 로직 구성방법</li>
                      <li>사용자와 대화하는 사용자 인터페이스 부분의 효율적인 작업방법</li>
                    </ul>
                    <li>
                      <strong>
                        경찰행적학과 극동대학교
                      </strong><br />
                      2013. 03 - 2019. 02
                    </li>
                    <ul>
                      <li>범죄통계학, 범죄예방론, 실용응급처치 등 이수</li>
                      <li>IBM SPSS Statistics 통계 프로그램을 통한 DB분석 및 예측 가능</li>
                    </ul>
                  </ul>
                </p>
              </OneOnOneInfo>
          </OneOnOneBox>
        </Post>
        <Post id="skillContainer">
          <h1>
            SkillStack<br />
            <a href="https://github.com/poiuy4004/SkillBox" target="_blank" rel="noreferrer">
              <Button name="Github" colorType="black" size="small" />
            </a>
            <a href="https://poiuy4004.github.io/SkillBox/" target="_blank" rel="noreferrer">
              <Button name="Demo" colorType="orange" size="small" />
            </a>
          </h1>
          <h2>Main</h2>
          <MainSkillBox>
            {skills.main.map(skill=>
              <Skill skill={skill} />
            )}
          </MainSkillBox>
          <OtherContainer>
            <h3>Other</h3>
            <OtherBox>
              {skills.others.map(other=><Other>{other}</Other>)}
            </OtherBox>
          </OtherContainer>
        </Post>
        <Post id="projectContainer">
          <h1>
            Projects
          </h1>
          <ProjectContainer>
            {projects.map(project=>(
              <Project project={project} setIsOpen={setIsOpen} setIsModal={setIsModal} />
            ))}
            {isOpen
            ? <Modal value={isModal} setIsOpen={setIsOpen} />
            : null}
            {console.log(isModal)}
          </ProjectContainer>
        </Post>
      </Container>
    </main>
  )
}
export default Home;