import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Navbars/Button'


const PadBox = styled.div`
height: 100vh;
/* background-color: antiquewhite; */
width: 100vh;
display: flex; /* Added flex display */
flex-direction: column;
/* background-color: beige; */

@media (max-width: 64em){
   width: 100%;
   height: 100%
  
  
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

  @media (max-width: 64em){
  & h2{
    align-self: center;
    margin-bottom: 2%;
  }
  
  
}
`;
const Profile = styled.div`
@media (max-width: 64em){
  border-bottom: 4px solid black;
  
  }





`

const Password= styled.div`
display: none;
@media (max-width: 64em){
  border-bottom: 4px solid black;
  display:block;
  margin-top: 4%;
  }

`
const Billing= styled.div`
display: none;
@media (max-width: 64em){
  display:block;
  margin-top: 4%;
  }

`





function ProfilePanel() {
  return (
    <>
    <PadBox>
      <Profile>
      
         <Label>
          <h2>Profile</h2>
            <p>This information will be displayed publicly, so be careful what you share.</p>
          </Label>
         
          <form className=" flex flex-col w-full mt-12 mb-12 ">

            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
              </div>


              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">URL</label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company</label>
              </div>

              <Buttoncontainer>
              <Button text ="Save" />
              </Buttoncontainer>



              </form>
              </Profile>


              <Password>

              <Label>
          <h2>Change Password</h2>
            
          </Label>
          <form className=" flex flex-col w-full mt-12 mb-12 ">

            <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Old Password</label>
              </div>


              <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
              <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
              </div>

             

             

              

              <Buttoncontainer>
              <Button text ="Change Password" />
              </Buttoncontainer>



              </form>



              </Password>


              <Billing>

              <Label>
          <h2>Change Plan</h2>
            <p>Your Current plan is Free</p>


          </Label>
          <Buttoncontainer>
              <Button text ="Change Plan" />
              </Buttoncontainer>
              


              </Billing>
              
              
             




         
       

        
        
          
            
        
    </PadBox>
    {/* <Imgcontainer>
    
              </Imgcontainer> */}
    
    </>
  );
}




export default ProfilePanel;
