import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const LogoText =styled.h1`


  font-family: 'Akaya Telivigala', cursive;
  font-size: 2.8rem;
  transition: all 0.2s ease;
  color: white;
  
   &:hover{
    transform: scale(1.1);
   }  
  


`

const Logo = () => {
  return (
    <LogoText>

        <Link to='/'>Tapon.</Link>
    </LogoText>
  )
}

export default Logo