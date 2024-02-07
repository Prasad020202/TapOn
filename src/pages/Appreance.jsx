import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "./auth/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import img1 from "../assets/img/gamer.png"
import img2 from "../assets/img/Theme2.jpg"

import template1 from "../assets/img/template_1.png"
import template2 from "../assets/img/template_2.png"
import template3 from "../assets/img/template_3.png"
import template4 from "../assets/img/template_4.png"
import template5 from "../assets/img/template_5.png"

import "./Appreance.css"

import DashNav from "../components/Navbars/Navprof";
import styled, {ThemeProvider} from "styled-components";
import { Tilt } from "react-tilt";
import Button from '../components/Navbars/Button'




const Section = styled.div`
display: flex;
margin-top: 20px;
/* background-color: #e4e48f; */
height:200vh;

width: 100%;
@media (max-width: 64em){
     width: 100%;
     height: 100%;
     
  


}
`
const LeftContainer = styled.div`
display: flex;
flex-direction: column;
/* margin-left: 16px ; */
width: 55%;
/* background-color: #4e9b81; */
/* height: 100%; */
align-items: center;
& h2{
  align-self: flex-start;
  font-weight: bold;
  display: flex;
  float: inline-start;
  margin-top: 2%;
  margin-bottom: 2%;
  font-size: 25px;
  font-style: italic;
  margin-left: 10%;

}
& div#Previewcontainer{
      display: none;
     }
     & div#previewbutton{
   display: none;
  
     }

@media (max-width: 64em){
     width: 100%;
     height: 100%;
     padding: 1%;


     & div#Previewcontainer{
      display: block;
     }
     & div#previewbutton{
      display: block;
      align-items: baseline;
      position: fixed;
      bottom: 1%;


     }
     
     
  


}


`


const ServiceCardsContainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 2%;
/* background-color: aquamarine; */
width:75%;
height: 40%;
padding: 10px;
margin-bottom: 2%;
`


const ServiceCard = styled.div`
margin-top: 1%;
background-color: #80bea9;
border-radius: 10px;

height: 30%;
`
const LinkCard = styled.div`
overflow: hidden;
@media (max-width: 64em){
     


}


`


const RightContainer = styled.div`
  
  display: flex;
  justify-content: center;
  width: 45%;

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



const PhoneborderPreview = styled.div`
  display: flex;
  border-width: 8px;
  border-style: solid;
  border-color: black;
  border-radius: 12px; 
  width: 290px;
  height: 550px;
  margin-top:3em;
  
  overflow: hidden;
  overflow-y: scroll;



  @media (max-width: 64em){
     width: 250px;
     height: 450px;
     margin-bottom: 50%;
     margin-left: 15%;
     
     
  


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
margin-top: 20px;
/* background-color: black; */
height: fit-content;
position: fixed;
 
`;




const PhoneContentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  align-items: center;
  color: ${props => props.theme.textTemp};
  width: 100%;
  

  


  

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
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: aliceblue;
  `

  const ThemeCard = styled.div`
  display: flex;
  
  width: 35%;
  text-align: center;
  margin-left: 4%;
  margin-right: 4%;
  margin-bottom: 4%;
  justify-content: space-between;
  
   @media (max-width: 64em){
   width: 60%;
  display: flex;
  margin-bottom: 6%;
  
  
  
     

}
  
  
  `
  const ThemeContainer = styled.div`
  width: 80%;
   @media (max-width: 64em){
   width: 80%;
  
  
}

 





  `

const PhonecontainerPreview = styled.div`
@media (max-width: 64em){
   /* background-color: aqua; */
   height: fit-content;
   
  
  
}
  



