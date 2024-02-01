import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PadBox = styled.div`
  padding: 16px; /* Adjust as needed */
  /* background-color: aqua; */
  width: 20%;
`;



const SideMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* Adjust as needed */
  border-left: 0.25rem solid transparent;
  background: ${(props) => (props.active ? 'gainsboro' : 'transparent')};
  margin-bottom: 10px;
  cursor: pointer;
  
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
      
        <SideMenuItem active>
          <LogoWrapper square inverse size="1rem" />
          <Link to={'/Settings/ProfileSetting'}>Profile</Link>
        </SideMenuItem>
        {/* <SideMenuItem>
          <LogoWrapper square inverse size="1rem" />
          <Link to={'/Settings/ProfileSetting'}>Account</Link>
        </SideMenuItem> */}
        <SideMenuItem>
          <LogoWrapper inverse size="1rem" />
          <Link to={'/Settings/Password'}>Password</Link>
        </SideMenuItem>
        
        <SideMenuItem>
          <LogoWrapper inverse size="1rem" />
          <Link to={'/Settings/Billing'}>Billing</Link>
        </SideMenuItem>
      
    </PadBox>
  );
}

export default SideBar;
