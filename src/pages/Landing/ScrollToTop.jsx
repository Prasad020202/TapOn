import React from 'react'
import styled from 'styled-components'
import topArrow from "../../assets/img/up-arrow.png"


const Up =  styled.div`

    width: 3rem;
    height: 3rem;

    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.body};

    font-size: ${props => props.theme.fontxl};
    position: fixed;
    right: 1rem;
    bottom: 1rem;

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    transition: all 0.2s ease;

    &:hover{
        transform: scale(1.2);
    }
    &:active{
        transform: scale(0.9);
    }
`

const ScrollToTop = () => {

    const scrollTotop = () => {
       
        const element = document.getElementById("Home");

          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
          });
        

      }; 
  return (
    <Up onClick={()=> scrollTotop()}>
        {/* &#x2191; */}
        <img src={topArrow} alt="" />
    </Up>
  )
}

export default ScrollToTop