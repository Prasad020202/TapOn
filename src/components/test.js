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