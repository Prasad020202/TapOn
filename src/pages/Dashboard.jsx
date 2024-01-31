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
  display: flex;
  flex-direction: column;
  height: fit-content;
  align-items: center;
  color: ${props => props.theme.textTemp};
  

  


  

  & > .rounded-full {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  & > h1,
  & > h2 {
    margin-top: 10px;
    
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
`;

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
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 8vh; 
  margin-top: auto; 
`;


const Servicescontainer = styled.div`
font-size: small;
margin-top: 20px;
margin-bottom: 2px;
  




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

  const [showModal, setShowModal] = useState(false);
  const [UN,setUN] = useState("");

  const [theme_url, setTheme_url] = useState("");
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");




  // const [textColor1, setTextColor1] = useState("");
  // const [textColor2, setTextColor2] = useState("");
  // const [textColor3, setTextColor3] = useState("");
  // const [textColor4, setTextColor4] = useState("");
  // const [textColor5, setTextColor5] = useState("");

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
    // setThemeColors(themeColors);
  };



  // const setThemeColors = (colors) => {
  //   setTextColor1(colors.textTemp1);
  //   setTextColor2(colors.textTemp2);
  //   setTextColor3(colors.textTemp3);
  //   setTextColor4(colors.textTemp4);
  //   setTextColor5(colors.textTemp5);
    
  // };



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
    navigate(`/${UN}/${userID}`)
  }

  const copyToClipboard = () => {
    const textToCopy = `tapon/${UN}/${userID}`;

    // Using navigator.clipboard.writeText() for modern browsers

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text successfully copied to clipboard');
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard', err);
      });
  };

  return (
    <ThemeProvider theme={getThemeColors(Theme_Selected)}>


    <>
      <DashNav/>

      <div className="flex w-full h-auto"> {/*section*/ }
        <div className="flex flex-col w-2/3  ml-4 ">  {/*leftcontainer*/ }

        
            <div className=" bg-blue-200 h-12 rounded-lg flex items-center p-3  w-fit mt-2  ml-8"> {/*linkcontainer*/ }
              <p >Your Live Mini-Website: <span className="underline decoration-solid font-semibold mr-14" onClick={GoToMiniSite}>{`tapon/${UN}/${userID}`}</span></p>
              <div className="flex items-center ml-15  "> {/*inside right*/ }
                <p >Share Your Link to Anyone</p> 
                <button className=" bg-white rounded-xl h-8 font-semibold w-24 ml-2 " onClick={copyToClipboard}>Copy Link</button>
              </div>
            </div>
           









            

            <div className="flex h-fit mt-12  ml-8"> {/*textbox*/ }
              

              <form className=" w-3/4    mt-12 mb-12">

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
                   <button type="submit" className="text-white bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={submitInNewWay}>Submit</button>
              </form>



            </div>



        </div>
        <div className="border-2 w-0 h-screen  ml-4"></div> {/*middlemargin*/ }






        <div className="   flex w-2/6 justify-center"> {/*rightcontainer*/ }



        <Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>
          
        <Phoneborder>
       
  

  
    <Phonecontainer  style={{ background: `url(${theme_url}) center/cover no-repeat` }}>

      <div className="rounded-full bg-black w-24 h-24">
        <img src={img1} alt="not found" />
      </div>

      <h1>{displayCname}</h1>
      <h2>{displayFullName}</h2>

      <Infocontainer>
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


      <Servicescontainer>
        services
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At aut animi molestiae. Veniam, molestiae maxime enim magnam a fugiat omnis repellat modi rerum sit dolore totam id sunt blanditiis accusantium.
      </Servicescontainer>

      <BottomText>
        tapON
      </BottomText>

    </Phonecontainer>
    

</Phoneborder>
</Tilt>

        </div>





      </div>
      
    </>
    </ThemeProvider>

    

    
  );
};

export default Dashboard;

