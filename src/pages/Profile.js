import Nav from "../components/Navbars/Nav";
import Bigf from "../components/Footers/Bigf";

import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useParams } from 'react-router-dom';
import { auth, db } from './auth/firebase';

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

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import img1 from '../assets/img/gamer.png'

import { getThemeColors } from "../components/Textthemes";
import { Tilt } from "react-tilt";

import styled, { ThemeProvider } from "styled-components";



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
  width: 100%;
  
  /* width: 290px; */
  min-height: 45em;
  margin-top: 3em;
  box-shadow: 0 0 10px black;
  /* background-color: aqua; */
  
  @media (max-width: 64em) {
    margin-top: 0;




    border-width: 0;
  border-style: none;
  border-color: none;
  border-radius: 0px;
    
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;

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

const Phonecontainer = styled.div`
  /* margin-top: 20px; */
  /* background-color: black; */
  height: fit-content;
  /* position: fixed; */
  /* width: fit-content; */
  width: 20%;
  min-height: 45em;
   @media (max-width: 64em){
    width: 100%;
    height: 100%;
    

  
}
  
`;


const PhoneContentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 45em;
  height: fit-content;
  align-items: center;
  color: ${(props) => props.theme.textTemp};
  & div#imagediv {
    width: 25%;
    height: 95px;
    background-color: black;
    border-radius: 100%;
    margin-top:2%;
    /* object-fit: contain; */
    /* overflow: hidden; */
   
    
    
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

  & > h1,
  & > h2 {
    margin-top: 10px;
  }
`;

const Infocontainerpre = styled.div`
  @media (max-width: 64em) {
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

const Maincontainer=styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100vh;
align-items: center;
padding: 1%;
background-color: beige;
 @media (max-width: 64em){
  padding: 0%;
    

  
}
 





`


const Navdiv = styled.div`
@media (max-width: 64em) {

  display: none;

  
}



`
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

const Profileimg1 = styled.div`
  display: flex;
  width: 25%;
  height: 5vh;
  background-color: aliceblue;
  border-radius: 100%;
  margin-right: 5%;
`;

const Profileimg2 = styled.div`
  display: flex;
  width: 25%;
  height: 5vh;
  background-color: aliceblue;
  border-radius: 100%;
  margin-left: 5%;
`;

export default function Profile() {

  // const pdfRef = useRef();
  const exportRef = useRef();

  const { id } = useParams();
  // const [userID, setUserID] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [theme_url, setTheme_url] = useState("");

  const [UN,setUN] = useState("");


  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     console.log("Auth State Changed:", user); // Log user details
  //     setUserID(user.uid);
  //     console.log("userID:", userID); // Log userID value
  //   });
  // }, []);

  const[displayService1, setDisplayService1] = useState("Service1");
  const[displayService2, setDisplayService2] = useState("Service2");
  const[displayService3, setDisplayService3] = useState("Service3");
  const[displayService4, setDisplayService4] = useState("Service4");

  const[displayServicePhoto1, setDisplayServicePhoto1] = useState("");
  const[displayServicePhoto2, setDisplayServicePhoto2] = useState("");
  const[displayServicePhoto3, setDisplayServicePhoto3] = useState("");
  const[displayServicePhoto4, setDisplayServicePhoto4] = useState("");

  const [Theme_Selected, setTheme_Selected] = useState("Theme1");

  const [userEmail, setUserEmail] = useState("");

  const[userID,setUserID] = useState("");

  const phoneContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching data for userID:", id); // Log userID before fetching
        setUserID(id);
        const docRef = doc(db, "UserInfo", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setTheme_url(docSnap.data().Theme_url)

          setdisplayCname(docSnap.data().Company_Name);
    setdisplaylink1(docSnap.data().Link);
    setdisplayPhoneNo(docSnap.data().PhoneNumber);
    setDisplayUserName(docSnap.data().User_Name);
    setDisplayPhoto(docSnap.data().Profile_URl);
    setDisplayAddress(docSnap.data().Address);
    setDisplayFacebook_Link(docSnap.data().Facebook_Link);
    setDisplayInsta_Link(docSnap.data().Instagram_Link);
    setdisplayX_Link(docSnap.data().X_Link);
    setDisplayDesc(docSnap.data().Desc);

    setUN(docSnap.data().username)

    setDisplayService1(docSnap.data().Service1);
    setDisplayService2(docSnap.data().Service2);
    setDisplayService3(docSnap.data().Service3);
    setDisplayService4(docSnap.data().Service4);

    setDisplayFullName(docSnap.data().Full_Name)
    setUserEmail(docSnap.data().Email);

    setDisplayServicePhoto1(docSnap.data().Service1_img);
    setDisplayServicePhoto2(docSnap.data().Service2_img);
    setDisplayServicePhoto3(docSnap.data().Service3_img);
    setDisplayServicePhoto4(docSnap.data().Service4_img);


    setThemes(id);

        } else {
          setError("Profile not found");
        }
      } catch (error) {
        console.error("Error:", error); // Log detailed error message
        setError("Error loading profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // const downloadPDF = () => {
  //   const input = pdfRef.current;

  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4', true);
  //       const imgProps= pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, 'PNG',  0,  0, pdfWidth, pdfHeight);
  //       pdf.save('profile-card.pdf');
  //     });
  // };


  const setThemes = async (userID) => {
    const docRef = doc(db, "UserInfo", userID);

    const docData = await getDoc(docRef);

    const themeName = docData.data().Theme;
    const themeColors = getThemeColors(themeName);

    setTheme_Selected(themeName);
    setTheme_url(docData.data().Theme_url);
    // setThemeColors(themeColors);
  };

  function makeVCard(phone) {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nTEL;TYPE=CELL:${phone}\nEND:VCARD`;
    return vcard;
  }

  function downloadToFile(content, filename, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
  
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  }

  const savePhoneNumberAsVCard = () => {
    const phone = displayPhoneNo; // Assuming displayPhoneNo holds the phone number
    const vcardContent = makeVCard(phone);
    downloadToFile(vcardContent, 'contact.vcf', 'text/vcard');
  };

  // const saveCardAsPDF = () => {
  //   html2canvas(phoneContainerRef.current)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF({ orientation: 'portrait', unit: 'in', format: 'letter' });
  //       const imgProps = pdf.getImageProperties(imgData);
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //       pdf.addImage(imgData, 'PNG',  0,  0, pdfWidth, pdfHeight);
  //       pdf.save('profile-card.pdf');
  //     })
  //     .catch((error) => {
  //       console.error('Error generating PDF:', error);
  //     });
  // };

  const captureAndDownload = () => {
    if (exportRef.current) {
      toPng(exportRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'captured.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error capturing image:', error);
        });
    }
  };

  const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
  }


  return (
    <>
    
    <ThemeProvider theme={getThemeColors(Theme_Selected)}>
{isLoading && <p>Loading profile...</p>}
      {error && <p>Error: {error}</p>}
      {userData && (
    <div>

    
    <Navdiv>
      <Nav transparent /></Navdiv>

<Maincontainer>
  

      <Phonecontainer ref={exportRef} id='printablediv'>
              
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
                    <h3>{displayDesc}</h3>

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
                      <CardcontainerP>{displayService1} 
                      {displayServicePhoto1 && (
                                <Profileimg1>
                                <img src={displayServicePhoto1} alt="not found" />
                                </Profileimg1>
                              )}
                      </CardcontainerP>)}
                      {displayService2 && (
                      <CardcontainerP>{displayService2}
                      {displayServicePhoto2 && (
                                <Profileimg2>
                                <img src={displayServicePhoto2} alt="not found" />
                                </Profileimg2>
                              )}
                      </CardcontainerP>)}
                      {displayService3 && (
                      <CardcontainerP>{displayService3}
                      {displayServicePhoto3 && (
                                <Profileimg1>
                                <img src={displayServicePhoto3} alt="not found" />
                                </Profileimg1>
                              )}</CardcontainerP>)}
                      {displayService4 && (
                      <CardcontainerP>{displayService4}
                      {displayServicePhoto4 && (
                                <Profileimg2>
                                <img src={displayServicePhoto4} alt="not found" />
                                </Profileimg2>
                              )}</CardcontainerP>)}
                      
                    </Servicescontainer>

                    <Cardbottoncontainer>
                      <div id="services"  onClick={Print}>
                        <img src={saveCardImg} alt=""/>
                        <div>Save Card</div>
                      </div>

                      <div id="services" onClick={savePhoneNumberAsVCard}>
                        <img src={addContactImg} alt="" />
                        <div>Add Contact</div>
                      </div>
                    </Cardbottoncontainer>

                    <BottomText>tapON</BottomText>
                  </PhoneContentcontainer>
                </Phoneborder>
              
            </Phonecontainer>
            </Maincontainer>
            












 
      </div>
      )}</ThemeProvider>
    </>
  );
}
