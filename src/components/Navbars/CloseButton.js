import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
display: inline-block;
background-color: black;
color: white;
outline: none;
border: none;
font-size: 0.80em;
margin-left: 1%;

border-radius: 50px;
cursor: pointer;
transition: all 0.2s ease;
position: relative;
align-items: center;
width: 9vh;
height: 4vh;


&:hover{
    transform: scale(0.9);
    
}




`


const CloseButton = ({text,link , onClick}) => {
  return (
    <Btn onClick={onClick} >
        <a href={link} aria-label={text} target='_blank' rel='noreferror'>
            {text}
            </a>


    </Btn>
  )
}

export default CloseButton