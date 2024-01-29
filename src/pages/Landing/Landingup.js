

import React from 'react'
import Navigation from '../../components/Navbars/Navigation'
import Home from './Home'
import About from './About'
import Roadmap from './Roadmap'
import Showcase from './Showcase'
import Team from './Team'
import Faq from './Faq'
import Footer from './Footer'
import Bigf from '../../components/Footers/Bigf'
import Navprof from '../../components/Navbars/Navprof'
import Error from '../Error/Error'



function Landingup() {
  return (
    <>
    


    {/* <Navprof/> */}

   <Navigation/>
    <Home/>


    <About/>
    <Roadmap/>


    <Showcase/>
    <Team/>
    <Faq/>
    <Bigf/> 


    {/* <Error/> */}

    
   
    </>
  )
}

export default Landingup