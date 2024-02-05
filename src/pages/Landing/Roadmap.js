import React from 'react'
import styled from 'styled-components'
import DrawSvg from './DrawSvg'
// import About from './About'



const Section =styled.section`


min-height: 100vh;
width: 100%;
background-color: white;
position: relative;


`

const Title = styled.h1`

font-size: 3em;
text-transform: capitalize;
color: black;
display: flex;
justify-content: center;
align-items: center;
margin: 1rem auto;
border-bottom: 2px solid black;
width: fit-content;
@media (max-width: 40em){
  font-size: 2em;
}

`
const Container=styled.div`
width: 70%;
height: 200vh;
background-color: white;
margin: 0 auto;
display: flex;
justify-content: center;
align-items: center;
position: relative;
@media (max-width: 64em){
  width: 80%;
}
@media (max-width: 48em){
  width: 90%;
}


`

const SvgContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;



`

const Items = styled.ul`
list-style: none;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
/* background-color: Lightblue; */

@media (max-width: 48em){
  width: 90%;
}

&>*:nth-of-type(2n+1){
  justify-content: start;
  @media (max-width: 48em){
  justify-content: center;
}

  div{
    border-radius: 50px 0 50px 0;
    text-align: right;


    @media (max-width: 48em){
      border-radius: 0 50px 0 50px ;
      text-align: left;
      p{
    border-radius:  0 40px 0 40px;
  }
}


  }
  p{
    border-radius: 40px 0 40px 0;
  }

}
&>*:nth-of-type(2n){
  justify-content: end;
  @media (max-width: 48em){
  justify-content: center;
}

  div{
    border-radius: 0 50px 0 50px ;
    text-align: left;


    
    
  }
  p{
    border-radius: 0 50px 0 50px ;
  }
  
}





`

const Item = styled.li`
width: 100%;
height: 100%;
display: flex;

@media (max-width: 48em){
  justify-content: flex-end !important;
}


`
const ItemContainer=styled.div`
width: 40%;
height: fit-content;
padding: 1rem;
border: 3px solid black;

@media (max-width: 48em){
  width: 70%;
}


`
const Box = styled.p`
height: fit-content;
background-color: rgb(238, 237, 222);
color: black;
padding: 1rem;
position: relative;
border: 1px solid black;


`

const SubTitle=styled.span`
display: block;
font-size: 2em;
text-transform: capitalize;
color: black;

@media (max-width: 40em){
  font-size: 1.25em;
  font-weight: 600;
}



`;
const Text=styled.span`

display: block;
font-size: 0.875em;
text-transform: capitalize;
color: black;
font-weight: 400;
margin: 0.5rem 0;

@media (max-width: 40em){
  font-size: 0.75em;

}


`;


// const RoadMapItem=({title, subtext, addToRef}) =>{
  const RoadMapItem=({title, subtext, }) =>{
  return(
    <>
    {/* <About/> */}
    {/* // <Item ref={addToRef}> */}
      <Item>
      <ItemContainer>
        <Box>
          <SubTitle>{title}</SubTitle>
          <Text>{subtext}</Text>
        </Box>

      </ItemContainer>
    </Item>
    </>
  )

}

const Roadmap = () => {
  // const revealRefs= useRef([]);
  // revealRefs.current=[];
  // gsap.registerPlugin(ScrollTrigger);
  // const addToRefs= (el)=>{
  //   if(el && !revealRefs.current.includes(el)){
  //     revealRefs.current.push(el);
  //   }

  // }
  // useLayoutEffect(() => {
  //   let t1 = gsap.timeline();
  //   revealRefs.current.forEach(  (el,index) => {
  //     t1.fromTo(

  //     )




  //   }   )
  
  //   return () => {
      
  //   };
  // }, [])


  return (
    <Section>

        <Title>
        Roadmap
        </Title>
        <Container>
          <SvgContainer>
            <DrawSvg/>


          </SvgContainer>
          <Items>
            <Item>&nbsp;</Item>
            {/* <RoadMapItem addToRefs={addToRefs} title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem addToRefs={addToRefs} title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem addToRefs={addToRefs} title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem addToRefs={addToRefs} title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem addToRefs={addToRefs} title="Title1" subtext="this is subtext 1"/> */}

            <RoadMapItem title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem title="Title1" subtext="this is subtext 1"/>
            <RoadMapItem title="Title1" subtext="this is subtext 1"/>
          </Items>

        </Container>
    </Section>
  )
}

export default Roadmap