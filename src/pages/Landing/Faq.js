import React, { useRef  } from 'react'
import styled from 'styled-components'
import Accordion from './Accordion'
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';



const Section =styled.section`

height: auto;
min-height: 100vh;
width: 100%;
background-color: rgb(30 41 59 );
position: relative;
color: white;


display: flex;
justify-content: center;
align-items: center;
flex-direction: column;



`

const Title = styled.h1`

font-size: 3em;
text-transform: uppercase;
color: white;

margin: 1rem auto;
border-bottom: 2px black;
width: fit-content;

@media (max-width: 48em){
    font-size: 2em;

}

`
const Container =styled.div`

width: 75%;
margin:2rem auto;

display: flex;
justify-content: space-between;
align-content: center;


@media (max-width: 64em){
    width: 80%;

}
@media (max-width: 48em){
    width: 90%;
    flex-direction: column;
    &>*:last-child{
        &>*:first-child{
            margin-top: 0;
        }

    }

}

`
const Box = styled.div`
width: 45%;
@media (max-width: 64em){
    width: 90%;
    align-self: center;

}



`

const Faq = () => {
    const ref = useRef(null);
   
    // gsap.registerPlugin(ScrollTrigger);
    // useLayoutEffect(() => {
    //   let element = ref.current;
    //   ScrollTrigger.create({
    //     trigger: element,
    //     start:'top top',
    //     end:'bottom top',
    //     pin:true,
    //     pinSpacing:false,
    //     scrub:true,

    //   })
    
    //   return () => {
    //     ScrollTrigger.kill();
        
    //   };
    // }, [])
  return (
    <Section ref={ref}>

        <Title>
            Faq
        </Title>

        <Container>
            <Box>
                <Accordion title="What is yur name?">
                    react

                </Accordion>
                <Accordion title="Whre do u liv?">
                    in javascript

                </Accordion>
                <Accordion title="do u know next?">
                    yes he is my framework

                </Accordion>
            </Box>
            <Box>
            <Accordion title="What is yur name?">
                    react

                </Accordion>
                <Accordion title="Whre do u liv?">
                    in javascript

                </Accordion>
                <Accordion title="do u know next?">
                    yes he is my framework

                </Accordion>
            </Box>
            
        </Container>
    </Section>
  )
}

export default Faq