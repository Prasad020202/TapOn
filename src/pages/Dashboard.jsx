import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "../pages/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { MdModeEdit } from "react-icons/md";

import phoneImg from "../assets/img/phone-call.png";
import AddressImg from "../assets/img/location.png";
import linkImg from "../assets/img/link.png";
import mailImg from "../assets/img/mail.png";

import twitterImg from "../assets/img/twitter (1).png";
import instaImg from "../assets/img/instagram.png";
import youtubeImg from "../assets/img/youtube.png";
import fbImg from "../assets/img/facebook.png";

import saveCardImg from "../assets/img/download.png";
import addContactImg from "../assets/img/bookmark.png";
import img1 from "../assets/img/gamer.png";

import Pencill from "../assets/img/pencil.png";

import tempUser from "../assets/img/temp_user.png"

import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import DashNav from "../components/Navbars/Navprof";
import styled, { ThemeProvider } from "styled-components";

import { getThemeColors } from "../components/Textthemes";
import { Tilt } from "react-tilt";
import Edittext from "../components/Edittext";
import Button from "../components/Navbars/Button";
import CloseButton from "../components/Navbars/CloseButton";
import Copied from "../components/Copied";

const Section = styled.div`
  display: flex;
  margin-top: 20px;
  /* background-color: #e4e48f; */
  height: 200vh;

  width: 100%;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-left: 16px ; */
  width: 60%;
  /* background-color: #4e9b81; */
  height: 100%;
  & div#previewbutton {
    display: none;
  }

  @media (max-width: 64em) {
    width: 100%;
    height: 100%;
    & div#divmodwid {
      width: 90%;
    }
    & div#previewbutton {
      display: block;
      align-items: baseline;
      position: fixed;
      bottom: 1%;
    }
  }
`;

const LeftContent = styled.div`
  /* background-color: antiquewhite; */
  display: flex;
  flex-direction: column;
  & div#Previewcontainer {
    display: none;
  }
  @media (max-width: 64em) {
    width: 100%;
    height: 100%;
    margin-left: 0;
    align-items: center;
    & form {
      width: 90%;
    }
    & div#Previewcontainer {
      display: block;
      display: flex;
    }
  }
`;

const ServiceCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;
  /* background-color: aquamarine;  */
  width: 65%;
  height: fit-content;
  padding: 10px;
  margin-bottom: 2%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 64em) {
    width: 100%;
  }
`;

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1%;

  /* background-color: #89e6c7ea; */
  border-radius: 10px;

  height: 20vh;
  padding: 8px;
`;
const ServicecardContent = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 15vh;

  /* background-color: blue; */
`;
const PServicecardContent = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;

  /* background-color: blue; */
`;

const PServicecardContentsec = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;

  /* background-color: blue; */
`;
const ButtonContainter = styled.div`
  padding: 0.5%;
  display: flex;
  height: 5vh;
  /* background-color: #3c2929; */

  justify-content: flex-end;
`;

const LinkCard = styled.div`
  /* overflow: hidden; */
  width: 95%;
  margin-left: 3%;

  @media (max-width: 64em) {
    justify-content: center;
    & div#div1 {
      display: none;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 40%;

  /* background-color: blanchedalmond; */

  @media (max-width: 64em) {
    display: none;
  }
`;

const MiddleMargin = styled.div`
  @media (max-width: 64em) {
    display: none;
  }
`;

const Phoneborder = styled.div`
  display: flex;
  border-width: 8px;
  border-style: solid;
  border-color: black;
  border-radius: 12px;
  width: 290px;
  height: 550px;
  margin-top: 3em;
  box-shadow: 0 0 10px black;
  overflow: hidden;
  overflow-y: scroll;

  /* Customizing the scrollbar */
  &::-webkit-scrollbar {
    width: 0.5px; /* Adjust the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #484848; /* Color of the thumb */
    border-radius: 6px; /* Radius of the thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Color of the track */
  }
`;

const Phonecontainer = styled.div`
  margin-top: 20px;
  /* background-color: black; */
  height: fit-content;
  position: fixed;
`;


const PhoneContentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
  align-items: center;
  color: ${(props) => props.theme.textTemp};
  
  & div#imagediv {
    width: 30%;
    height: 80px;
    background-color: black;
    border-radius: 100%;
    margin-top:2%;
    /* object-fit: contain; */
    /* overflow: hidden; */
   
    
    
  }
  & h1{

    font-size: 22px;
    font-weight: 500;
  }
  & h2{

    font-size: 20px;
  }
  & h3{

    font-size: 15px;
  }
 

  

  @media (max-width: 64em) {
    display: flex;
    padding: 2%;
    align-items: center;

    &div#imagediv {
      width: 24px;
      height: 12px;
    }
  }

  & > .rounded-full {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  & > h1,
  & > h2 {
    margin-top: 10px;
  }
`;

const PhoneContentcontainerpreview = styled.div`
  @media (max-width: 64em) {
    display: flex;
    flex-direction: column;
    /* background-color: beige; */
    height: fit-content;

    align-items: center;

    color: ${(props) => props.theme.textTemp};
    display: flex;
    padding: 4%;
    align-items: center;
  

    & div#imagediv2 {
      width: 48px;
      height: 48px;
    }
  }

  & > .rounded-full {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  & > h1 {
    margin-top: 10px;
    font-size: 18px;
  }
  & > h2 {
    margin-top: 10px;
    font-size: 15px;
  }
  & > h3 {
    margin-top: 10px;
    font-size: 12px;
  }
`;

const Infocontainerpre = styled.div`
  @media (max-width: 64em) {
 




      display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  /* background-color: beige; */
  font-style: italic;
  font-weight: bold;
  padding: 2%;
  width: 80%;

  & > div {
    width: 90%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    /* background-color: aquamarine; */

    font-size: small;

    & img {
      margin-right: 10px;
      height: 1.3em;
    }
  }
  }
`;

const Infocontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  /* background-color: beige; */
  font-style: italic;
  font-weight: bold;
  padding: 2%;
  width: 80%;
  overflow: hidden;

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    /* flex-wrap: wrap; */
    /* word-wrap: break-word; */
    /* background-color: aquamarine; */



    


    font-size: small;

    & img {
      margin-right: 10px;
      height: 1.3em;
    }

    
  }
  &  div#adddiv {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    width: 98%;
    /* background-color: aqua; */
    overflow: hidden;
    overflow-wrap: break-word;
    
    
   }
  @media (max-width: 64em) {
    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      font-size: smaller;

      & img {
        margin-right: 8px;
        height: 1em;
      }
    }
  }
