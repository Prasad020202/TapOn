import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "../pages/auth/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { MdModeEdit } from "react-icons/md";

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
import img1 from '../assets/img/gamer.png'

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
import styled, {ThemeProvider} from "styled-components";


import { getThemeColors } from '../components/Textthemes';
import { Tilt } from "react-tilt";
import Edittext from "../components/Edittext";
import Button from '../components/Navbars/Button'
import CloseButton from '../components/Navbars/CloseButton'
import Copied from '../components/Copied'



const Section = styled.div`
display: flex;
margin-top: 20px;
/* background-color: #e4e48f; */
height:200vh;

width: 100%;

`
const LeftContainer = styled.div`
display: flex;
flex-direction: column;
/* margin-left: 16px ; */
width: 60%;
/* background-color: #4e9b81; */
height: 100%;
 & div#previewbutton{
  display: none;
  
     }

@media (max-width: 64em){
     width: 100%;
     height: 100%;
     & div#divmodwid{
      width: 90%;


     }
     & div#previewbutton{
      display: block;
      align-items: baseline;
      position: fixed;
      bottom: 1%;


     }
     
     
  


}

`

const LeftContent =styled.div`
/* background-color: antiquewhite; */
display: flex;
flex-direction: column;
& div#Previewcontainer{
      display: none;
     }
@media (max-width: 64em){
     width: 100%;
     height: 100%;
     margin-left: 0;
     align-items: center;
     & form{

      width: 90%;
     }
     & div#Previewcontainer{
      display: block;
      display: flex;
     }

     
  


}

  



`


const ServiceCardsContainer = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 2%;
/* background-color: aquamarine;  */
width:65%;
height: fit-content;
padding: 10px;
margin-bottom: 2%;
align-items: center;
justify-content: space-between;

@media (max-width: 64em){
     width: 100%;
     }
`


const ServiceCard = styled.div`
display: flex;
flex-direction: column;
margin-top: 1%;

/* background-color: #89e6c7ea; */
border-radius: 10px;

height: 20vh;
padding: 8px;
  

`
const ServicecardContent=styled.div`
display: flex;
flex-direction: row;
width: fit-content;
height: 15vh;

/* background-color: blue; */
  

`
const PServicecardContent=styled.div`
display: flex;
flex-direction: row;
width: fit-content;
height: 100%;

/* background-color: blue; */
  

`

const PServicecardContentsec=styled.div`
display: flex;
flex-direction: row;
width: fit-content;
height: 100%;

/* background-color: blue; */
  

`
const ButtonContainter=styled.div`
padding: 0.5%;
display: flex;
height: 5vh;
/* background-color: #3c2929; */

justify-content: flex-end;



`




const LinkCard = styled.div`
/* overflow: hidden; */
width: 95%;
margin-left: 3%;

@media (max-width: 64em){
  
  justify-content: center;
  & div#div1{
    display: none;
    
  }
 
 
     


}


`


  





  







const RightContainer = styled.div`
  
  display: flex;
  justify-content: center;
  width: 40%;

  /* background-color: blanchedalmond; */
 

  @media (max-width: 64em){
     display: none;
  


}

