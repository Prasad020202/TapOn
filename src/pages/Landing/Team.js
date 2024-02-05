import React from 'react'
import styled from 'styled-components'
import img1 from '../../assets/img/bighead.svg'

const Section =styled.section`


min-height: 100vh;
width: 100%;
background-color: white;
position: relative;


`

const Title = styled.h1`

font-size: 3em;
text-transform: capitalize;
color: black;
display: flex;
justify-content: center;
align-items: center;
margin: 1rem auto;
border-bottom: 2px black;
width: fit-content;

`

const Container = styled.div`

width : 75%;
height: 75%;
margin: 2rem auto;
display: flex;
justify-content: space-around;
align-items: center;
flex-wrap: wrap;


`
const Item = styled.div`
width: calc(20rem - 4vw);
padding: 1rem 0;
color: white;
margin: 2rem 1rem;
position: relative;
border: 2px solid black ; 
border-radius: 20px;

&:hover{
    img{
        transform: translateY(-2rem) scale(1.2);
    }
}

`

const ImgContainer = styled.div`
width: 15rem;
margin: 0 auto;
background-color: rgb(238, 237, 222) ;
height: 20rem;
border: 2px solid black ;
border-radius: 20px;
cursor: pointer;
img{
    width: 100%;
    height: auto;
    transition: all 0.3s ease;
}
`

const Name=styled.h2`

font-size: 1.25em;
display: flex;
align-items: center ;
justify-content: center;
text-transform: uppercase;
color: black;
margin-top: 1rem;

`
const Position =styled.h2`

font-size: 1em;
display: flex;
align-items: center ;
justify-content: center;
text-transform: capitalize;
color: rgba(32,32,32,0.9);
font-weight: 400;

`


const MemberComponent = ({img,name="",position=""})=>{
    return(
        <Item>

            <ImgContainer>
                <img src={img} alt={name}/>
            </ImgContainer>
            <Name>{name}</Name>
            <Position>{position}</Position>
        </Item>
    )
}

const Team = () => {
  return (
    <Section>
        <Title>Team</Title>
            <Container>
                
                <MemberComponent img={img1} name="Prasad" position="Frontend develper"/>
                <MemberComponent img={img1} name="Parth" position="backend developer"/>
                <MemberComponent img={img1} name="xyz" position="xyz"/>
                <MemberComponent img={img1} name="xyz" position="xyz"/>
                <MemberComponent img={img1} name="xyz" position="xyz"/>
                <MemberComponent img={img1} name="xyz" position="xyz"/>

            </Container>


        
    </Section>
  )
}

export default Team