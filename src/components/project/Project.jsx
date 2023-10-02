

import styled from "styled-components";

const Container = styled.article`
  box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.5);
  background: center / cover no-repeat url(${props=>props.backgroundImg});
  min-height: 625px;
  cursor: pointer;
  &>section{
    display: none;
  }
  &:hover{
    background: rgba(0,0,0,0.8);
    >section{
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      margin: 3%; padding: 3%;
      background-color: rgba(0,0,0,0.8);
      height: 96%;
      color: rgb(100,200,255);
      border: solid 1px rgb(100,200,255);
      >h1{
        font-size: 200%;
      }
    }
  }
`

const Description = styled.div`
  white-space: pre-line;
  margin-bottom: 5%;
`

const ButtonBox = styled.div`
  &>a{
    color: white;
  }
`

function Project({project}){
  return(
    <Container backgroundImg={project.mainImg}>
      <section>
        <h1>{project.title}</h1>
        <p>
          <Description>
            {project.description}
          </Description>
          <ButtonBox>
            <a href={project.github} target="_blank" rel="noreferrer">
              github
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer">
              Demo
            </a>
          </ButtonBox>
        </p>
      </section>
    </Container>
  )
}
export default Project;