`

const MiddleMargin = styled.div`
@media (max-width: 64em){
     display: none;
  


}
  

  
`



const Phoneborder = styled.div`
  display: flex;
  border-width: 8px;
  border-style: solid;
  border-color: black;
  border-radius: 12px; 
  width: 290px;
  height: 550px;
  margin-top:3em;
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
  height: fit-content;
  align-items: center;
  color: ${props => props.theme.textTemp};
  & div#imagediv{
    width: 48px;
    height: 48px;
    background-color: black;
    border-radius: 100%;
      


    }



   @media (max-width: 64em){
    display: flex;
    padding: 2%;
    align-items: center;

    &div#imagediv{
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

   @media (max-width: 64em){
    display: flex;
  flex-direction: column;
  
  align-items: center;
  
  color: ${props => props.theme.textTemp};
    display: flex;
    padding: 4%;
    align-items: center;

    & div#imagediv2{
      width: 48px;
      height: 48px;
      


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



const Infocontainerpre = styled.div`
 

  
  @media (max-width: 64em){
     display: flex;
     
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  /* background-color: beige; */
  font-style: italic;
  font-weight: bold;
  overflow: hidden;
     & > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    font-size: 10px;

    & img {
      margin-right: 8px;
      height: 1em;
      
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
  
  
  
  
  

  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    
    font-size: small;

    & img {
      margin-right: 10px;
      height: 1.3em;
      
    }
  }
  @media (max-width: 64em){
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
const ServiceContent = styled.div`

  


`

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
@media (max-width: 64em){
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
    background-color: #efefef;
    border-radius: 10px;
    
    

    & img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      margin-right: 10px;
    }
  }
  @media (max-width: 64em){
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
    background-color: #8e4b4b;
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


  

`

const CardcontainerP=styled.div`
border: solid 2px black;
margin-bottom: 2%;
margin-top: 2%;
font-weight: 500;
font-style: italic;
align-items: center;
justify-content: center;
display: flex;
min-width: 20vh;
min-height: 8vh;
background-color: #adadad;
border-radius: 8px;
  


`

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

 @media (max-width: 64em){
  background-color: aliceblue;
  display: block;
  display: flex;
    /* align-items: center;
    justify-content: center;
    height: fit-content;
    margin-bottom: 10%; */
     
     
  


}
  



`


const PhoneborderPreview = styled.div`

  border-width: 8px;
  border-style: solid;
  border-color: black;
  border-radius: 8px; 
  
  
  
  
  overflow: hidden;
  overflow-y: scroll;



  @media (max-width: 64em){
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
box-shadow: 1px 1px black ;
background-color: beige;
display: flex;
width: 17%;
height: 100%;
border-radius: 100%;
border: solid 2px black;
align-self: center;
@media (max-width: 64em){
     width: 18%;
     height: 80%;
     }




`

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




`
const Descriptionleft = styled.div`
box-shadow: 1px 1px black ;
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
@media (max-width: 64em){
     width: 82%;
     height: 100%;
     font-size: 12px;
     overflow: hidden;
     overflow-y:scroll;

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





`
const Cardcontent=styled.div`

font-size: 16px;
font-weight: 500;


color: white;
font-style: italic;


  



`



const Servicecards =styled.div`
display: flex;
width: fit-content;
min-width: 15vh;
min-height: 7vh;
height: fit-content;
background-color: #000000;
box-shadow: 1px  1px  black;

border-radius: 20px;
padding: 2%;
align-items: center;
justify-content: center;
margin-top: 2%;
margin-bottom: 2%;
border: solid 3px #c3cbdc;






`
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





`



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

  const [UN,setUN] = useState("");

  const [theme_url, setTheme_url] = useState("");
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");




  
  const [textColor, setTextColor] = useState('');
 
  

  


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setDisplayUser(user.displayName);
      
      setUserID(user.uid);
      setUserEmail(user.email);
    });
    getData();
    setThemes();
  });

  const setThemes = async () => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    const themeName = docData.data().Theme;
    const themeColors = getThemeColors(themeName);

    setTheme_Selected(themeName);
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

    setDisplayFullName(docData.data().Full_Name)
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
        setInputDesc("");
      })
      .catch((error) => {
        console.log(error);
      });

    const imgRef = ref(imageDb, `files/${userID}`);
    const uploadTask = uploadBytesResumable(imgRef, uploadPhoto);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
      },
      (error) => {
        
        console.error(error);
        
      },
      async () => {
        const downloadURL = await getDownloadURL(imgRef);
        setImageURL(downloadURL);

        
        const userRef = doc(collection(db, "UserInfo"), userID);
        await updateDoc(userRef, { Profile_URl: downloadURL });

        console.log("Document updated with download URL:", downloadURL);
        
      }
    );
  };

  const GoToMiniSite = () => {
    navigate(`https///${UN}/${userID}`)
  }

  const copyToClipboard = () => {
    const textToCopy = `tapon/${UN}/${userID}`;

    // Using navigator.clipboard.writeText() for modern browsers

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };


  // const addServiceCard = (newServiceCard) => {
  //   setServiceCards([...serviceCards, newServiceCard]);
  // };

  

  return (
    <ThemeProvider theme={getThemeColors(Theme_Selected)}>


    <>
      <DashNav/>

      <Section> {/*section*/ }




        <LeftContainer>  

          
        <LinkCard className="bg-blue-200 h-fit rounded-lg flex items-center  p-2 mb-6 justify-between">

                <div id="div1"className=" ">
                    <p className=" font-medium">Your Mini-Website is Live : 
                        <span className="underline decoration-solid font-semibold" onClick={GoToMiniSite}>{`https//tapon/${UN}/${userID}`}
                        </span>
                    </p>

                    
                </div>
                <div id="div2"className="flex flex-row  w-fit  ">
                <p className=" mt-2  mr-2">Share Your Link </p>
                
                <Copied/>
                </div>
            </LinkCard>

        
            
           









            
{/*textbox*/ }
            <LeftContent className="  h-5/6   ml-8  "> 

            

            




            
            <h2 className=" font-bold text-xl">Details</h2>
              

              <form className=" w-3/4 mt-10 mb-12 h-fit ">

                   <div className="relative z-0 w-full mb-5 group">
                       <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputCname} onChange={(e) => {setInputCname(e.target.value)}}/>
                       <label for="floating_email" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name<Edittext className="ml-1 mt-0.5"/></label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputPhoneNo} onChange={(e) => {setInputPhoneNo(e.target.value)}} />
                       <label for="floating_password" className=" flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Phone Number <Edittext className="ml-1 mt-0.5"/></label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputAddress} onChange={(e)=>{setInputAddress(e.target.value)}} />
                       <label for="floating_repeat_password" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Address <Edittext className="ml-1 mt-0.5"/></label>
                   </div>
                   <div className="relative z-0 w-full mb-5 group">
                       <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputDesc} onChange={(e)=>{setInputDesc(e.target.value)}} />
                       <label for="floating_repeat_password" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Description <Edittext className="ml-1 mt-0.5"/></label>
                   </div>
                   <div className="grid md:grid-cols-2 md:gap-6">
                     <div className="relative z-0 w-full mb-5 group">
                         <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={Inputlink1} onChange={(e) => {setInputlink1(e.target.value)}} />
                         <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Link</label>
                     </div>
                     <div className="relative z-0 w-full mb-5 group">
                         <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputX} onChange={(e)=>{setInputX(e.target.value)}} />
                         <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Twitter Link</label>
                     </div>
                   </div>
                   <div className="grid md:grid-cols-2 md:gap-6">
                     <div className="relative z-0 w-full mb-5 group">
                         <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputInsta} onChange={(e)=>{setInputInsta(e.target.value)}} />
                          <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Instagram Link</label>
                     </div>
                     <div className="relative z-0 w-full mb-5 group">
                                          <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={InputFacebook} onChange={(e)=>{setInputFacebook(e.target.value)}} />
                         <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Facebook Link</label>
                     </div>
                 
                   </div>
                   {/* <Button text ="Submit" onClick={submitInNewWay} /> */}
                   <button type="submit" className="text-white bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5" onClick={submitInNewWay}>Submit</button>
              </form>

              <h3 className=" font-bold text-xl">Services</h3>
              <div className="mt-5" onClick={() => setShowModal(true)}>
              <Button text ="Add Service +" /></div>

              <ServiceCardsContainer>








              <Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>