`;
const ServiceContent = styled.div``;

const Linkcontainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  & a {
    margin-right: 15px;
    /* border-radius: 50%; */
    overflow: hidden;
  }

  & a img {
    width: 25px;
    height: 25px;
    object-fit: cover;
  }

  & a:last-child {
    margin-right: 0;
  }
  @media (max-width: 64em) {
    & a {
      margin-right: 10px;
      /* border-radius: 50%; */
      overflow: hidden;
    }

    & a img {
      width: 20px;
      height: 20px;
      object-fit: cover;
    }

    & a:last-child {
      margin-right: 0;
    }
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
    width: 8em;
    height: 2em;
    background-color: ${props => props.theme.backgroundcards};
    border: solid 1px ;
    border-color: ${props=>props.theme.bordercolor};
    border-radius: 10px;

    & img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      margin-right: 10px;
      margin-left: 2px;
    }
  }
  @media (max-width: 64em) {
    /* background-color: #efefef; */
    width: 90%;
    padding: 2%;
    & > div#services {
      padding: 2%;
      display: flex;
      align-items: center;
      /* font-size: 10px; */
      /* margin-right: 5px;
    margin-left: 5px; */
      width: 8em;
      height: 3em;
      background-color: ${props => props.theme.backgroundcards};
    border: solid 1px ;
    border-color: ${props=>props.theme.bordercolor};
      border-radius: 10px;

      & img {
        width: 15px;
        height: 15px;
        object-fit: cover;
        margin-right: 10px;
      }
    }
  }
`;

const VisuallyHidden = styled.textarea`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
`;

const CopyButton = styled.button`
font-weight: 500;
  background-color: white;
  border: 0;
  outline: 0;
  cursor: pointer;
  opacity: 1;
  width: 80px;
  height: 40px;
  z-index: 9;
  border-radius: 16px;
`;

const ButtonTooltipContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 30px;
  /* background-color: yellow; */
`;

const CustomTooltip = styled.span`
  position: absolute;
  margin-top: 6px;
  top:80%;
  left: 50%;
  transform: translateX(40%);
  display: none;
  padding: 5px 12px;
  background-color: #000000df;
  border-radius: 4px;
  color: #fff;
  opacity: 75%;
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 8vh;
  margin-top: auto;
`;

const Servicescontainer = styled.div`
  /* justify-content: space-between; */
  justify-content: center;

  display: flex;
  flex-wrap: wrap;

  margin-top: 10px;
  margin-bottom: 2px;
  /* background-color: aquamarine; */
  width: 75%;
  height: fit-content;
  padding: 2%;
   @media (max-width: 64em) {
    width:50%;
    /* background-color: antiquewhite; */


   }


