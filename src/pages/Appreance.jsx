import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "./auth/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import img1 from "../assets/img/Theme1.jpg"
import img2 from "../assets/img/Theme2.jpg"

import template1 from "../assets/img/template_1.png"
import template2 from "../assets/img/template_2.png"
import template3 from "../assets/img/template_3.png"
import template4 from "../assets/img/template_4.png"
import template5 from "../assets/img/template_5.png"

import "./Appreance.css"

import DashNav from "../components/Navbars/Navprof";

import phoneImg from "../assets/img/phone-call.png"
import AddressImg from "../assets/img/location.png"
import linkImg from "../assets/img/link.png"
import mailImg from "../assets/img/mail.png"

import twitterImg from "../assets/img/twitter (1).png"
import instaImg from "../assets/img/instagram.png"
import youtubeImg from "../assets/img/youtube.png"
import fbImg from "../assets/img/facebook.png"

import saveCardImg from "../assets/img/download.png"
import addContactImg from "../assets/img/bookmark.png"

import styled from "styled-components";

import default_img from "../assets/img/gamer.png"

const Phonecontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  & > .rounded-full {
    margin-bottom: 20px;
  }

  & > h1,
  & > h2 {
    margin-top: 20px;
  }
`;

const Infocontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    & img {
      margin-right: 10px;
      height: 1.3em;
    }
  }
`;

const Linkcontainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  & a {
    margin-right: 25px;
    /* border-radius: 50%; */
    overflow: hidden;
  }

  & a img {
    width: 30px; 
    height: 30px;
    object-fit: cover; 
  }

  & a:last-child {
    margin-right: 0;
  }
`;

const Cardbottoncontainer = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 20px;

  & > div#services {
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
    padding: 10px;
    background-color: #efefef;
    border-radius: 10px;
    

    & img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      margin-right: 10px;
    }
  }
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 15vh; 
  margin-top: auto; 
`;


const Appreance = () => {
  
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");
  
  const [UserID, setUserID] = useState("");
  const [uploadTheme, setuploadTheme] = useState("");
  const [theme_url, setTheme_url] = useState("");
  const [UN,setUN] = useState("");
  const [displayPhoto, setDisplayPhoto] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserID(user.uid);
    });
    getData();
    setThemes();
  });
  
  const getData = async () => {
    const docRef = doc(db, "UserInfo", UserID);

    const docData = await getDoc(docRef);


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

    setDisplayFullName(docData.data().Full_Name)
  };

  const setThemes = async () => {
    const docRef = doc(db, "UserInfo", UserID);

    const docData = await getDoc(docRef);

    setTheme_Selected(docData.data().Theme);
    setTheme_url(docData.data().Theme_url);
  };


  const changeTheme = async (customTheme) => {


    const imgRef = ref(imageDb, `Themes/${customTheme}.png`);

    const url = await getDownloadURL(imgRef);
    
    setuploadTheme(url)


    const docRef = doc(db, "UserInfo", UserID);


    const docData = await getDoc(docRef);

    const data = {
      Theme: customTheme,
      Theme_url: url
    };

    updateDoc(docRef, data)
      .then(() => {
        console.log("Document has been added successfully");
        setTheme_Selected(customTheme);
      })
      .catch((error) => {
        console.log(error);
      });


  };

//   const ThemeContainer= styled.div`
    


