import React from 'react'
import styled from 'styled-components'
import TypeWriterText from './TypeWriterText'
import CoverVideo from './CoverVideo'




const Section = styled.section`
/* min-height: ${props=> `calc(100vh - ${props.theme.navHeight}) `};//og */
min-height: 100vh; //!ognal
width: 100%;  
position: relative;
background-color: white;


`
const Container = styled.div`
width: 75%;
min-height: 80vh;
margin: 0 auto ;
/* background-color: lightblue; */

display: flex;
justify-content: center;
align-items: center;
@media (max-width: 64em){
  width: 85%;

}
@media (max-width: 48em){
  flex-direction: column-reverse;
  width: 100%;
  &>*:first-child{
    width: 100%;
    margin-top:2rem;
  }

}


`

const Box = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;


`

const Home = () => {
  return (
    <Section>
      <Container>
        <Box><TypeWriterText/></Box>
        <Box><CoverVideo /></Box>




      </Container>




    </Section>
  )
}

export default Home