import React, { useEffect, useState } from 'react'
import { auth, db, imageDb } from './auth/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Uname() {

  const navigate = useNavigate();


  const[InputUsername , setInputUsername] = useState("")
  const[userID, setUserID] = useState("");

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
    setUserID(user.uid);

  })
})

const submitHandler = (e) =>{
  e.preventDefault();

  const data = {
    username: InputUsername
  }
  const userRef = doc(collection(db, "UserInfo"), userID);

  updateDoc(userRef, data)
    .then(() => {
        console.log("Document has been added successfully");
        
        navigate('/dashboard');
    })
    .catch(error => {
        console.log(error);
    })

}
  return (
    <>
    
    <div className="container mx-auto px-4 h-full  ">
        <div className="flex content-center items-center justify-center h-full ">
          
    <div>
      <h1 className=' font-bold text-6xl mb-4 text-white'>Welcome to TapON !!</h1>
      <p className='text-2xl mb-5 text-white ml-32'>Choose your TapON Username</p>
      <div className='flex border-0 rounded'>

      <input
                      type="username"
                      className="border-0 px-3 py-3 placeholder-zinc-800 text-zinc-900 bg-white  text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Username"
                      value={InputUsername} onChange={(e) => {setInputUsername(e.target.value)}}
                    />

      <button type="submit" className='bg-white text-zinc-900 px-3' onClick={submitHandler}>Enter</button>      
      
      </div>
            
      </div>
   
    </div>
    </div>
    
    </>
  )
}

export default Uname