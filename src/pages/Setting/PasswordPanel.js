import React, { useState } from 'react'
import styled from 'styled-components';
import Button from '../../components/Navbars/Button'
import { auth } from '../auth/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { Link } from 'react-router-dom';



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


const PasswordPanel = () => {

  const[oldPassword, setOldPassword] = useState("");
  const[newPassword, setNewPassword] = useState("");

  let isNullOrWhiteSpaces = (value) => {
    value = value.toString();
    return value == null || value.replaceAll(" ", "").length < 1;
  };

  function checkCurrentPassword(newPassword) {

    const user = auth.currentUser;
   
    // Prompt the user to enter their current password
   
    // Create a credential with the user's email and current password
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
   
    // Re-authenticate the user with the credential
    return reauthenticateWithCredential(user, credential);
   }
  
  const updatePass = (e)=>{
    e.preventDefault();

    if (
      isNullOrWhiteSpaces(newPassword) ||
      isNullOrWhiteSpaces(oldPassword)
    ) {
      alert(
        "Enter All Fields"
      );
      return;
    }

    const user = auth.currentUser;

    checkCurrentPassword(newPassword)
    .then(() => {
      updatePassword(user, newPassword).then(() => {
        alert("Pass is changed")
       });
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong try again later");
    });


    // const credential = EmailAuthProvider.credential(user.email, oldPassword);

    // reauthenticateWithCredential(user, credential);


      // updatePassword(user, newPassword).then(() => {
      //   alert("Pass is changed")
      //  }).catch((error) => {
      //    console.log(error);
      //    alert("Something went wrong try again later");
      //  });
   

    // const newPassword = getASecureRandomPassword();
    
  }
  return (
    <PadBox >
      
         <Label>
          <h2>Change Password</h2>
            
          </Label>
          <form className=" flex flex-col w-full mt-12 mb-12 ">

            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}}/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Old Password</label>
              </div>


              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
              </div>

              <Buttoncontainer>
              {/* <Button text ="Change Password" onClick = {updatePass}/> */}
              <button onClick = {updatePass} className=' bg-black text-white p-3 px-5 rounded-3xl hover:h-14 hover:w-44'>Change Password</button>
              </Buttoncontainer>

              




              </form>
              <Bottom>
              <Link to={'/Settings/ProfileSetting'}>
              <button  className=' bg-black text-white p-3  rounded-3xl text-xs'>Profile Setting</button></Link>
              <Link to={'/Settings/Billing'}>
              <button  className=' bg-black text-white p-3  rounded-3xl text-xs'>Change Plan</button></Link>

              </Bottom>
              
             




         
       

        
        
          
            
        
    </PadBox>
  )
}

export default PasswordPanel