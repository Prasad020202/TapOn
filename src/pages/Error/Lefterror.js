import React from 'react'
import styled from 'styled-components'
import Typewriter from 'typewriter-effect';
import  Button from '../../components/Navbars/Button';

const Title = styled.h2`
font-size: 6em;
text-transform: capitalize;
width: 70%; //80 tha  // 70 kiya
color: black;
align-self: flex-start;
span{
    text-transform: uppercase;
    font-family: Akaya Telivigala , cursive;
}




@media (max-width: 64em){
  width: 100%;
  text-align: center;

}
@media (max-width: 40em){
font-size: 2em;



}
@media (max-width: 30em){
font-size: 1.25em;

}


`



const SubTitle = styled.h3`

font-size: 3em ;
text-transform: capitalize;
color:rgba(32,32,32 ,0.6);
font-weight:600;
margin-bottom:1rem;
width:80%;
align-self:flex-start;


@media (max-width: 64em){
  width: 100%;
  text-align: center;
font-size: 1em;


}
@media (max-width: 40em){
font-size: 1em;



}
@media (max-width: 30em){
font-size: 0.875em;

}




`
const ButtonContainer= styled.div`
width:80%;
align-self:flex-start;
display: flex;
@media (max-width: 64em){
width: 100%;
button{
  margin: 0 auto;

}

}


`

const TypeWriterText = () => {
  return (
    <>
    <Title>
        404
    </Title>
     <SubTitle>Something Went Wrong!!</SubTitle>
     <ButtonContainer>
     <Button text="Back to Homepage" link="#about"/>
     </ButtonContainer>
     </>
  )
}

export default TypeWriterText