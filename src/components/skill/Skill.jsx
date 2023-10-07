

// import { useEffect, useState } from "react";
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
  transform: translateX(-100%);
  &.renderLevel{
    transform: translateX(0%);
  }
`

function Skill({skill}){

  const intersectionObserver = new IntersectionObserver(nodeList=>{
    nodeList.forEach(node=>{
      if (node.intersectionRatio > 0) {
        node.target.classList.add('renderLevel');
      }
      else {
        node.target.classList.remove('renderLevel');
      }
    })
  })
  const levelNodeList = document.querySelectorAll(".levelList");
  levelNodeList.forEach(levelNode=>intersectionObserver.observe(levelNode));

  return(
    <SkillContainer>
      <h3>{skill.name}</h3>
      <SkillBox>
        <Level className="levelList" level={skill.level}>{skill.level}</Level>
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
// FileReader
// ReactDOM