`;

const CardcontainerP = styled.div`
 border: solid 1px ;
 border-color: ${props=>props.theme.bordercolor};
  margin-bottom: 2%;
  margin-top: 2%;
  font-weight: 500;
  font-style: italic;
  font-size: larger;
  align-items: center;
  justify-content: center;
  display: flex;
  min-width: 20vh;
  min-height: 8vh;
  background-color: ${props => props.theme.backgroundcards};
  border-radius: 8px;
  @media (max-width: 64em) {
    min-width: 15vh;
    min-height: 6vh;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1%;
  margin-bottom: 5px;

  border-radius: 8px;
  /* background-color: #63a6df; */

  height: 8vh;

  /* Add any additional styles for your cards here */
`;

const PhonecontainerPreview = styled.div`
  display: none;

  @media (max-width: 64em) {
    background-color: aliceblue;
    display: block;
    display: flex;
    /* align-items: center;
    justify-content: center;
    height: fit-content;
    margin-bottom: 10%; */
  }
`;

const PhoneborderPreview = styled.div`
  border-width: 8px;
  border-style: solid;
  border-color: black;
  border-radius: 8px;

  overflow: hidden;
  overflow-y: scroll;

  @media (max-width: 64em) {
    background-color: aqua;

    display: flex;
    width: 250px;
    height: 450px;

    overflow: hidden;
    overflow-y: scroll;

    justify-content: center;
  }

  /* Customizing the scrollbar */
  &::-webkit-scrollbar {
    width: 0.5px; /* Adjust the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #484848; /* Color of the thumb */
    border-radius: 6px; /* Radius of the thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Color of the track */
  }
`;

const Uploadedpic = styled.div`
  box-shadow: 1px 1px black;
  background-color: beige;
  display: flex;
  width: 17%;
  height: 100%;
  border-radius: 100%;
  border: solid 2px black;
  align-self: center;
  @media (max-width: 64em) {
    width: 18%;
    height: 80%;
  }
`;

const PUploadedpic = styled.div`
  background-color: beige;
  display: flex;
  width: 17%;
  height: 90%;
  border-radius: 100%;
  border: solid 2px black;
  align-self: center;
  /* @media (max-width: 64em){
     width: 18%;
     height: 80%;
     } */
`;

const PhotoDiv=styled.div`
/* background-color: beige; */
width: 75%;
/* align-items: center; */
& div#imgdiv{

width: 55%;
height: 20vh;
}

& div#contimgdiv{


}
@media (max-width:64em) {
  /* background-color: beige; */
  width: 100%;
  align-items: center;

  & div#imgdiv{

    width: 60%;
    height: 10vh;
  }
  & div#contimgdiv{
    width: 95%;
    align-items: center;

  
}



  
}




`
const Buttondiv = styled.div`
align-items: center;
justify-content: center;
@media (max-width:64em) {
  /* background-color: #e6e601; */
  padding: 2%;
  overflow: hidden;
  height: fit-content;
  & div{

    width: 100%;
    margin: 2%;
  }



  
}

  

  
`
const Descriptionleft = styled.div`
  box-shadow: 1px 1px black;
  width: 83%;
  display: flex;
  border-radius: 20px;
  margin-left: 2%;
  border: solid 1px black;
  align-items: center;
  font-weight: 500;
  font-style: italic;

  height: 100%;
  padding: 2%;
  text-align: justify;
  overflow: hidden;
  font-size: 14px;
  background-color: #7f73ff5f;
  @media (max-width: 64em) {
    width: 82%;
    height: 100%;
    font-size: 12px;
    overflow: hidden;
    overflow-y: scroll;

    /* Customizing the scrollbar */
    &::-webkit-scrollbar {
      width: 2px;
      /* Adjust the width of the scrollbar */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #484848; /* Color of the thumb */
      border-radius: 5px;
      /* Radius of the thumb */
    }

    &::-webkit-scrollbar-track {
      background-color: transparent; /* Color of the track */
    }
  }
`;
const Cardcontent = styled.div`
  font-size: 16px;
  font-weight: 500;

  color: white;
  font-style: italic;
`;

const Servicecards = styled.div`
  display: flex;
  width: fit-content;
  min-width: 15vh;
  min-height: 7vh;
  height: fit-content;
  background-color: #000000;
  box-shadow: 1px 1px black;

  border-radius: 20px;
  padding: 2%;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  margin-bottom: 2%;
  border: solid 3px #c3cbdc;
