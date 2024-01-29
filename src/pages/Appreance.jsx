import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "./auth/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// import img1 from "../assets/img/Theme1.jpg"
// import img2 from "../assets/img/Theme2.jpg"

import template1 from "../assets/img/template_1.png"
import template2 from "../assets/img/template_2.png"
import template3 from "../assets/img/template_3.png"
import template4 from "../assets/img/template_4.png"
import template5 from "../assets/img/template_5.png"

import "./Appreance.css"

import DashNav from "../components/Navbars/Navprof";

const Appreance = () => {
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");
  const [UserID, setUserID] = useState("");
  const [uploadTheme, setuploadTheme] = useState("");
  const [theme_url, setTheme_url] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserID(user.uid);
    });
    setThemes();
  });
  

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
        console.log(document); 
        setTheme_Selected(customTheme);
      })
      .catch((error) => {
        console.log(error);
      });


  };

//   const ThemeContainer= styled.div`
    


//   `


  return (
    <>
    <DashNav/>
    <div className="m-15 border-1 p-10  ">
    <h1 className="text-3xl font-semibold mb-10">Select Themes!</h1>
      <div className="grid grid-cols-3 gap-4 ">
        <div className="grid grid-cols-2 text-center shadow-xl p-10 bg-gray-100 rounded-xl ">
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
        <div class="border-2 w-0 h-ful"></div>
        <div className="flex flex-col">
          <div className="border-8 border-black  rounded-xl h-lvh fixed" id="phone_display">
            <img src={theme_url} id="phone_display_img"/>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Appreance;
