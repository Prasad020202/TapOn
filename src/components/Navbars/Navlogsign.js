import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'

import { Link } from 'react-router-dom'


const Section = styled.section`
 width: 100%;
 background-color:rgb(30 41 59 );
    opacity: 1;


`
const NavBar = styled.nav`

display: flex;
justify-content: space-between;
align-items: center;
width: 95%;
height: 4rem;
margin: 0 auto;


`
const Menu = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;




`
const MenuItems = styled.li`

margin: 0 1rem;
color: white;
cursor: pointer;

&::after{
  content: '';
  display: block;
  width: 0%;
  height: 2px;
  background: white;
  transition: width 0.3s ease;


}
&:hover::after{
 width: 100%;
}



`

const Navigation = () => {
  return (
    <Section>
      <NavBar>
        <Logo/>
        {/* <Menu>
          <MenuItems>Home</MenuItems>
          <MenuItems>About</MenuItems>
          <MenuItems>Roadmap</MenuItems>
          <MenuItems>Showcase</MenuItems>
          <MenuItems>Team</MenuItems>
          <MenuItems>Faq</MenuItems>


        </Menu> */}
        
      </NavBar>

    </Section>
  )
}

export default Navigation