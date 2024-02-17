import React from "react";
import { Link } from "react-router-dom";
import Uname from "../Uname";
import { useParams } from "react-router-dom";

import { useState } from 'react';
import { createUserWithEmailAndPassword , getAdditionalUserInfo, signInWithPopup, updateProfile} from "firebase/auth";
import { auth, db } from './firebase';
// import { useRouter } from 'next/navigation'
// import Link from "next/link";
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Register() {
  const {id} = useParams();

  const navigate = useNavigate();

    const [FullName, setFullName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const[disableBtn, setDisableBtn] = useState(false)

    
    // here with using createUserWithEmailAndPassword a function of firebase is called will create the user in authencationn in firebase 

    const handleSubmission = (e) => {
        e.preventDefault();

        if (FullName === "" || userEmail === "" || userPass === "") {
            setErrorMsg("You haven't entered all fields");
            return;
        }

        setErrorMsg("");

        // Use createUserWithEmailAndPassword

        createUserWithEmailAndPassword(auth, userEmail, userPass)
            .then(async(res) => {
                const user = res.user;
                const userUID = user.uid

                // const CollectionRef = doc(db, "UserInfo", userUID);
                const userRef = doc(collection(db, "UserInfo"), userUID);

                const data = {
                  Full_Name : user.displayName,
                  Theme: "Default",
                  email: user.email
                }

                // const docRef = await setDoc(CollectionRef, data).then((re)=>{
                //     console.log("Full name is added!");
                // }).catch((e)=>{
                //     console.log("FireStore error is",e.message);
                // })

                setDoc(userRef, data)
    .then(() => {
        console.log("Document has been added successfully");

    })
    .catch(error => {
        console.log(error);
    })

                await updateProfile(user, {
                    displayName: FullName
                })
                setDisableBtn(true);

                // after clicking the submit btn page will go to Login Page using router 

                navigate('/uname');

                // router.push('/Login');
            })
            .catch((err) => {
                setErrorMsg(err.message)
            });
    };

    const SignupWithGoogle = () => {
      signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user.uid);

    const user_uid = user.uid;
    const userRef = doc(collection(db, "UserInfo"), user_uid);

    const data = {
      Full_Name : user.displayName,
      Theme: "Default",
      email: user.email
    }

    // const docRef = await setDoc(CollectionRef, data).then((re)=>{
    //     console.log("Full name is added!");
    // }).catch((e)=>{
    //     console.log("FireStore error is",e.message);
    // })

    setDoc(userRef, data)
.then(() => {
console.log("Document has been added successfully");
navigate('/uname');
})
.catch(error => {
console.log(error);
})



    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
    }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center  justify-center h-full">
          <div className="w-full lg:w-5/12 px-4 mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                 
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button" onClick={SignupWithGoogle}
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form onSubmit={handleSubmission}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={FullName} onChange={(e) => { setFullName(e.target.value) }}
                    />
                  </div>

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

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={userPass} onChange={(e) => { setUserPass(e.target.value) }}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className=" text-xs">

                    <label className="inline-flex items-center cursor-pointer">
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Already have an account?{" "}
                        
                        <span
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Link to={"/auth/Login"}>
                          Login
                          </Link>
                        </span>
                        
                      </span>
                    </label>
                  
                  </div>

                  <div className="text-center mt-6">
                  
                    <button 
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      disabled={disableBtn}
                    >
                      Create Account
                    </button>
                    
                    <p>{errorMsg}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
