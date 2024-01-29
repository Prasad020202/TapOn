import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "../pages/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { MdModeEdit } from "react-icons/md";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DashNav from "../components/Navbars/Navprof";




const Dashboard = () => {
  const navigate = useNavigate();

  const [displayUser, setDisplayUser] = useState("Please Login Bhai!");
  const [userID, setUserID] = useState("");

  const [displayCname, setdisplayCname] = useState("");
  const [displaylink1, setdisplaylink1] = useState("");
  const [displayPhoneNo, setdisplayPhoneNo] = useState("");

  const [displayUserName, setDisplayUserName] = useState("");

  const [displayPhoto, setDisplayPhoto] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");

  const [displayFacebook_Link, setDisplayFacebook_Link] = useState("Please Enter Your Facebook Link");
  const [displayInsta_Link, setDisplayInsta_Link] = useState("Please Enter Your Instagram Link");
  const [displayX_Link, setdisplayX_Link] = useState("Please Enter Your Twitter Link");
  const [displayDesc, setDisplayDesc] = useState("Enter Your Desc");

  // variables for inputing the data

  const [InputCname, setInputCname] = useState("");
  const [Inputlink1, setInputlink1] = useState("");
  const [InputPhoneNo, setInputPhoneNo] = useState("");
  const [InputInsta, setInputInsta] = useState("");
  const [InputFacebook, setInputFacebook] = useState("");
  const [InputX, setInputX] = useState("");
  const [InputAddress, setInputAddress] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [uploadPhoto, setUploadPhoto] = useState("");

  const [ImageURL, setImageURL] = useState("");

  const [InputDesc, setInputDesc] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [UN,setUN] = useState("");

  const [theme_url, setTheme_url] = useState("");
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setDisplayUser(user.displayName);
      // console.log(user.email);
      setUserID(user.uid);
      setUserEmail(user.email);
    });
    getData();
    setThemes();
  });

  const setThemes = async () => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    setTheme_Selected(docData.data().Theme);
    setTheme_url(docData.data().Theme_url);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Loged Out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getData = async () => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    console.log(docData.data());

    setdisplayCname(docData.data().Company_Name);
    setdisplaylink1(docData.data().Link);
    setdisplayPhoneNo(docData.data().PhoneNumber);
    setDisplayUserName(docData.data().User_Name);
    setDisplayPhoto(docData.data().Profile_URl);
    setDisplayAddress(docData.data().Address);
    setDisplayFacebook_Link(docData.data().Facebook_Link);
    setDisplayInsta_Link(docData.data().Instagram_Link);
    setdisplayX_Link(docData.data().X_Link);
    setDisplayDesc(docData.data().Desc);

    setUN(docData.data().username)
  };

  let isNullOrWhiteSpaces = (value) => {
    value = value.toString();
    return value == null || value.replaceAll(" ", "").length < 1;
  };

  const submitInNewWay = (e) => {
    e.preventDefault();

    if (
      isNullOrWhiteSpaces(InputCname) ||
      isNullOrWhiteSpaces(InputPhoneNo) ||
      isNullOrWhiteSpaces(Inputlink1) ||
      isNullOrWhiteSpaces(InputFacebook) ||
      isNullOrWhiteSpaces(InputInsta) ||
      isNullOrWhiteSpaces(InputX)
    ) {
      alert(
        "Fill all the field Bro! If you dont have any social media link then just enter random!"
      );
      return;
    }

    const data = {
      User_Name: displayUser,
      Company_Name: InputCname,
      PhoneNumber: InputPhoneNo,
      Link: Inputlink1,
      Instagram_Link: InputInsta,
      Facebook_Link: InputFacebook,
      X_Link: InputX,
      Profile_URl: ImageURL,
      Address: InputAddress,
      Desc: InputDesc,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);

    updateDoc(userRef, data)
      .then(() => {
        console.log("Document has been added successfully");
        setInputCname("");
        setInputPhoneNo("");
        setInputlink1("");
        setInputFacebook("");
        setInputInsta("");
        setInputX("");
        setImageURL("");
        setInputAddress("");
      })
      .catch((error) => {
        console.log(error);
      });

    const imgRef = ref(imageDb, `files/${userID}`);
    const uploadTask = uploadBytesResumable(imgRef, uploadPhoto);

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
        setImageURL(downloadURL);

        // Update Firestore with download URL
        const userRef = doc(collection(db, "UserInfo"), userID);
        await updateDoc(userRef, { Profile_URl: downloadURL });

        console.log("Document updated with download URL:", downloadURL);
        // Alert the user about successful upload and update
      }
    );
  };







  const copyToClipboard = () => {
    const textToCopy = `tapon/${UN}/${userID}`;

    // Using navigator.clipboard.writeText() for modern browsers
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text successfully copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };





  

  return (
    //     <>
    //        <h1>Hello {displayUser}</h1>

    // <h2>User Email {userEmail}</h2>

    //  <h3>Detail Form!</h3>

    // <input type="text" placeholder='Enter Company name' value={InputCname} onChange={(e) => {setInputCname(e.target.value)}}/>
    // <input type="text" placeholder='Enter Phone No' value={InputPhoneNo} onChange={(e) => {setInputPhoneNo(e.target.value)}}/>
    // <input type="text" placeholder='Enter Comapany Link' value={Inputlink1} onChange={(e) => {setInputlink1(e.target.value)}}/>

    // <input type="text" placeholder='Enter Instagram Link' value={InputInsta} onChange={(e)=>{setInputInsta(e.target.value)}}/>
    // <input type="text" placeholder='Enter Facebook Link' value={InputFacebook} onChange={(e)=>{setInputFacebook(e.target.value)}}/>
    // <input type="text" placeholder='Enter X(Twitter) Link' value={InputX} onChange={(e)=>{setInputX(e.target.value)}}/>

    // <input type="text" placeholder='Enter your Address' value={InputAddress} onChange={(e)=>{setInputAddress(e.target.value)}}/>

    // <input type="text" placeholder='Enter your Desc' value={InputDesc} onChange={(e)=>{setInputDesc(e.target.value)}}/>

    // {/* input profile pic / Comapany logo  */}

    // <input type="file" placeholder='Upload Your Profile/Comapany Photo'  onChange={(e)=>{setUploadPhoto(e.target.files[0])}}/>

    // <button onClick={submitInNewWay}>Submit In new Way!</button>

    // {/* practice purpose */}
    // <button onClick={getData}>Get the data</button>

    // <button onClick={handleSignOut} >SignOut!</button>

    //    {displayCname }

    //    {displaylink1}

    //    {displayPhoneNo }

    //    {displayAddress}
    // <h1>Your Name</h1>

    // {displayUserName}

    // <img  src={displayPhoto}/>\

    // <Link to={"/update"}>Update The info!</Link>

    // <br />
    // <br />

    // <Link to={"/Appreance"}>Appreance</Link>

    // <a href={`/${UN}/${userID}`}>View Mini Website!</a>
    //     </>

    <>
      <DashNav/>

      <div className="grid grid-cols-2 gap-1 m-5">
        <div className="grid grid-row-3 col-start-1 col-end-3"> 
            <div className=" bg-blue-200 h-14 rounded-lg grid grid-cols-3 items-center px-5">
              <p className="col-start-1 col-end-5 ">Your Live Mini-Website: <span className="underline decoration-solid font-semibold">{`tapon/${UN}/${userID}`}</span></p>
              <div className="grid grid-cols-2 col-end-7 col-span-2 gap-4 items-center">
                <p className="">Share Your Link to Anyone</p> 
                <button className=" bg-white rounded-xl h-10 font-semibold w-25"  onClick={copyToClipboard} >Copy Link</button>
              </div>
            </div>
            <div>
              
            </div>
        </div>

        <div className="grid grid-cols-2 col-end-6 col-span-3  ">
          <div class="border-2 w-0 h-screen "></div>
          <div className=" flex border-8 border-black rounded-xl h-lvh sticky mr-32  mt-12 " id="phone_display">
                <img src={theme_url} id="phone_display_img"/>

            </div>
        </div>
      </div>
    </>

    // <>
    //   <div className="flex flex-row gap-5">
    //     <div>
    //       <div>
    //         <p>
    //           Your Live Miniwebsite: <span>www.google.com</span>
    //         </p>
    //         <div>
    
    //           <h3>User Details Is here!</h3>
    //           {/* company name */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg" id="box">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Company Name <MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayCname}
    //               </p>
    //             </div>
    //           </div>

    //           {/* Phone Number */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Phone Number <MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayPhoneNo}
    //               </p>
    //             </div>
    //           </div>

    //           {/* Address */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Address<MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayAddress}
    //               </p>
    //             </div>
    //           </div>


    //         {/* Link */}

    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Link<MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displaylink1}
    //               </p>
    //             </div>
    //           </div>

    //           {/* Instagram Link */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Instagram Link<MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayInsta_Link}
    //               </p>
    //             </div>
    //           </div>

    //           {/* FaceBook Link */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Facebook Link <MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayFacebook_Link}
    //               </p>
    //             </div>
    //           </div>

    //           {/* X Link */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">X Link<MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayX_Link}
    //               </p>
    //             </div>
    //           </div>

    //           {/* Desc */}
    //           <div className="max-w-sm rounded overflow-hidden shadow-lg">
    //             <div className="px-6 py-4">
    //               <div className="font-bold text-xl mb-2 flex flex-row gap-5">Description<MdModeEdit /> </div>
    //               <p className="text-gray-700 text-base">
    //                 {displayDesc}
    //               </p>
    //             </div>
    //           </div>
              
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div>Phone</div>
    //     </div>
    //   </div>

    //   <div>


    // </div>
    // </>

    
  );
};

export default Dashboard;