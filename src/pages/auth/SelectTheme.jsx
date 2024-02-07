import React, { useEffect, useState } from "react";

import template1 from "../../assets/img/template_1.png";
import template2 from "../../assets/img/template_2.png";
import template3 from "../../assets/img/template_3.png";
import template4 from "../../assets/img/template_4.png";
// import template5 from "../../assets/img/template_5.png"

import "./SelectTheme.css";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, imageDb } from "./firebase";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";







export const SelectTheme = () => {
  const navigate = useNavigate();

  const [UserID, setUserID] = useState("");
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");
  const [uploadTheme, setuploadTheme] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserID(user.uid);
    });
  });

  const changeTheme = async (customTheme) => {
    const imgRef = ref(imageDb, `Themes/${customTheme}.png`);

    const url = await getDownloadURL(imgRef);

    setuploadTheme(url);

    const docRef = doc(db, "UserInfo", UserID);

    const docData = await getDoc(docRef);

    const data = {
      Theme: customTheme,
      Theme_url: url,
    };

    updateDoc(docRef, data)
      .then(() => {
        console.log("Document has been added successfully");
        setTheme_Selected(customTheme);
        navigate("/auth/plans");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      

      <div className="conatinerBox  " >
        <h1>Pick a template</h1>
        <h3>
          Apply a template to your MiniSite to get started. Your can change it
          anytime.
        </h3>
        <div className="container2">
          <div className="themesBox1">
            <img
              src={template1}
              alt="not found"
              className="template"
              onClick={() => {
                changeTheme("template_1");
              }}
            />
            <img
              src={template2}
              alt="not found"
              className="template2"
              onClick={() => {
                changeTheme("template_2");
              }}
            />
            <img
              src={template3}
              alt="not found"
              className="template3"
              onClick={() => {
                changeTheme("template_3");
              }}
            />
            <img
              src={template4}
              alt="not found"
              className="template4"
              onClick={() => {
                changeTheme("template_4");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
