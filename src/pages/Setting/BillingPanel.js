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
@media (max-width: 64em){
   width: 100%;
   height: 100%;
   padding: 5%;
   
  
  
}

`;
const Buttoncontainer= styled.div`
width: fit-content;
margin-top: 20px;
@media (max-width: 64em){
  align-self: center;

}



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


const Bottom=styled.div`
display: none;
@media (max-width: 64em){
display: block;
justify-content: space-between;
display: flex;
margin-top: 10%;
cursor: pointer;
}


`

const BillingPanel = () => {

  const [plan, setPlan] = useState("Parth");
  const[userID,setUserID] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
       if (user) {
         console.log('User object:', user);
         setUserID(user.uid);
         // Call getData with the user ID directly
         setData(user.uid);
       } else {
         console.log('No user is signed in.');
       }
    });
   
    // Clean up subscription on unmount
    return () => unsubscribe();
   }, []);

  const setData = async(userId) =>{
    if (!userId) {
      console.log('User ID is not set.');
      return;
   }
    const docRef = doc(db, "UserInfo", userId);

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
              <Bottom>
              <Link to={'/Settings/ProfileSetting'}>
              <button  className=' bg-black text-white p-3  rounded-3xl text-xs'>Profile Setting</button></Link>
              <Link to={'/Settings/Password'}>
              <button  className=' bg-black text-white p-3  rounded-3xl text-xs'>Change Password</button></Link>

              </Bottom>
              </PadBox>
  )
}

export default BillingPanel