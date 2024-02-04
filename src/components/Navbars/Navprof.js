import React,  { useState } from 'react'
import styled from 'styled-components'
import Logol from './Logol'

import { Link } from 'react-router-dom'
import Buttonudash from './Buttonudash'


const Section = styled.section`
 width: 100%;
 background-color: white;
 



`
const NavBar = styled.nav`

display: flex;
justify-content: space-between;
align-items: center;
width: 90%;
height: 3rem;
margin: 0 auto;
/* background-color: aliceblue; */

.mobile{
  display: none;
}
@media (max-width: 64em){

  .desktop{
    display: none;
  }
  .mobile{
  display: inline-block;
}
}





`
const Menu = styled.ul`
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;




@media (max-width: 64em) {
  //1024px

  position: fixed;
  top: 5rem;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100vh - 5rem);
  z-index:50;
  background-color:rgba(255,255,255,0.85);
  /* background-color: antiquewhite; */
  backdrop-filter: blur(2px);

  transform: ${props => props.click ? 'translateY(0)':'translateY(1000%)'};
  transition: 0.3s ease;




  flex-direction: column;
  justify-content: center;
  
}


`
const MenuItems = styled.li`

margin: 0 1rem;
color: black;
cursor: pointer;

&::after{
  content: '';
  display: block;
  width: 0%;
  height: 2px;
  background: black;
  transition: width 0.3s ease;


}
&:hover::after{
 width: 100%;
}

@media (max-width: 64em) {
  margin: 1rem 0;
  &::after{
  display: none;


}


}

`

const HamburgerMenu =styled.span`
width: ${props => props.click ? '2rem':'1.5rem'};
height: 2px;
background: black;

position: absolute;
top: 2rem;
left: 50%;
transform: ${props => props.click ? 'translateX(-50%) rotate(90deg)':'translateX(-50%) rotate(0)'};

display: none;
justify-content: center;
align-items: center;
cursor: pointer;
transition: all 0.3s ease;
@media (max-width: 64em) {
  //1024px

  display: flex;
  
}

&::after,&::before{
  content: '';
  width: ${props => props.click ? '1rem':'1.5rem'};
  height: 2px;
  right: ${props => props.click ? '-2px':'0rem'};;
  background: black;
  position: absolute;
transition: all 0.3s ease;

}
&::after{
  top: ${props => props.click ? '0.3rem':'0.5rem'};
  transform: ${props => props.click ? 'rotate(-40deg)':'rotate(0)'};
}
&::before{
  bottom: ${props => props.click ? '0.3rem':'0.5rem'};
  transform: ${props => props.click ? 'rotate(40deg)':'rotate(0)'};

}




`

// const ButtonContainer = styled.div`
//   margin-left: auto;
// `

const Navigation = () => {

  const [click, setClick] = useState(false);

  const scrollTo=(id)=>{
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior:'smooth',
      block:'start',
      inline:'nearest'
    })
    setClick(!click);


  }

  return (
    
    <Section id="navigation">
      <NavBar>
        <Logol/>
        <HamburgerMenu click={click} onClick={()=> setClick(!click)}>
        &nbsp;
        </HamburgerMenu>
        <Menu click={click}>
          <MenuItems >&nbsp;</MenuItems>
          <MenuItems >&nbsp;</MenuItems>
          <MenuItems >&nbsp;</MenuItems>
          <MenuItems >&nbsp;</MenuItems>
          <Link to="/dashboard" ><MenuItems>Dashboard</MenuItems></Link>
          <Link to="/Appreance" ><MenuItems> Appearance</MenuItems></Link>
          <MenuItems ><Link to={"/auth/plans"}>Plan</Link></MenuItems>
          <Link to="/Settings/ProfileSetting" ><MenuItems >Settings</MenuItems></Link>
          <MenuItems >&nbsp;</MenuItems>
          
          <MenuItems>
        

        <div className="mobile">
            {/* <Link to="/auth/Login">


              <Button text ="nav" />
          </Link> */}
        </div>  
          </MenuItems>

        </Menu>
        <div className="desktop">
        {/* <Link to="/auth/Login">


        <Button text ="Login / SignUP" />
          </Link> */}
        </div>  
        
        
        


        
          <Buttonudash />
        
        
      </NavBar>

    </Section>
    
  )
}

export default Navigation
