import React from 'react'
import styled from 'styled-components'
import Typewriter from 'typewriter-effect';
import  Button from '../../components/Navbars/Button';
import { Link } from 'react-router-dom';

const Title = styled.h2`
font-size: 3em;
text-transform: capitalize;
width: 70%; //80 tha  // 70 kiya
color: black;
align-self: flex-start;
span{
    text-transform: uppercase;
    font-family: Akaya Telivigala , cursive;
}
.text-1{
    color: red;
}
.text-2{
    color: blue;
}

@media (max-width: 70em){
  font-size: 2em;

   }
   @media (max-width: 48em){
    align-self: center;
  text-align: center;

   }
   @media (max-width: 40em){
    width:90%;


   }
   


`



const SubTitle = styled.h3`

font-size: 1.25em ;
text-transform: capitalize;
color:rgba(32,32,32 ,0.6);
font-weight:600;
margin-bottom:1rem;
width:80%;
align-self:flex-start;

@media (max-width: 40em){
  font-size: 1em;

   }

   @media (max-width: 48em){
    align-self: center;
  text-align: center;

   }
 




`
const ButtonContainer= styled.div`
width:80%;
align-self:flex-start;

@media (max-width: 48em){
    align-self: center;
  text-align: center;

  button{
    margin: 0 auto;
  }

   }


`

const TypeWriterText = () => {
  return (
    <>
    <Title>
        Discover a new era of cool
        <Typewriter

        options={{
            autoStart:true,
            loop:true,
        }}
  onInit={(typewriter) => {
    typewriter.typeString('<span class="text-1">Minipages</span>')
    .pauseFor(2000)
    .deleteAll()
    // .typeString('<span class="text-2">Sharable-Pages</span>')
    
   
    .start()
      
  }}
/>

   
    </Title>
     <SubTitle>Discover a new world of Webpages</SubTitle>
     <ButtonContainer>
     <Link to="/auth/Login">
     <Button text="Explore" /></Link>
     </ButtonContainer>
     </>
  )
}

export default TypeWriterText