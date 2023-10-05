

import { useEffect, useState } from "react";
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
  transition: 10s;
  ${props=>props.levelP
  ? "transform: translateX(0%);"
  : "transform: translateX(-100%);"
  }
`

function Skill({skill}){
  const [levelP,setLevelP] = useState(false)
  useEffect(()=>setLevelP(!levelP),[])
  return(
    <SkillContainer>
      <h3>{skill.name}</h3>
      <SkillBox>
        <Level level={skill.level} levelP={levelP}>{skill.level}</Level>
      </SkillBox>
    </SkillContainer>
  )
}
export default Skill;

// TML5
// 80 %
// CSS3
// 80 %
// JavaScript
// 70 %
// jQuery
// 50 %
// React
// 70 %
// TypeScript
// 30 %
// Next.js
// 30 %
// SCSS
// 60 %
// Bootstrap
// 70 %
// Semantic UI
// 70 %
// Figma
// 70 %
// MySQL
// 30 %
// Github