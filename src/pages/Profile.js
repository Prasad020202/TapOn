import Nav from "../components/Navbars/Nav";
import Bigf from "../components/Footers/Bigf";

import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
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

import styled from "styled-components";

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

export default function Profile() {

  const pdfRef = useRef();

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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching data for userID:", id); // Log userID before fetching
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

    setDisplayFullName(docSnap.data().Full_Name)
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

  const downloadPDF = () =>{
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
    
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgWidth = canvas.width;
    
    const imgHeight = canvas.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    
    const imgY = 30;
    
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    pdf.save('MiniWebsite.pdf');
    
    });
  }


  return (
    <>
{isLoading && <p>Loading profile...</p>}
      {error && <p>Error: {error}</p>}
      {userData && (
    <div>

    
    
      <Nav transparent />
      {/* <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("../assets/img/team-2-800x800.jpg")}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <a href={userData.Link}
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </a>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    
                    
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userData.User_Name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    {userData.Address}
                  </div>

                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    {userData.PhoneNumber}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {userData.Desc}
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                      
                    </div>
                    
                  </div>

                  <div className="mt-9 flex gap-5   justify-center">
                    <a href={userData.Instagram_Link}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
</svg>

                    </a>

 <a href={userData.Facebook_Link}>
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg>
  </a>                

<a href="userData.X_Link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg></a>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main> */}

<div className="border-8 border-black rounded-xl h-lvh sticky m-auto  mt-32 mb-32" id="phone_display" ref={pdfRef} >
                <img src={theme_url} id="" className="absolute inset-0 w-full h-full object-cover"/>

                {/* data which will be display on the theme */}

                {/* <h1 className="absolute inset-0 text-white font-bold text-center">{displayCname}</h1>

                <h2 className="absolute  text-white font-bold text-center">{displayFullName}</h2> */}

                <div className="absolute inset-0  text-center items-center text-white font-bold">
                <Phonecontainer>

<div className="rounded-full bg-black w-24 h-24 ">
  <img src={img1} alt="not found" />
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
<div id="services" onClick={downloadPDF}>
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

      <Bigf />
      </div>
      )}
    </>
  );
}
