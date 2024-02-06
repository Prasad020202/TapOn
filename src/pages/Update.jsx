import React, { useEffect, useState } from 'react'
import { auth, db, imageDb } from '../pages/auth/firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [DisplayCompanyName, setDisplayCompanyName] = useState("")
    const [DisplayPhoneNo, setDisplayPhoneNo] = useState("")
    const [DisplayLink, setDisplayLink] = useState("")
    const[userID, setUserID] = useState("");

    const[updateCompanyName, setUpdateCompanyName] = useState("");
    const[updatePhoneNO, setUpdatePhoneNO] = useState("");
    const[updateLink, setUpdateLink] = useState("");

    const[DisplayProfile, setDisplayProfile] = useState("");

    const[updateProfile, setUpdateProfile] = useState("")

    const[DisplayFacebookLink, setDisplayFacebookLink] = useState("");
    const[updateFacebookLink, setUpdateFacebookLink] =useState("")

    const[DisplayInstaLink, setDisplayInstaLink] = useState("");
    const[updateInstaLink, setUpdateInstaLink] = useState("");

    const[DisplayXLink, setDisplayXLink] = useState("");
    const[updateXLink, setUpdateXLink] = useState("");

    // useEffect(()=>{
    //     auth.onAuthStateChanged((user)=>{
    //     // setDisplayUser(user.displayName);
    //     console.log(user.uid);
    //     setUserID(user.uid);

    //     const docRef = doc(db, "UserInfo", userID);
    // const docData = getDoc(docRef);

    // console.log(docData.data());


    // setDisplayCompanyName(docData.data().userData.cname);
    // setDisplayPhoneNo(docData.data().userData.link1);
    // setDisplayLink(docData.data().userData.phoneNo);
    //   })
    // })

    // const userId = auth.currentUser.uid;

    useEffect(()=>{
      auth.onAuthStateChanged((user)=>{
      setUserID(user.uid);
    })
    })


    const getData = async () => {
      const docRef = doc(db, "UserInfo", userID);
  
      const docData = await getDoc(docRef);
  
      setDisplayCompanyName(docData.data().Company_Name);
      setDisplayLink(docData.data().Link);
      setDisplayPhoneNo(docData.data().PhoneNumber);
      setDisplayProfile(docData.data().Profile_URl);
      setDisplayFacebookLink(docData.data().Facebook_Link);
      setDisplayInstaLink(docData.data().Instagram_Link);
      setDisplayXLink(docData.data().X_Link);

    }

    window.onload = getData();

    const EditCname = async(e) =>{
      e.preventDefault();
      
      console.log(updateCompanyName);

      const data = {
        Company_Name: updateCompanyName
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
      updateDoc(userRef, data)
      .then(userRef => {
          console.log("Value of an Existing Document Field has been updated");
          setDisplayCompanyName(data.Company_Name)
          setUpdateCompanyName("");
      })
      .catch(error => {
        console.log(error);
      })
    }

    const EditPhoneNo = async(e) =>{
      e.preventDefault();
      
      console.log(updatePhoneNO);

      const data = {
        PhoneNumber: updatePhoneNO
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
      updateDoc(userRef, data)
      .then(userRef => {
          console.log("Value of an Existing Document Field has been updated");
          setDisplayPhoneNo(data.PhoneNumber)
          setUpdatePhoneNO("");
      })
      .catch(error => {
        console.log(error);
      })
    }

    const EditLink = async(e) =>{
      e.preventDefault();
      
      console.log(updateLink);

      const data = {
        Link: updateLink
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
        updateDoc(userRef, data)
        .then(userRef => {
            console.log("Value of an Existing Document Field has been updated");
            setDisplayLink(data.Link)
            setUpdateLink("");
        })
        .catch(error => {
          console.log(error);
        })
    }

    const EditFacebookLink = async(e) =>{
      e.preventDefault();
      
      console.log(updateFacebookLink);

      const data = {
        Facebook_Link: updateFacebookLink
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
        updateDoc(userRef, data)
        .then(userRef => {
            console.log("Value of an Existing Document Field has been updated");
            setDisplayFacebookLink(data.Facebook_Link)
            setUpdateFacebookLink("");
        })
        .catch(error => {
          console.log(error);
        })
    }

    const EditInstaLink = async(e) =>{
      e.preventDefault();
      
      console.log(updateInstaLink);

      const data = {
        Instagram_Link: updateInstaLink
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
        updateDoc(userRef, data)
        .then(userRef => {
            console.log("Value of an Existing Document Field has been updated");
            setDisplayInstaLink(data.Instagram_Link)
            setUpdateInstaLink("");
        })
        .catch(error => {
          console.log(error);
        })
    }

    const EditXLink = async(e) =>{
      e.preventDefault();
      
      console.log(updateXLink);

      const data = {
        X_Link: updateXLink
      };

      const userRef = doc(collection(db, "UserInfo"), userID);
        updateDoc(userRef, data)
        .then(userRef => {
            console.log("Value of an Existing Document Field has been updated");
            setDisplayXLink(data.X_Link)
            setUpdateXLink("");
        })
        .catch(error => {
          console.log(error);
        })
    }

    const EditProfile = async(e) =>{
      e.preventDefault();
      
      const imgRef = ref(imageDb, `files/${userID}`);
      const uploadTask = uploadBytesResumable(imgRef, updateProfile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling (e.g., update a progress bar)
      },
      (error) => {
        // Error handling
        console.error(error);
        // Alert the user about the error
      },
      async () => {
        const downloadURL = await getDownloadURL(imgRef);
        // setImageURL(downloadURL);

        // Update Firestore with download URL
        const userRef = doc(collection(db, "UserInfo"), userID);
        await updateDoc(userRef, { Profile_URl: downloadURL });

        console.log("Document updated with download URL:", downloadURL);
        // Alert the user about successful upload and update

        setDisplayProfile(downloadURL)
      }
    );
      }

    function clickMe() {
      console.log("Hello");
      var text = document.getElementById("popup");
      text.classList.toggle("hide");
      text.classList.toggle("show");
    }

    
    const AddNewData = () =>{
      console.log("I was clicked");
    }
    

  return (
    <>
        {userID}

            <br />
            {DisplayCompanyName}
            <input type="text" placeholder='Update company name' value={updateCompanyName} onChange={(e)=>{setUpdateCompanyName(e.target.value)}}/>
            <button onClick={EditCname}>Update</button>
            <br />
            {DisplayPhoneNo}
            <input type="text" placeholder='Update Phone Number'  value={updatePhoneNO} onChange={(e)=>{setUpdatePhoneNO(e.target.value)}} />
            <button onClick={EditPhoneNo}>update</button>
            <br />
            {DisplayLink}
            <input type="text" placeholder='Update link'  value={updateLink} onChange={(e)=>{setUpdateLink(e.target.value)}}/>
            <button onClick={EditLink}>Update</button>

            <img src={DisplayProfile} alt="not found" />
            {/* <input type="text" placeholder='Update Profile Photo'  value={updateProfile} onChange={(e)=>{setUpdateProfile(e.target.value)}}/> */}

            <input type="file"  placeholder='Update Profile Photo'  onChange={(e)=>{setUpdateProfile(e.target.files[0])}}/>
            <button onClick={EditProfile}>Update</button>

            {DisplayFacebookLink}
            <input type="text" placeholder='Update Facebook link'  value={updateFacebookLink} onChange={(e)=>{setUpdateFacebookLink(e.target.value)}}/>
            <button onClick={EditFacebookLink}>Update</button>

            {DisplayInstaLink}
            <input type="text" placeholder='Update Instagram link'  value={updateInstaLink} onChange={(e)=>{setUpdateInstaLink(e.target.value)}}/>
            <button onClick={EditInstaLink}>Update</button>

            {DisplayXLink}
            <input type="text" placeholder='Update X link'  value={updateXLink} onChange={(e)=>{setUpdateXLink(e.target.value)}}/>
            <button onClick={EditXLink}>Update</button>

            <h1>Want to Add some more data?</h1>

            <button id="theButton" onClick={clickMe}>Add Data</button>

            <form action="" id="popup" className="hide">
              <input type="text" />
              <input type="text" placeholder=''/>
              <button onClick={AddNewData} >Add new Data!</button>
            </form>
      
            <br />

        <Link to={"/dashboard"}>Go to Dashboard</Link>
    </>
  )
}

export default Update