import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {

    const navigate = useNavigate();

    const[userEmail, setUserEmail] = useState("");

    const[errorMsg, setErrorMsg] = useState("");

    const handleForgotPassword = async (userEmail) => {
        
      };
      

    const submissionHandler = async(e) => {
        e.preventDefault();
        
        sendPasswordResetEmail(auth, userEmail).then((data) =>{
            alert("Please Check Email!");
            navigate("/auth/Login");
        }).catch((err)=>{
            setErrorMsg(err);
        })
    }
  return (
    <>
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-6 mt-6 font-bold">
                <p className='text-8xl'>Forgot Password</p>
              </div>
              <form onSubmit={submissionHandler}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email" 
                    value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} 
                  />
                </div>

                <p>{errorMsg}</p>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
  )
}

export default ForgotPass