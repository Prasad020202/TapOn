import React from 'react';
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

function SideBar() {
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
