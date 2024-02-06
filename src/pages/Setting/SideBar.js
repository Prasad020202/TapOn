import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img1 from '../../assets/img/accounts.png'
import img2 from '../../assets/img/passwords.png'
import img3 from '../../assets/img/Billings.png'


const PadBox = styled.div`
  padding: 16px; /* Adjust as needed */
  /* background-color: aqua; */
  width: 20%;
  @media (max-width: 64em) {
    display: none;
  }
`;



const SideMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* Adjust as needed */
  border-left: 0.25rem solid transparent;
  margin-bottom: 10px;
  cursor: pointer;
  border-bottom: 1px solid black;
  & img{
    width: 20px;
    margin-right: 5%;
  }
  
`;

const LogoWrapper = styled.div`
  --size: ${(props) => props.size};
  background: ${(props) => (props.inverse ? 'black' : 'white')};
  width: var(--size);
  height: var(--size);
  ${(props) => !props.square && 'border-radius: 50%;'}
  margin-right: 15px;
`;


const HamburgerMenu =styled.span`
width: ${props => props.click ? '2rem':'1.5rem'};
height: 2px;
background: black;

position: absolute;
top: 2rem;
left: 50%;
transform: ${props => props.click ? 'translateX(-50%) rotate(90deg)':'translateX(-50%) rotate(0)'};

/* display: none; */
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




`;

function SideBar() {


  const [click, setClick] = useState(false);

  const scrollTo = (id) => {
    console.log('Scrolling to:', id);
    const element = document.getElementById(id);
    console.log('Element:', element);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
    setClick(!click);
  };

  return (
    <PadBox as="nav">


       




          <Link to={'/Settings/ProfileSetting'}>
      
        <SideMenuItem>
          {/* <LogoWrapper square inverse size="2px" /> */}
          <img src={img1} alt=''/>
          Profile
        </SideMenuItem>
        </Link>


        <Link to={'/Settings/Password'}>
        <SideMenuItem>
        <img src={img2} alt=''/>
          Password
        </SideMenuItem>
        </Link>


        <Link to={'/Settings/Billing'}>
        <SideMenuItem>
        <img src={img3} alt=''/>
          Billing
        </SideMenuItem>
        </Link>
    </PadBox>
  );
}

export default SideBar;
