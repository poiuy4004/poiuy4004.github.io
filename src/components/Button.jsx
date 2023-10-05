

import styled from "styled-components";

const ButtonContainer = styled.button`
  padding: 1%;
  border-radius: 20px;
  &:active{
    color: rgba(255, 0, 0, 0.5);
    background-color: rgba(255, 0, 0, 0.5);
  }
  ${props=>{
    if(props.colorType==="blue"){
      return "border: solid 1px rgba(255,255,0,0.5); background-color: rgb(100,200,255); &:hover{background-color: rgb(200,200,255);}"
    }
    else if(props.colorType==="orange"){
      return "color: white; border: solid 1px rgb(0,255,255,0.5); background-color: rgb(255, 128, 0); &:hover{background-color: rgb(255,200,100);}"
    }
    else if(props.colorType==="black"){
      return "color: white; background-color: black; &:hover{background-color: rgb(100,100,100);}"
    }
  }}
  ${props=>{
    if(props.size==="small"){
      return "padding: 0 1%"
    }
  }}
`



function Button({name,colorType,size}){
  return(
    <ButtonContainer colorType={colorType} size={size}>
      {name}
    </ButtonContainer>
  )
}
export default Button;