//   `
const [displayCname, setdisplayCname] = useState("");
  const [displaylink1, setdisplaylink1] = useState("");
  const [displayPhoneNo, setdisplayPhoneNo] = useState("");

  const [displayUserName, setDisplayUserName] = useState("");

  // const [displayPhoto, setDisplayPhoto] = useState("");
  const [displayAddress, setDisplayAddress] = useState("");

  const [displayFacebook_Link, setDisplayFacebook_Link] = useState("Please Enter Your Facebook Link");
  const [displayInsta_Link, setDisplayInsta_Link] = useState("Please Enter Your Instagram Link");
  const [displayX_Link, setdisplayX_Link] = useState("Please Enter Your Twitter Link");
  const [displayDesc, setDisplayDesc] = useState("Enter Your Desc");

  const [displayFullName, setDisplayFullName] = useState("Enter Your Desc");

  const[updateProfile, setUpdateProfile] = useState("")

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [forceUpdate, setForceUpdate] = useState(false);


  const deleteProfile = async() =>{
    const desertRef = ref(imageDb, `files/${UserID}`);
   
    deleteObject(desertRef).then(async() => {
   
       alert("Deleted!");
       setDisplayPhoto(null); 
      //  setForceUpdate(!forceUpdate); // Force a re-render
      setDisplayPhoto(`${desertRef}?${Date.now()}`); // Append a timestamp to the image URL
   
    }).catch((error) => {
       console.log("Profile is not deleting");
    });
   }


  const EditProfile = async(e) =>{
    const imgRef = ref(imageDb, `files/${UserID}`);
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
      const userRef = doc(collection(db, "UserInfo"), UserID);
      await updateDoc(userRef, { Profile_URl: downloadURL });

      console.log("Document updated with download URL:", downloadURL);
      // Alert the user about successful upload and update

      // setDisplayProfile(downloadURL)
      setDisplayPhoto(downloadURL);
      console.log("image is uploaded");
      setIsUploadModalOpen(false);
    }
    
  );
  
  }

  const uploadProfile = (e) =>{
    e.preventDefault();
    EditProfile();
    setIsUploadModalOpen(false); 
  }

  return (
    <>
    <DashNav/>
      {isUploadModalOpen && (
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black opacity-75">
            <div className="bg-white p-4 rounded-lg shadow-lg py-14 px-10">
              <div className="grid grid-rows-2 gap-10">
                <input type="file" placeholder="Upload Your Profile Pic" onChange={(e) => setUpdateProfile(e.target.files[0])} />
                
                <div className="grid grid-cols-2 gap-10">
                  <button onClick={uploadProfile} className="bg-black text-white p-5 rounded-lg font-semibold">Upload Profile Picture</button>
                  <button onClick={() => setIsUploadModalOpen(false)} className="border-4 border-black rounded-lg font-bold">Cancel</button>
                </div>

              </div>
      
            </div>
          </div>
      )}
      
    <div className="m-15 border-1 p-10">
      <div className="grid grid-cols-2 gap-80">
        <div className="grid grid-rows-2">
          <div className=" h-96 ">
            <p className="text-3xl font-semibold">Profile</p>
            <div className="grid grid-cols-2 bg-gray-400 h-60 rounded-lg p-10 m-5">
              <div className="rounded-full bg-slate-200 w-40">
                <img src={displayPhoto} key={displayPhoto} alt="not found" className="rounded-full w-40 h-40"/>
              </div>

              <div className="grid grid-rows-2 text-center">
                <div className=" bg-black text-white rounded-xl pt-3 w-64 h-14" id="Upload Profile" onClick={() => setIsUploadModalOpen(true)}>Upload Profile</div>
                <div className=" bg-white text-black rounded-xl pt-3 w-64 h-14" onClick={deleteProfile}>Remove Profile</div>

                {/* <input type="file"  placeholder='Update Profile Photo'  onChange={(e)=>{setUpdateProfile(e.target.files[0])}}/>
            <button onClick={EditProfile}>Update</button> */}
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 h-64">
            <h1 className="text-3xl font-semibold">Select Themes!</h1>
            <div className="grid grid-cols-2 text-center p-10 rounded-xl">
                          <div
                            onClick={() => {
                              changeTheme("template_1");
                            }}
                            className="w-1/2 text-center mb-10"
                          >
                            <img src={template1} alt="" id="template_img"/>
                            <h5>Template 1</h5>
                          </div>
                          <div
                            onClick={() => {
                              changeTheme("template_2");
                            }}
                            className="w-1/2 mb-10"
                          >
                            <img src={template2} alt="" id="template_img"/>
                            <h5>Template 2</h5>
                          </div>
                          <div
                            onClick={() => {
                              changeTheme("template_3");
                            }}
                            className="w-1/2 mb-10"
                          >
                            <img src={template3} alt="" id="template_img"/>
                            <h5>Template 3</h5>
                          </div>
                          <div
                            onClick={() => {
                              changeTheme("template_4");
                            }}
                            className="w-1/2 mb-10" 
                          >
                            <img src={template4} alt="" id="template_img"/>
                            <h5>Template 4</h5>
                          </div>
                          <div
                            onClick={() => {
                              changeTheme("template_5");
                            }}
                            className="w-1/2 mb-10"
                          >
                            <img src={template5} alt=""  id="template_img"/>
                            <h5>Template 5</h5>
                          </div>
                          {/* <div
                            onClick={() => {
                              changeTheme("template_6");
                            }}
                          >
                            theme6
                          </div> */}
            </div>
          </div>
        </div>
        
        {/* <div class="border-2 w-0 h-ful"></div> */}
        <div className="flex flex-col ml-52">
        <div className="border-8 border-black rounded-xl h-lvh sticky" id="phone_display" >
                <img src={theme_url} id="" className="absolute inset-0 w-full h-full object-cover"/>

                {/* data which will be display on the theme */}

                {/* <h1 className="absolute inset-0 text-white font-bold text-center">{displayCname}</h1>

                <h2 className="absolute  text-white font-bold text-center">{displayFullName}</h2> */}

                <div className="absolute inset-0  text-center items-center text-white font-bold">
                <Phonecontainer>

                    <div className="rounded-full bg-black  w-32 h-32 ">
                      <img src={displayPhoto} key={displayPhoto} className="rounded-full w-32 h-32" alt="not found" />
                    </div>

                    <h1>{displayCname}</h1>
                    <h2>{displayFullName}</h2>


                    <Infocontainer>                   
                        <div>
                        <img src={phoneImg}  alt="" />
                            {displayPhoneNo}
                        </div>

                        <div>
                        <img src={AddressImg}  alt="" />
                            {displayAddress}
                        </div>
                        
                        <div>
                        <img src={linkImg}  alt="" />
                            {displaylink1}
                        </div>           
                      
                        <div>
                        <img src={mailImg}  alt="" />
                            {displayDesc}
                        </div>       

                    </Infocontainer>


                    <Linkcontainer>


                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitterImg} alt="" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instaImg} alt="" />
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeImg} alt="" />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={fbImg} alt="" />
                      </a>

                    </Linkcontainer>


                    <Cardbottoncontainer>
                    <div id="services">
                    <img src={saveCardImg} alt="" />
                    <div>Save Card</div>
                    </div>

                    <div id="services">
                    <img src={addContactImg} alt="" />
                    <div>Add Contact</div>
                    </div>
                    </Cardbottoncontainer>

                    <BottomText>

                    tapON

                    </BottomText>
                    </Phonecontainer>
                </div>
            </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Appreance;