<Servicecards onClick={() => setShowServiceModal(true)}>

  <Cardcontent>Salon</Cardcontent>
  

</Servicecards></Tilt>



<Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>

<Servicecards onClick={() => setShowServiceModal(true)}>

  <Cardcontent>Salon</Cardcontent>
  

</Servicecards></Tilt>



<Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>

<Servicecards onClick={() => setShowServiceModal(true)}>

  <Cardcontent>Salon</Cardcontent>
  

</Servicecards></Tilt>




<Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>

<Servicecards onClick={() => setShowServiceModal(true)}>

  <Cardcontent>Salon</Cardcontent>
  

</Servicecards></Tilt>  


              </ServiceCardsContainer>
             
              



              
              <div id="previewbutton"className="mt-5 z-50 "onClick={togglePreview} >

              <Button text ="* Preview" /></div>

              
    


















              {showModal ? (
        <>
          <div 
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div id="divmodwid" className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  ">
              {/*content*/}
              <div  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Service Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {setShowModal(false); 

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
                  <div className=" flex items-center w-20 h-15  bg-black mr-10 rounded-lg text-white font-light text-xs  justify-center cursor-pointer ">Add Image</div>


                  <div className="relative z-0 w-full mb-5 group">
                       <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                       <label for="floating_repeat_password" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Description <Edittext className="ml-1 mt-0.5"/></label>
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
                    onClick={() => setShowModal(false)}
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
          <div 
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div id="divmodwid" className="border-0 rounded-lg shadow-lg relative w-2/5 my-6 mx-auto  ">
              {/*content*/}
              <div  className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Service Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {setShowServiceModal(false); 

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
                       <input type="text" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                       <label for="floating_repeat_password" className="flex peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" >Name <Edittext className="ml-1 mt-0.5"/></label>
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
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowServiceModal(false)}
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
          
            <div id="Previewcontainer"
            className="justify-center  items-center flex overflow-x-hidden fixed inset-0  outline-none focus:outline-none  z-40 "
            style={{
              backdropFilter: 'blur(2px)',
              backgroundColor: 'rgba(232, 232, 232, 0.8)', // Replace with your desired color and opacity
            }}
            >
            
              




              <PhonecontainerPreview>



                
                  
                <PhoneborderPreview style={{ overflowY: 'scroll' }}>



                <PhoneContentcontainerpreview  style={{ background: `url(${theme_url}) center/cover no-repeat` }}>

                      <div id="imagediv2">
                        <img src={img1} alt="not found" />
                      </div>

                      <h1>{displayCname}</h1>
                      <h2>{displayFullName}</h2>

                      <Infocontainerpre>
                        <div>
                          <img src={phoneImg} alt="" />
                          {displayPhoneNo}
                        </div>

                        <div>
                          <img src={AddressImg} alt="" />
                          {displayAddress}
                        </div>

                        <div>
                          <img src={linkImg} alt="" />
                          {displaylink1}
                        </div>

                        <div>
                          <img src={mailImg} alt="" />
                          {displayDesc}
                        </div>
                      </Infocontainerpre>

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



        <Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>
          
        <Phoneborder>
       
  

  
    <PhoneContentcontainer  style={{ background: `url(${theme_url}) center/cover no-repeat` }}>

      <div className="rounded-full bg-black w-24 h-24">
        <img src={img1} alt="not found" />
      </div>

      <h1>{displayCname}</h1>
      <h2>{displayFullName}</h2>

      <Infocontainer>
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
      {displayDesc}
    </div>
  )}
</Infocontainer>


      <Linkcontainer>
      {displayInsta_Link && (
        <a href={displayInsta_Link} target="_blank" rel="noopener noreferrer">
          <img src={twitterImg} alt="" />
        </a>)}

        {displayX_Link && (
        <a href={displayX_Link} target="_blank" rel="noopener noreferrer">
          <img src={instaImg} alt="" />
        </a>)}
        {displayFacebook_Link && (
        <a href={displayFacebook_Link} target="_blank" rel="noopener noreferrer">
          <img src={fbImg} alt="" />
        </a>)}
      </Linkcontainer>
      


      <Servicescontainer>
        <CardcontainerP>salon</CardcontainerP>
        <CardcontainerP>salon</CardcontainerP>
        <CardcontainerP>salon</CardcontainerP>
        <CardcontainerP>salon</CardcontainerP>
        <CardcontainerP>salon</CardcontainerP>
        
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


      

      <BottomText>
        tapON
      </BottomText>

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

