import React from 'react'
import img1 from '../../assets/img/gamer.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay, EffectCards } from 'swiper/modules';
import styled from 'styled-components';



const Container = styled.div`
width: 25vw;
height: 70vh;


@media (max-width: 70em){
    height: 60vh;

}

@media (max-width: 64em){
    height:50vh;
    width:30vw;


}

@media (max-width: 48em){
    height:50vh;
    width:40vw;


}
@media (max-width: 30em){
    height:45vh;
    width:60vw;


}

.swiper{

    width: 100%;
    height: 100%;

}
.swiper-slide{
    background-color: rgb(238, 237, 222);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-button-next{
    color: black;
    width: 4rem;
    right: 1;
    /* top: 60%; */

    @media (max-width: 64em){
        width: 3rem;

    }
    @media (max-width: 30em){
        width: 2rem;

    }
}

.swiper-button-prev{
    color: black;
    width: 4rem;
    left: 1;
    /* top: 60%; */

    @media (max-width: 64em){
        width: 3rem;

    }
    @media (max-width: 30em){
        width: 2rem;

    }
}



`
const Carousal = () => {
  return (
    <Container>
        <Swiper
        autoplay={{
            delay:2000,
            disableOnInteraction:false,
        }}
        pagination={{
            type:'fraction',
        }}
        scrollbar={{
            draggable:true
        }}
        effect={'cards'}
        grabCursor={true}
        modules={[Pagination, Navigation, Autoplay, EffectCards ]}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        {/* <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide>
        <SwiperSlide> <img src={img1} alt ="nft imsges "/> </SwiperSlide> */}
      </Swiper>
    
      </Container>
  )
}

export default Carousal