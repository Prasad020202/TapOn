import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Navbars/Button'


const PadBox = styled.div`
height: 100vh;
/* background-color: antiquewhite; */
width: 100vh;
display: flex; /* Added flex display */
flex-direction: column;

`;
const Buttoncontainer= styled.div`
width: fit-content;
margin-top: 20px;



`









const Label = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  font-weight: bold;
  font-size: 24px;
  & p {
    color: grey;
    font-weight: normal;
    font-size: 16px;
  }
`;

const BillingPanel = () => {
  return (
    <PadBox>
      
         <Label>
          <h2>Change Plan</h2>
            <p>Your Current plan is Free</p>


          </Label>
          <Buttoncontainer>
              <Button text ="Change Plan" />
              </Buttoncontainer>
              </PadBox>
  )
}

export default BillingPanel