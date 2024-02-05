import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
cursor: pointer;
padding: 1rem 0.5rem;
display: flex;
flex-direction: column;
border-bottom: 1px solid rgb(238, 237, 222);
margin: 3rem 0;

`


const Title = styled.div`
font-size: 0.875em;
display: flex;
justify-content: space-between;
align-items: center;
text-transform: uppercase;


`
const Reveal= styled.div`
display: ${props=>props.clicked ? 'block':'none'};
margin-top: 1rem;
color: rgba(255,255,255,0.6);
font-size: 0.875em;
font-weight: 300;
line-height: 1.1rem;


`

const Name = styled.div`

display: flex;
align-items: center;
`
const Indicator = styled.span`
display: flex;
justify-content: center;
align-items: center;
font-size: 3em;
svg{
    width: 1rem;
    height: auto;
    fill: rgba(255,255,255,0.6) ;


}

`

const Accordion = ({title,children}) => {
    const [collapse,setCollapse]=useState(false)
  return (
    <Container>
        <Title onClick={()=>setCollapse(!collapse)}>
            <Name>
                <span>{title}</span>
            </Name>
            {
                collapse ?
                <Indicator>-
                    {/* <Minus/> */}
                </Indicator>:<Indicator>+
                    {/* <Minus/> */}
                </Indicator>
            }
        </Title>
        <Reveal clicked={collapse}>
            {children}
        </Reveal>
    </Container>
  )
}

export default Accordion