import React from 'react'
import styled from 'styled-components'
import Carousel from './Carousal'
import Button from '../../components/Navbars/Button'

const Section =styled.section`


min-height: 100vh;
width: 100%;
background-color: rgb(30 41 59 );
/* color: white; */
display: flex;
justify-content: center;
align-items: center;
position: relative;


`

const Container = styled.div`
width: 80%;
margin: 0 auto ;
/* background-color: lightblue; */

display: flex;
justify-content: center;
align-items: center;
@media (max-width: 70em){
  width: 85%;

}

@media (max-width: 64em){
  width: 100%;
  flex-direction: column;

  &>*:last-child{
    width: 80%;
  }
}
@media (max-width: 40em){


  &>*:last-child{
    width: 90%;
  }
}


`

const Box = styled.div`
width: 50%;
height: 100%;
min-height: 60vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media (max-width: 40em){
  min-height:50vh;

}


`

const Title = styled.h2`

font-size: 3em;
text-transform: capitalize;
width: 80%; //80 tha  // 70 kiya
color: white;
align-self: flex-start;
margin: 0 auto;

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

const Subtitle = styled.p`

font-size: 1.25em;

width: 80%; //80 tha  // 70 kiya
color: white;
align-self: flex-start;
margin: 1rem auto;
font-weight: 400;
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
const Subtitlelight = styled.p`

font-size: 1em;

width: 80%; //80 tha  // 70 kiya
color: rgba(255,255,255,0.6);
align-self: flex-start;
margin: 1rem auto;
font-weight: 400;

@media (max-width: 64em){
  width: 100%;
  text-align: center;
font-size: 0.875em;


}
@media (max-width: 40em){
font-size: 0.875em;



}
@media (max-width: 30em){
font-size: 0.75em;

}

`

const Buttoncontainer = styled.div`
align-self: flex-start;
width: 80%;
display: flex;
margin: 0 auto;
@media (max-width: 64em){
width: 100%;
button{
  margin: 0 auto;

}

}

`


const About = () => {
  return (
    <Section>
      <Container>
        <Box>
          <Carousel/>
        </Box>
        <Box>
            <Title>
                Title



            </Title>
            <Subtitle>
                subtitle
                

            </Subtitle>
            <Subtitlelight>
                subtitle light

            </Subtitlelight>
            <Buttoncontainer> <Button text="Explore more" link="#" /></Buttoncontainer>
           



        </Box>


      </Container>
    </Section>
  )
}

export default About
