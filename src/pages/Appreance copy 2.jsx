import React, { useEffect, useState } from "react";
import { auth, db, imageDb } from "./auth/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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
width: 55%;
/* background-color: #4e9b81; */
/* height: 100%; */
align-items: center;
& h2{
  align-self: flex-start;
}

@media (max-width: 64em){
     width: 100%;
     height: 100%;
     
  


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
  width: 33.3%;

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
  
  width: 40%;
  text-align: center;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 4%;
  justify-content: space-between;

   @media (max-width: 64em){
   width: 60%;
  display: flex;
  margin-bottom: 6%;
  
  
  
     

}
  
  
  `
  const ThemeContainer = styled.div`
   @media (max-width: 64em){
   width: 80%;
  
  
}

 





  `

























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
        setTheme_Selected(customTheme);
      })
      .catch((error) => {
        console.log(error);
      });


  };










  



  return (
    // <ThemeProvider>

    <>
    <DashNav/>


    {/* section */}
     

    <Section> 

    <LeftContainer>



    <h2 className=" font-bold text-3xl flex float-start mt-3 mb-5">Select Themes!</h2>

    <ThemeContainer className="flex flex-wrap justify-center shadow-xl p-10 bg-gray-300 rounded-xl w-7/12 ">
 
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
