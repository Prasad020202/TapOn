import React from 'react';
import styled from 'styled-components';
import SideBar from './SideBar';
import ProfileSetting from './ProfilePanel';
import Nav from "../../components/Navbars/Navprof";
import Password from './PasswordPanel';
import Billing from './BillingPanel';
import { Link, Navigate, useParams } from "react-router-dom";
import Backbutton from "../../assets/img/ArrowL.png";


const ContentArea = styled.div`
  padding: 2rem;
  background-image: linear-gradient(to bottom, black 14rem, whitesmoke 14rem);
`;

const SettingsHeader = styled.header`
  color: white;
  margin-bottom: 1rem;
  & ,h1{
    font-weight: bold;
    font-size: 28px;
  }
`;

const SettingsPane = styled.main`
  display: flex;
  background: white;
  border-radius: 0.5rem;
`;

const RightPanel = styled.div`
  border-left: 1px solid lightgrey;
  padding: 1rem;
  @media (max-width: 64em) {
    border-left: none;
    /* overflow: hidden; */
    padding: 2%;
    /* background-color: antiquewhite; */
    width: 100%;
  }
`;

const BurgerMenuWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Buttondiv = styled.div`
  display: flex;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  font-size: 16px;
`;

const components = {
  ProfileSetting: ProfileSetting,
  Password: Password,
  Billing: Billing
};

const Smain = () => {
  const { id } = useParams();
  const ComponentToRender = components[id];

  return (
    <div>
      {/* <Nav/> */}
      <ContentArea>
        <SettingsHeader>
          <h1>Settings</h1>
          <Link to="/dashboard">
            <Buttondiv>
              <img src={Backbutton} alt="" />
              <h3 className='ml-2'>Back to Dashboard</h3>
            </Buttondiv>
          </Link>
          
          
          
        </SettingsHeader>
        <SettingsPane>
          <SideBar />
          <RightPanel>
            {ComponentToRender ? <ComponentToRender /> : <Navigate to="/dashboard" />}
          </RightPanel>
        </SettingsPane>
      </ContentArea>
    </div>
  );
};

export default Smain;
