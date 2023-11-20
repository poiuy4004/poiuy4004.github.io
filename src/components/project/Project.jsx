

import styled from "styled-components";

import Button from "../Button";
import { useState } from "react";

const Container = styled.article`
  min-height: 625px;
  ${props=>props.open
  ? "background: rgba(0,0,0,0.8);"
  : "box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.5); background: center 0 / cover no-repeat url("+props.backgroundImg+");"
  }
  &:hover{
    background: rgba(0,0,0,0.8);
    >section{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin: 3%; padding: 3%;
      background-color: rgba(0,0,0,0.8);
      min-height: 95%;
      color: rgb(100,200,255);
      border: solid 1px rgb(100,200,255);
      >h1{
        font-size: 200%;
      }
      @media (max-width: 800px),(max-height: 888px) {
        min-height: 555px;
      }
    }
  }
`
const DetailBtn = styled.div`
  display: none;
  @media (max-width: 800px),(max-height: 888px) {
    display: block;
  }
`
const Detail = styled.section`
  ${props=>props.open
  ? "display: flex; flex-direction: column; justify-content: space-evenly; margin: 3%; padding: 3%; background-color: rgba(0,0,0,0.8); min-height: 555px; color: rgb(100,200,255); border: solid 1px rgb(100,200,255); >h1{font-size: 200%;}"
  : "display: none;"
  }
`

const Description = styled.div`
  margin-bottom: 5%;
`
const DetailButton = styled.button`
  background-color: rgba(255,255,255,0.9);
  padding: 1%;
  border-radius: 20px;
  &:active{
    color: rgba(255, 0, 0, 0.5);
    background-color: rgba(255, 0, 0, 0.5);
  }
  &:hover{
    background-color: rgb(255, 255, 255);
  }
`
const ButtonBox = styled.div`
  margin-bottom: 2%;
  &>a{
    color: white;
  }
`

function Project({project,setIsOpen,isModal,setIsModal}){
  const [detailOpen,setDetailOpen] = useState(false)

  function detailButtonEvent(){
    setIsOpen(true)
    setIsModal({
      head: project.title,
      main: project.detailDescription,
      img: project.mainImg,
      github: project.github,
      demo: project.demo,
      part: project.part,
      stack: project.stack,
    })
  }
  return(
    <Container backgroundImg={project.mainImg} open={detailOpen}>
      <DetailBtn onClick={()=>setDetailOpen(!detailOpen)}><Button name={detailOpen? "상세설명 닫기" : "상세설명 보기"} colorType="black" /></DetailBtn>
      <Detail open={detailOpen}>
        <h1>{project.title}</h1>
        <p>
          <Description>
            {project.description}
          </Description>
          <ButtonBox>
            <DetailButton onClick={detailButtonEvent}>
              자세히 보기
            </DetailButton>
          </ButtonBox>
          <ButtonBox>
            <a href={project.github} target="_blank" rel="noreferrer">
              <Button name="github" colorType="blue" />
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer">
              <Button name="Demo" colorType="orange" />
            </a>
          </ButtonBox>
        </p>
      </Detail>
    </Container>
  )
}
export default Project;