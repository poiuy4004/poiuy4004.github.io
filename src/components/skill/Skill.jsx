
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";


const SkillContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 6fr;
  margin: 5% 0;
`
const SkillBox = styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: rgba(128,128,0,0.1);
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.3);
  border-radius: 8px;
  margin-right: 5%;
  overflow: hidden;
`
const Level = styled.p`
  width: ${props=>props.level};
  height: 100%;
  padding: 0 2%;
  text-align: right;
  background-color: rgb(200,200,255);
  border-radius: 8px 18px 18px 8px;
  transition: 3s ease-in;
  ${props=>props.levelRender
  ? "transform: translateX(0%);"
  : "transform: translateX(-100%);"
  }
`

function Skill({skill}){
  const [levelRender,setLevelRender] = useState(false)
  const skillBox = useRef(null)
  function levelRenderHandler(entries){
    setLevelRender(entries[0].isIntersecting)
    console.log(entries[0])
  }
  const observeOptions = {
    threshold: 1.0,
  }
  const observber = new IntersectionObserver(levelRenderHandler,observeOptions)

  useEffect(()=>{
    observber.observe(skillBox.current)
  },[])

  return(
    <SkillContainer ref={skillBox}>
      <h3>{skill.name}</h3>
      <SkillBox>
        <Level
          level={skill.level} levelRender={levelRender}>{skill.level}</Level>
      </SkillBox>
    </SkillContainer>
  )
}
export default Skill;

// https://savinpark.github.io/portfolio/
// https://kim-ji-min.github.io/My-Portfolio/
// https://zero-base.co.kr/event/media_insight_contents_FE_frontend_portfolio_web
// https://urclass.codestates.com/content/77beef40-40e0-401b-8c0a-08e4ddac0601?playlist=2258
// http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/
// https://velog.io/@elrion018/%EC%8B%A4%EB%AC%B4%EC%97%90%EC%84%9C-%EB%8A%90%EB%82%80-%EC%A0%90%EC%9D%84-%EA%B3%81%EB%93%A4%EC%9D%B8-Intersection-Observer-API-%EC%A0%95%EB%A6%AC
// FileReader
// ReactDOM