`;
const PDescriptionleft = styled.div`
  width: 83%;
  display: flex;
  border-radius: 5px;
  margin-left: 2%;
  border: solid 1px black;
  align-items: center;
  font-weight: 500;
  font-style: italic;

  height: 100%;
  padding: 2%;
  text-align: justify;
  overflow: hidden;
  font-size: 7px;
  background-color: #7f73ff5f;
  /* @media (max-width: 64em){
     width: 82%;
     height: 100%;
     font-size: 12px;
     overflow: hidden;
     overflow-y:scroll;

     
   &::-webkit-scrollbar {
    width: 2px; 
    
  }

  &::-webkit-scrollbar-thumb {
    background-color: #484848; 
    border-radius: 5px;
   
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; 
  }
     } */
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const [displayUser, setDisplayUser] = useState("Please Login Bhai!");
  const [userID, setUserID] = useState("");

  const [displayCname, setdisplayCname] = useState("");
  const [displaylink1, setdisplaylink1] = useState("");
  const [displayPhoneNo, setdisplayPhoneNo] = useState("");

  const [displayUserName, setDisplayUserName] = useState("");
  // tempUser

  const [displayPhoto, setDisplayPhoto] = useState(tempUser);
  const [displayAddress, setDisplayAddress] = useState("");

  const [displayFacebook_Link, setDisplayFacebook_Link] = useState(
    "Please Enter Your Facebook Link"
  );
  const [displayInsta_Link, setDisplayInsta_Link] = useState(
    "Please Enter Your Instagram Link"
  );
  const [displayX_Link, setdisplayX_Link] = useState(
    "Please Enter Your Twitter Link"
  );
  const [displayDesc, setDisplayDesc] = useState("Enter Your Desc");

  const [displayFullName, setDisplayFullName] = useState("Enter Your Desc");

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

  const [showModal, setShowModal] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  // const [serviceCards, setServiceCards] = useState([]);
  const [showServiceModal, setShowServiceModal] = React.useState(false);
  const [showServiceModal2, setShowServiceModal2] = React.useState(false);
  const [showServiceModal3, setShowServiceModal3] = React.useState(false);
  const [showServiceModal4, setShowServiceModal4] = React.useState(false);

  const [UN, setUN] = useState("");

  const [theme_url, setTheme_url] = useState("");
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");

  const [textColor, setTextColor] = useState("");

  const[service1, setService1] = useState("");
  const[service2, setService2] = useState("");
  const[service3, setService3] = useState("");
  const[service4, setService4] = useState("");

  const[displayService1, setDisplayService1] = useState("Service1");
  const[displayService2, setDisplayService2] = useState("Service2");
  const[displayService3, setDisplayService3] = useState("Service3");
  const[displayService4, setDisplayService4] = useState("Service4");


  const[updateProfile, setUpdateProfile] = useState("")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User object:", user);
        setUserID(user.uid);
        // Call getData with the user ID directly
        setUserEmail(user.email);
        getData(user.uid);
        setThemes(user.uid);

        if(displayPhoto == "" || displayPhoto == null){
          setDisplayPhoto(tempUser)
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const setThemes = async (userID) => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    const themeName = docData.data().Theme;
    const themeColors = getThemeColors(themeName);

    setTheme_Selected(themeName);
    setTheme_url(docData.data().Theme_url);
    // setThemeColors(themeColors);
  };

  const getData = async (userId) => {
    if (!userId) {
      console.log("User ID is not set.");
      return;
    }

    const docRef = doc(db, "UserInfo", userId);
    const docData = await getDoc(docRef);

    setdisplayCname(docData.data().Company_Name);
    setdisplaylink1(docData.data().Link);
    setdisplayPhoneNo(docData.data().PhoneNumber);
    setDisplayUserName(docData.data().User_Name);

    if(docData.data().Profile_URl == "" || docData.data().Profile_URl == null){
      setDisplayPhoto(tempUser)
    }else{
      setDisplayPhoto(docData.data().Profile_URl);
    }
    
    setDisplayAddress(docData.data().Address);
    setDisplayFacebook_Link(docData.data().Facebook_Link);
    setDisplayInsta_Link(docData.data().Instagram_Link);
    setdisplayX_Link(docData.data().X_Link);
    setDisplayDesc(docData.data().Desc);

    setUN(docData.data().username);

    setDisplayFullName(docData.data().Full_Name);

    setDisplayService1(docData.data().Service1);
    setDisplayService2(docData.data().Service2);
    setDisplayService3(docData.data().Service3);
    setDisplayService4(docData.data().Service4);
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
        "Fill all the field or click on the edit button on the right side"
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
      Address: InputAddress,
      Desc: InputDesc,
      Email: userEmail
    };

    const userRef = doc(collection(db, "UserInfo"), userID);

    updateDoc(userRef, data)
      .then(() => {
        console.log("Document has been added successfully");


        // Update state variables with the new data
        setdisplayCname(data.Company_Name);
        setdisplayPhoneNo(data.PhoneNumber);
        setdisplaylink1(data.Link);
        setDisplayInsta_Link(data.Instagram_Link);
        setdisplayX_Link(data.X_Link);
        setDisplayFacebook_Link(data.Facebook_Link);
        setDisplayDesc(data.Desc);
        setDisplayAddress(data.Address);  

        setInputCname("");
        setInputPhoneNo("");
        setInputlink1("");
        setInputFacebook("");
        setInputInsta("");
        setInputX("");
        setInputAddress("");
        setInputDesc("");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const EditCname = async (e) => {
    e.preventDefault();

    const data = {
      Company_Name: InputCname,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setdisplayCname(data.Company_Name);
        setInputCname("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditAddress = async (e) => {
    e.preventDefault();

    const data = {
      Address: InputAddress,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayAddress(data.Address);
        setInputAddress("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditDesc = async (e) => {
    e.preventDefault();

    const data = {
      Desc: InputDesc,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayDesc(data.Desc);
        setInputDesc("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditPhoneNo = async (e) => {
    e.preventDefault();

    const data = {
      PhoneNumber: InputPhoneNo,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setdisplayPhoneNo(data.PhoneNumber);
        setInputPhoneNo("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditLink = async (e) => {
    e.preventDefault();

    const data = {
      Link: Inputlink1,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setdisplaylink1(data.Link);
        setInputlink1("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditFacebookLink = async (e) => {
    e.preventDefault();

    const data = {
      Facebook_Link: InputFacebook,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayFacebook_Link(data.Facebook_Link);
        setInputFacebook("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditInstaLink = async (e) => {
    e.preventDefault();

    const data = {
      Instagram_Link: InputInsta,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayInsta_Link(data.Instagram_Link);
        setInputInsta("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditXLink = async (e) => {
    e.preventDefault();

    const data = {
      X_Link: InputX,
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setdisplayX_Link(data.X_Link);
        setInputX("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GoToMiniSite = () => {
    navigate(`/${UN}/${userID}`);
  };

  // const copyToClipboard = () => {
  //   const textToCopy = `tapon/${UN}/${userID}`;

  //   // Using navigator.clipboard.writeText() for modern browsers

  //   navigator.clipboard.writeText(textToCopy)
  //     .then(() => {

  //     })
  //     .catch((err) => {
  //       console.error('Unable to copy text to clipboard', err);
  //     });
  // };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // const addServiceCard = (newServiceCard) => {
  //   setServiceCards([...serviceCards, newServiceCard]);
  // };


  const addServices = async(e) =>{
    e.preventDefault();

    const data = {
      Service1: service1,
      Service2: service2,
      Service3: service3,
      Service4: service4
    };

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService1(service1);
        setDisplayService2(service2);
        setDisplayService3(service3);
        setDisplayService4(service4);

        setShowModal(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const EditService1 = () =>{
    const data = {
      Service1: service1
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService1(service1);
        setShowServiceModal(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const EditService2 = () =>{
    const data = {
      Service2: service2
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService2(service2);
        setShowServiceModal2(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const EditService3 = () =>{
    const data = {
      Service3: service3
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService3(service3);
        setShowServiceModal3(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }
  const EditService4 = () =>{
    const data = {
      Service4: service4
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService4(service4);
        setShowServiceModal4(false)
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const copyToClipboard = () => {
    const urlBox = document.getElementById('box');
    urlBox.value = `https://tapon/${UN}/${userID}`;
    urlBox.focus();
    urlBox.select();
    document.execCommand('copy');

    setTooltipVisible(true);

    setTimeout(() => {
      setTooltipVisible(false);
    }, 500);
  };

  
  const deleteProfile = async() =>{
    const desertRef = ref(imageDb, `files/${userID}`);
   
    deleteObject(desertRef).then(async() => {
   
       alert("Deleted!");
       setDisplayPhoto(tempUser); 
      //  setForceUpdate(!forceUpdate); // Force a re-render
      // setDisplayPhoto(`${desertRef}?${Date.now()}`); // Append a timestamp to the image URL

      const data = {
        Profile_URl: deleteField()
      }
  
      const userRef = doc(collection(db, "UserInfo"), userID);
      updateDoc(userRef, data)
        .then((userRef) => {
        })
        .catch((error) => {
          console.log(error);
        });
   
    }).catch((error) => {
       console.log("Profile is not deleting");
    });


   }


  const EditProfile = async(e) =>{
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

  const DeleteService1 = () =>{
    const data = {
      Service1: deleteField()
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService1("");
        setService1("");
        setShowServiceModal(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const DeleteService2 = () =>{
    const data = {
      Service2: deleteField()
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService2("");
        setService2("");
        setShowServiceModal2(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const DeleteService3 = () =>{
    const data = {
      Service3: deleteField()
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService3("");
        setService3("");
        setShowServiceModal3(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const DeleteService4 = () =>{
    const data = {
      Service4: deleteField()
    }

    const userRef = doc(collection(db, "UserInfo"), userID);
    updateDoc(userRef, data)
      .then((userRef) => {
        console.log("Value of an Existing Document Field has been updated");
        setDisplayService4("");
        setService4("");
        setShowServiceModal4(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <ThemeProvider theme={getThemeColors(Theme_Selected)}>
      <>
        <DashNav />

        <Section>
          {" "}
          {/*section*/}
          <LeftContainer>
            <LinkCard className="bg-blue-200 h-fit rounded-lg flex items-center  p-2 mb-6 justify-between">
              <div id="div1" className=" ">
                <p className=" font-medium">
                  Your Mini-Website is Live :
                  <span
                    className="underline decoration-solid font-semibold cursor-pointer"
                    onClick={GoToMiniSite}
                  >
                    {`https//tapon/${UN}/${userID}`}
                  </span>
                </p>
              </div>
              <div id="div2" className="flex flex-row  w-fit  ">
                <p className=" mt-2  mr-2">Share Your Link </p>

                <ButtonTooltipContainer>
                  <CopyButton title="Copy Share Link" onClick={copyToClipboard}>
                    Copy
                  </CopyButton>
                  <CustomTooltip style={{ display: isTooltipVisible ? 'inline' : 'none' }}>Copied!</CustomTooltip>
                  <VisuallyHidden id="box" />
                </ButtonTooltipContainer>
              </div>
            </LinkCard>

            {/*textbox*/}
            <LeftContent className="  h-5/6   ml-8  ">

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



      <PhotoDiv>

<div className="grid grid-rows-1">
          <div className=" h-96 ">
            <p className="text-3xl font-semibold mb-2">Profile</p>
            <div id="contimgdiv" className="grid grid-cols-2 bg-gray-400 h-60 rounded-lg p-10  content-center">
              <div id="imgdiv" className="rounded-full bg-slate-200 w-40 ">
                <img src={displayPhoto} key={displayPhoto} alt="not found" className="rounded-full w-full h-full"/>
              </div>

              <Buttondiv className="grid grid-rows-2 text-center  ">
                <div className=" bg-black text-white rounded-xl pt-3 w-64 h-14 cursor-pointer " id="Upload Profile" onClick={() => setIsUploadModalOpen(true)}>Upload Profile</div>
                <div className=" bg-white text-black rounded-xl pt-3 w-64 h-14 cursor-pointer" onClick={deleteProfile}>Remove Profile</div>

              </Buttondiv>
            </div>
          </div>
        </div></PhotoDiv>


              <h2 className=" font-bold text-xl">Details</h2>
              <form className=" w-3/4 mt-10 mb-12 h-fit  ">
                <div className="relative z-0 w-full mb-5 group  flex">
                  <input
                    maxLength="14"
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={InputCname}
                    onChange={(e) => {
                      setInputCname(e.target.value);
                    }}
                  />
                  { InputCname && (
                  <span>
                    <button className=" align-middle bg-black text-white p-2 text-xs  rounded-full mt-1" onClick={EditCname}><img src={Pencill}/></button>
                  </span>)}
                  <label
                    for="floating_email"
                    className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Company Name - {displayCname}
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group  flex">
                  <input
                    type="text"
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={InputPhoneNo}
                    onChange={(e) => {
                      setInputPhoneNo(e.target.value);
                    }}
                  />
                  { InputPhoneNo && (
                  <span>
                    <button className=" align-middle bg-black text-white p-2   rounded-full mt-1" onClick={EditPhoneNo}><img src={Pencill}/></button>
                  </span>)}
                  <label
                    for="floating_password"
                    className=" flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone Number - {displayPhoneNo}
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group  flex">
                  <input
                  maxLength="60"
                    type="text"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={InputAddress}
                    onChange={(e) => {
                      setInputAddress(e.target.value);
                    }}
                  />
                  { InputAddress && (
                  <span>
                    <button className=" align-middle bg-black text-white p-2 text-xs  rounded-full mt-1" onClick={EditAddress}><img src={Pencill}/></button>
                  </span>)}
                  <label
                    for="floating_repeat_password"
                    className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address - {displayAddress}
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group  flex">
                  <input
                    maxLength="40"
                    type="text"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={InputDesc}
                    onChange={(e) => {
                      setInputDesc(e.target.value);
                    }}
                  />
                  { InputDesc && (
                  <span>
                    <button className=" align-middle bg-black text-white p-2 text-xs  rounded-full mt-1" onClick={EditDesc}><img src={Pencill}/></button>
                  </span>)}
                  <label
                    for="floating_repeat_password"
                    className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description - {displayDesc}
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group  flex">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={Inputlink1}
                      onChange={(e) => {
                        setInputlink1(e.target.value);
                      }}
                    />
                    { Inputlink1 && (
                    <span>
                      <button className=" align-middle bg-black text-white p-2 text-xs  rounded-full mt-1" onClick={EditLink}><img src={Pencill}/></button>
                    </span>)}
                    <label
                      for="floating_first_name"
                      className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Link - {displaylink1}
                   
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group flex  ">
                    <input
                      type="text"
                      name="floating_company"
                      id="floating_company"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={InputX}
                      onChange={(e) => {
                        setInputX(e.target.value);
                      }}
                    />
                    { InputX && (
                    <span>
                    
                      <button className=" align-middle bg-black text-white p-2 text-xs  mt-1 rounded-full" onClick={EditXLink}><img src={Pencill}/></button>
                    </span>)}
                    <label
                      for="floating_company"
                      className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Twitter Link - {displayX_Link}
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group  flex">
                    <input
                      type="text"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={InputInsta}
                      onChange={(e) => {
                        setInputInsta(e.target.value);
                      }}
                    />
                    { InputInsta && (
                    <span>
                      <button className=" align-middle bg-black  p-2 text-xs mt-1 rounded-full font-semibold" onClick={EditInstaLink}><img src={Pencill}/></button>
                    </span>)}
                    <label
                      for="floating_phone"
                      className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Instagram Link - {displayInsta_Link}
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group flex">
                    <input
                      type="text"
                      name="floating_company"
                      id="floating_company"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={InputFacebook}
                      onChange={(e) => {
                        setInputFacebook(e.target.value);
                      }}
                    />
                    { InputFacebook && (
                    <span>
                      <button className=" align-middle bg-black text-white p-2 text-xs mt-1 rounded-full" onClick={EditFacebookLink}><img src={Pencill}/></button>
                    </span>)}
                    <label
                      for="floating_company"
                      className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Facebook Link - {displayFacebook_Link}
                    </label>
                  </div>
                </div>
                {/* <Button text ="Submit" onClick={submitInNewWay} /> */}
                <button
                  type="submit"
                  className="text-white bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5"
                  onClick={submitInNewWay}
                >
                  Save Changes
                </button>
              </form>

              <h3 className=" font-bold text-xl">Services</h3>
              <div className="mt-5" onClick={() => setShowModal(true)}>
                <Button text="Add Service +" />
              </div>
              <ServiceCardsContainer>
                <Tilt
                  className="Tilt"
                  options={{
                    max: 40,
                    perspective: 1000,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: 1.05,
                  }}
                >
                  {displayService1 && (
                  <Servicecards onClick={() => setShowServiceModal(true)}>
                    <Cardcontent>{displayService1}</Cardcontent>
                  </Servicecards>)}
                </Tilt>

                <Tilt
                  className="Tilt"
                  options={{
                    max: 40,
                    perspective: 1000,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: 1.05,
                  }}
                >
                  {displayService2 && (
                  <Servicecards onClick={() => setShowServiceModal2(true)}>
                    <Cardcontent>{displayService2}</Cardcontent>
                  </Servicecards>)}
                </Tilt>

                <Tilt
                  className="Tilt"
                  options={{
                    max: 40,
                    perspective: 1000,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: 1.05,
                  }}
                >
                  {displayService3 && (
                  <Servicecards onClick={() => setShowServiceModal3(true)}>
                    <Cardcontent>{displayService3}</Cardcontent>
                  </Servicecards>)}
                </Tilt>

                <Tilt
                  className="Tilt"
                  options={{
                    max: 40,
                    perspective: 1000,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: 1.05,
                  }}
                >
                  {displayService4 && (
                  <Servicecards onClick={() => setShowServiceModal4(true)}>
                    <Cardcontent>{displayService4}</Cardcontent>
                  </Servicecards>)}
                </Tilt>
              </ServiceCardsContainer>
              <div
                id="previewbutton"
                className="mt-5 z-50 "
                onClick={togglePreview}
              >
                <Button text="* Preview" />
              </div>

            <div>
              <h3 className=" font-bold text-xl">Change Your Theme</h3>
              <div className="mt-5">
                <Link to={"/Appreance"}>
                <Button text="Select Theme" />
                </Link>
              </div>
            </div>

              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Add Service Details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowModal(false);

                              // const newServiceCardData = {
                              //   uploadedPicData:{text: 'text'} ,
                              //   descriptionLeftData: {text: 'This is the description text'} ,
                              // };

                              // addServiceCard(newServiceCardData);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-col h-full">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service1} onChange={(e)=>{setService1(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Service 1 - {displayService1}
                            </label>
                          </div>

                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "  value={service2} onChange={(e)=>{setService2(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
                            >
                              Service 2 - {displayService2}<Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>

                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service3} onChange={(e)=>{setService3(e.target.value)}}
                             
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" 
                            >
                              Service 3 - {displayService3} <Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>

                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service4} onChange={(e)=>{setService4(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Service 4 - {displayService4} <Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={addServices}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}
              {showServiceModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Service details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowServiceModal(false);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-row h-full">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service1} onChange={(e)=>{setService1(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name - {displayService1} <Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowServiceModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={DeleteService1}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={EditService1}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}










{showServiceModal2 ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Service details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowServiceModal2(false);

                              // const newServiceCardData = {
                              //   uploadedPicData:{text: 'text'} ,
                              //   descriptionLeftData: {text: 'This is the description text'} ,
                              // };

                              // addServiceCard(newServiceCardData);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-row h-full">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service2} onChange={(e)=>{setService2(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name - {displayService2} <Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowServiceModal2(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={DeleteService2}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={EditService2}
                          >
                            {/* () => setShowServiceModal2(false) */}
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}




{showServiceModal3 ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Service details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowServiceModal3(false);

                              // const newServiceCardData = {
                              //   uploadedPicData:{text: 'text'} ,
                              //   descriptionLeftData: {text: 'This is the description text'} ,
                              // };

                              // addServiceCard(newServiceCardData);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-row h-full">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service3} onChange={(e)=>{setService3(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name -{displayService3}<Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowServiceModal3(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={DeleteService3}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={EditService3}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}



              {showServiceModal4 ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div
                      id="divmodwid"
                      className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  "
                    >
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            Edit Service details
                          </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => {
                              setShowServiceModal4(false);

                              // const newServiceCardData = {
                              //   uploadedPicData:{text: 'text'} ,
                              //   descriptionLeftData: {text: 'This is the description text'} ,
                              // };

                              // addServiceCard(newServiceCardData);
                            }}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              x
                            </span>
                          </button>
                        </div>

                        {/*body*/}
                        <div className="relative p-6 flex flex-row h-full">
                          <div className="relative z-0 w-full mb-5 group">
                            <input
                              type="text"
                              name="repeat_password"
                              id="floating_repeat_password"
                              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" " value={service4} onChange={(e)=>{setService4(e.target.value)}}
                            />
                            <label
                              for="floating_repeat_password"
                              className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                              Name - {displayService4} <Edittext className="ml-1 mt-0.5" />
                            </label>
                          </div>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowServiceModal4(false)}
                          >
                            Close
                          </button>
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={DeleteService4}
                          >
                            Delete
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={EditService4}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}




              {showPreview ? (
                <>
                  <div
                    id="Previewcontainer"
                    className="justify-center  items-center flex overflow-x-hidden fixed inset-0  outline-none focus:outline-none  z-40 "
                    style={{
                      backdropFilter: "blur(2px)",
                      backgroundColor: "rgba(232, 232, 232, 0.8)", // Replace with your desired color and opacity
                    }}
                  >
                    <PhonecontainerPreview>
                      <PhoneborderPreview style={{ overflowY: "scroll" }}>
                        <PhoneContentcontainerpreview
                          style={{
                            background: `url(${theme_url}) center/cover no-repeat`,
                          }}
                        >
                          <div id="imagediv2">
                            <img src={displayPhoto} alt="not found" />
                          </div>

                          <h1>{displayCname}</h1>
                          <h2>{displayFullName}</h2>
                          <h3>{displayDesc}</h3>
                          <Infocontainerpre>
                          {displayPhoneNo && (
                        <div>
                          <img src={phoneImg} alt="" />
                          {displayPhoneNo}
                        </div>
                      )}

                      {displayAddress && (
                        <div>
                          <img src={AddressImg} alt="" />
                          {displayAddress}
                        </div>
                      )}

                      {displaylink1 && (
                        <div>
                          <img src={linkImg} alt="" />
                          {displaylink1}
                        </div>
                      )}

                      {displayDesc && (
                        <div>
                          <img src={mailImg} alt="" />
                          {userEmail}
                        </div>
                      )}
                          </Infocontainerpre>

                          <Linkcontainer>
                          {displayInsta_Link && (
                        <a
                          href={displayInsta_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={twitterImg} alt="" />
                        </a>
                      )}

                      {displayX_Link && (
                        <a
                          href={displayX_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={instaImg} alt="" />
                        </a>
                      )}
                      {displayFacebook_Link && (
                        <a
                          href={displayFacebook_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={fbImg} alt="" />
                        </a>
                      )}
                          </Linkcontainer>



                          <Servicescontainer>
                    {displayService1 && (
                      <CardcontainerP>{displayService1}</CardcontainerP>)}
                      {displayService2 && (
                      <CardcontainerP>{displayService2}</CardcontainerP>)}
                      {displayService3 && (
                      <CardcontainerP>{displayService3}</CardcontainerP>)}
                      {displayService4 && (
                      <CardcontainerP>{displayService4}</CardcontainerP>)}
                      
                    </Servicescontainer>

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

                          <BottomText>tapON</BottomText>
                        </PhoneContentcontainerpreview>
                      </PhoneborderPreview>
                    </PhonecontainerPreview>
                  </div>

                  {/* <div className="opacity-25 fixed inset-0 z-50 bg-black"></div> */}
                </>
              ) : null}
            </LeftContent>
          </LeftContainer>
          <MiddleMargin className="border-2 w-0 h-100vh "></MiddleMargin>
          <RightContainer>
          <Phonecontainer>
              <Tilt
                className="Tilt"
                options={{
                  max: 40,
                  perspective: 1000,
                  easing: "cubic-bezier(.03,.98,.52,.99)",
                  scale: 1.05,
                }}
              >
                <Phoneborder>
                  <PhoneContentcontainer
                    style={{
                      background: `url(${theme_url}) center/cover no-repeat`,
                    }}
                  >
                    {displayPhoto && (
                    <div id="imagediv"  style={{
                      background: `url(${displayPhoto}) center/cover no-repeat`,
                    }}>
                      
                    </div>)}

                    {displayCname && (

                    <h1>{displayCname}</h1>)}
                    {displayFullName && (
                    <h2>{displayFullName}</h2>)}
                    

                  {displayDesc && (
                     <h3>{displayDesc}</h3>
                    
                    )}
                    
                    

                    <Infocontainer>
                    

                      {displayPhoneNo && (
                        <div>
                          <img src={phoneImg} alt="" />
                          {displayPhoneNo}
                        </div>
                      )}

                      {displayAddress && (
                        <div id="adddiv">
                          <img src={AddressImg} alt="" />
                          
                          {displayAddress}
                        </div>
                      )}

                      {displaylink1 && (
                        <div>
                          <img src={linkImg} alt="" />
                          {displaylink1}
                        </div>
                      )}

                      {displayDesc && (
                        <div>
                          <img src={mailImg} alt="" />
                          {userEmail}
                        </div>
                      )}
                    </Infocontainer>

                    <Linkcontainer>
                      {displayInsta_Link && (
                        <a
                          href={displayInsta_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={twitterImg} alt="" />
                        </a>
                      )}

                      {displayX_Link && (
                        <a
                          href={displayX_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={instaImg} alt="" />
                        </a>
                      )}
                      {displayFacebook_Link && (
                        <a
                          href={displayFacebook_Link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={fbImg} alt="" />
                        </a>
                      )}
                    </Linkcontainer>

                    <Servicescontainer>
                    {displayService1 && (
                      <CardcontainerP>{displayService1}</CardcontainerP>)}
                      {displayService2 && (
                      <CardcontainerP>{displayService2}</CardcontainerP>)}
                      {displayService3 && (
                      <CardcontainerP>{displayService3}</CardcontainerP>)}
                      {displayService4 && (
                      <CardcontainerP>{displayService4}</CardcontainerP>)}
                      
                    </Servicescontainer>

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

                    <BottomText>tapON</BottomText>
                  </PhoneContentcontainer>
                </Phoneborder>
              </Tilt>
            </Phonecontainer>
          </RightContainer>
        </Section>
      </>
    </ThemeProvider>
  );
};

export default Dashboard;
