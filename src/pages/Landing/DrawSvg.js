import React, { useRef, useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Vector from './Vector';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const VectorContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%; // 50 tha
  transform: translate(-50%);
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  /* background-color: antiquewhite; */
  justify-content: center;

  @media (max-width: 48em){
  left: 1rem;
}
  
`
const Bounce = keyframes`
from{ transform: translate(-50%) scale(0.5);}
to{ transform: translate(-50%) scale(1)};

`

const Ball = styled.div`
position: absolute;
top: 0;
left: 50%; // 50 tha
transform: translate(-50%);
width: 1.5rem;
height: 1.5rem;
border-radius:50%;
background-color: black;
animation: ${Bounce} 0.5s linear infinite alternate;

@media (max-width: 48em){
  left: 1rem;
}


`

const DrawSvg = () => {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);





  useLayoutEffect(() => {
    let element = ref.current;
    let svg = document.getElementsByClassName("svg-path")[0];
    // const length = svg.getTotalLength();
    const length =svg.getTotalLength();



    svg.style.strokeDasharray = length;
    svg.style.strokeDashoffset = length;

    let t1= gsap.timeline({
      scrollTrigger: {
            trigger: element,
            start: 'top center',
            end: 'bottom bottom',
            scrub: 0.2,

            onUpdate: (self) => {

              
                  const draw = length * self.progress;
          
                  // // reverse for up
                  svg.style.strokeDashoffset = length - draw;
                }


      }


    })  

    return () => {};
  }, []);






  return (
    <>
    <Ball/>
     <VectorContainer ref={ref}>

   

      <Vector />
    </VectorContainer>
    </>
  );
};

export default DrawSvg;
