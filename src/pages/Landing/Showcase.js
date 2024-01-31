import React , { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import img1 from '../../assets/img/gamer.png'

const Section = styled.section`
min-height: 100vh;
width: 100%;
background-color: rgb(30 41 59 );
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
position: relative;
overflow: hidden;

&>*:first-child{
    animation-duration: 15s;
    @media (max-width: 30em){
    animation-duration: 10s;



    }
}

&>*:last-child{
    animation-duration: 10s;
    @media (max-width: 30em){
    animation-duration: 5s;



    }
}

`

const move = keyframes`

0%{transform:translateX(100%)};
100%{transform:translateX(-100%)}

`

const Row = styled.div`

/* background-color: lightblue; */
white-space: nowrap;
box-sizing: content-box;
margin: 2rem 0;
display: flex;
animation: ${move}  linear infinite ${props=>props.direction};







`

const ImgContainer = styled.div`
width: 15rem;
margin: 0 1rem;
background-color: white;
height: 20rem;

border-radius: 20px;
cursor: pointer;

@media (max-width: 48em){
    width: 12rem;

    }
    @media (max-width: 30em){
    width: 10rem;

    }





img{
    width: 40%;
    height: auto;
    border-radius: 40;
    padding:0.8rem;
    margin-left: 30%;
    border-bottom: 1px solid black;
    
}







`
const Textcontainer = styled.div`

    /* padding: 0.8rem; */
    max-width: 100%;
    /* background-color: yellow; */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-left: 0.6em;
    margin-right: 0.6em;
    display: flex;
    
    
    p{
        font-size: 0.9em;
        white-space: normal;
        align-self: flex-start;
        margin: 1rem auto;
        font-weight: 400;
        align-items: center;
        justify-content: center;

        @media (max-width: 30em){
        font-size: 0.75em;

    }


    }
 


` 
    
  



const Item = ({img,content,price, passRef})=>{

    let play=(e)=>{
        passRef.current.style.animationPlayState='running';
    }
    let pause=(e)=>{
        passRef.current.style.animationPlayState='paused';
    }

    return(

        <ImgContainer onMouseOver={e=>pause(e)} onMouseOut={e=>play(e)}>
        <img src={img} alt="itemimg"/>
        <Textcontainer>
        <p>{content}</p>
        </Textcontainer>

        
        


        
        
        </ImgContainer>
    )
}



const Showcase = () => {

    const Row1Ref= useRef(null);
    const Row2Ref= useRef(null);
  return (
    <Section>
        <Row direction ="none" ref={Row1Ref}>

            <Item img={img1} content="Content for Card 1" passRef={Row1Ref}/>
            <Item img={img1} content="Content for Card 2" passRef={Row1Ref}/>
            <Item img={img1} content="Content for Card 3" passRef={Row1Ref}/>



        </Row>
        <Row direction ="reverse" ref={Row2Ref}>

            <Item img={img1} content="Content for Card 4" passRef={Row2Ref}/>
            <Item img={img1} content="Content for Card 5" passRef={Row2Ref}/>
            <Item img={img1} content="Content for Card 6" passRef={Row2Ref}/>



        </Row>

        



    </Section>
  )
}

export default Showcase