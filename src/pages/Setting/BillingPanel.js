import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/Navbars/Button'
import { Link } from 'react-router-dom';
import { auth, db } from '../auth/firebase';
import { doc, getDoc } from 'firebase/firestore';


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

  const [plan, setPlan] = useState("Parth");
  const[userID,setUserID] = useState("");

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {      
      setUserID(user.uid);
    })  
    setData();
  })

  const setData = async() =>{
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    setPlan(docData.data().Plan)

  }

  return (
    <PadBox>
      
         <Label>
          <h2>Change Plan</h2>
            <p>{`Your Current plan is ${plan}`}</p>


          </Label>
          <Buttoncontainer>
              <Link to={'/auth/plans'}><Button text ="Change Plan" /></Link>
              </Buttoncontainer>
              </PadBox>
  )
}

export default BillingPanel