`

























const Appreance = () => {
  const [Theme_Selected, setTheme_Selected] = useState("Theme1");
  const [UserID, setUserID] = useState("");
  const [uploadTheme, setuploadTheme] = useState("");
  const [theme_url, setTheme_url] = useState("");
  const [showPreview, setShowPreview] = React.useState(false);

  const [displayPhoto, setDisplayPhoto] = useState("");



  const[updateProfile, setUpdateProfile] = useState("")

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [forceUpdate, setForceUpdate] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
       if (user) {
         console.log('User object:', user);
         setUserID(user.uid);
         // Call getData with the user ID directly
         getData(user.uid);
         setThemes(user.uid);
       } else {
         console.log('No user is signed in.');
       }
    });
   
    // Clean up subscription on unmount
    return () => unsubscribe();
   }, []);

   const getData = async (userId) => {
    if (!userId) {
       console.log('User ID is not set.');
       return;
    }
   
    const docRef = doc(db, "UserInfo", userId);
    const docData = await getDoc(docRef);
    setDisplayPhoto(docData.data().Profile_URl);
   };
  

   const setThemes = async (UserID) => {
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
        setTheme_url(url);
      })
      .catch((error) => {
        console.log(error);
      });


  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };



  const deleteProfile = async() =>{
    const desertRef = ref(imageDb, `files/${UserID}`);
   
    deleteObject(desertRef).then(async() => {
   
       alert("Deleted!");
       console.log(displayPhoto);
       setDisplayPhoto(null); 
       console.log(displayPhoto);
      //  setForceUpdate(!forceUpdate); // Force a re-render
      // setDisplayPhoto(`${desertRef}?${Date.now()}`); // Append a timestamp to the image URL
   
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
    // <ThemeProvider>

    <>
    <DashNav/>



    {/* section */}
     

    <Section> 

    <LeftContainer>




    <h2 >Select Themes!</h2>

    <ThemeContainer className="flex flex-wrap justify-center shadow-xl p-10 bg-gray-300 rounded-xl  ">
 
          <ThemeCard>
          <div
            onClick={() => {
              changeTheme("template_1");
            }}
            
          >
            <img src={template1} alt="" id="template_img"/>
            <h5>Template 1</h5>
          </div>
          </ThemeCard>


          <ThemeCard>
          <div
            onClick={() => {
              changeTheme("template_2");
            }}
            
          >
            <img src={template2} alt="" id="template_img"/>
            <h5>Template 2</h5>
          </div>
          </ThemeCard>


          <ThemeCard>
          <div
            onClick={() => {
              changeTheme("template_3");
            }}
            
          >
            <img src={template3} alt="" id="template_img"/>
            <h5>Template 3</h5>
          </div>
          </ThemeCard>


          <ThemeCard>
          <div
            onClick={() => {
              changeTheme("template_4");
            }}
            
          >
            <img src={template4} alt="" id="template_img"/>
            <h5>Template 4</h5>
          </div>

          </ThemeCard>

          <ThemeCard>
          <div
            onClick={() => {
              changeTheme("template_5");
            }}
            
          >
            <img src={template5} alt=""  id="template_img"/>
            <h5>Template 5</h5>
          </div>
          </ThemeCard>


          </ThemeContainer>
          <div id="previewbutton"className="mt-5 z-50 "  onClick={togglePreview} >

            

              <Button text ="* Preview" /></div>

              {showPreview ? (
        <>
          <div id="Previewcontainer"
            className="justify-center items-center flex overflow-x-hidden fixed inset-0  outline-none focus:outline-none  "
          >
            
              




              <PhonecontainerPreview>



                
                  
                <PhoneborderPreview>

                <PhoneContentcontainer  style={{ background: `url(${theme_url}) center/cover no-repeat` }}>

                </PhoneContentcontainer>


                </PhoneborderPreview>
                
                </PhonecontainerPreview>

              
            
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}






        
       


        



        </LeftContainer>





        <MiddleMargin className="border-2 w-0 h-100vh "></MiddleMargin> 


       



         







        
        








       











        <RightContainer> 


        <Phonecontainer>



        <Tilt className="Tilt"  options={{ max: 40, perspective: 1000, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1.05}}>
          
        <Phoneborder>
       
  

  
    <PhoneContentcontainer  style={{ background: `url(${theme_url}) center/cover no-repeat` }}>

      {/* <div className="rounded-full bg-black w-24 h-24">
        <img src={img1} alt="not found" />
      </div> */}

      {/* <h1>{displayCname}</h1> */}
      {/* <h2>{displayFullName}</h2> */}

      {/* <Infocontainer>
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
      </Infocontainer> */}

      {/* <Linkcontainer>
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
      </Linkcontainer> */}


      {/* <Servicescontainer>
        <Card>

        </Card>
        <Card>
          
        </Card>
      </Servicescontainer> */}



      {/* <Cardbottoncontainer>
        <div id="services">
          <img src={saveCardImg} alt="" />
          <div>Save Card</div>
        </div>

        <div id="services">
          <img src={addContactImg} alt="" />
          <div>Add Contact</div>
        </div>
      </Cardbottoncontainer> */}


      

      {/* <BottomText>
        tapON
      </BottomText> */}

    </PhoneContentcontainer>
    

</Phoneborder>
</Tilt>
</Phonecontainer>



</RightContainer>











      

      
      </Section>
      
      
    </>
    // </ThemeProvider>
  );
};

export default Appreance;
