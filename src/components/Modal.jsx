import { createPortal } from "react-dom";

import styled from "styled-components";

import Button from "./Button";

const Scrim = styled.article`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0; bottom: 0; left: 0; right: 0;
  padding: 20%;
  background-color: rgba(255,255,255,0.5);
`
const ModalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
  background-color: rgb(240, 240, 255);
  border: solid 1px blueviolet;
  border-radius: 10px;
`
const Title = styled.h1`

`
const ButtonBox = styled.div`
  display: flex;
  margin-bottom: 5%;
  &>a{
    margin: 3%;
  }
`
const ModalBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  &>:nth-child(1){
    align-items: center;
  }
  &>:nth-child(2){
    padding-left: 20%;
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & h4,strong{
    margin: 3%;
  }
`
const Image = styled.div`
  height: 100%; width: 100%;
  background: center / contain no-repeat ${props=>"url("+props.img+")"},transparent 35% url("../../media/examples/lizard.png");
`
const SkillBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Skill = styled.div`
  color: white;
  background-color: blueviolet;
  border-radius: 14px;
  margin: 3px;
  padding: 2px 8px;
  white-space: nowrap;
`

function Modal({value,setIsOpen}){
  return(
    createPortal(
      <Scrim onClick={()=>setIsOpen(false)}>
        <ModalContainer onClick={e=>e.stopPropagation()}>
          <Title>{value.head}</Title>
          <ButtonBox>
            <a href={value.github} target="_blank" rel="noreferrer">
              <Button name="github" colorType="blue" />
            </a>
            <a href={value.demo} target="_blank" rel="noreferrer">
              <Button name="Demo" colorType="orange" />
            </a>
          </ButtonBox>
          <ModalBox>
            <Content>
            {value.img
            ? <Image img={value.img}></Image>
            : null }
            </Content>
            <Content>
              <strong>{value.main}</strong>
              <div>
                <h4>&lt;My Task&gt;</h4>
                <div>{value.part}</div>
              </div>
              <div>
                <h4>&lt;Stack&gt;</h4>
                <SkillBox>{value.stack.map(skill=><Skill>{skill}</Skill>)}</SkillBox>
              </div>
            </Content>
          </ModalBox>
          <div></div>
        </ModalContainer>
      </Scrim>
    ,document.body)
  )
}
export default Modal;