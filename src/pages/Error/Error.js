import React from 'react';
import styled from 'styled-components';
import Lefterror from './Lefterror';
import errorImage from '../../assets/img/error1.svg';

const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background-color: white;
`;

const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;



  @media (max-width: 70em){
  width: 85%;

}

@media (max-width: 64em){
  width: 100%;
  flex-direction: column;

  &>*:last-child{
    width: 80%;
  }
}
@media (max-width: 40em){


  &>*:last-child{
    width: 90%;
  }
}

`;

const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{

    margin-top: 20%;


  }

  @media (max-width: 40em){
  min-height:50vh;

}
`;

const Home = () => {
  return (
    <Section>
      <Container>
        <Box>
          <Lefterror />
        </Box>
        <Box>
          <img src={errorImage} alt="Error" />
        </Box>
      </Container>
    </Section>
  );
};

export default Home;
