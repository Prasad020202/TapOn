

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
import Smain from '../Setting/Smain'



function Landingup() {
  return (
    <>
    
    



   <Navigation/>

    <div id="Home"><Home/></div>
    <div id="About" ><About/></div>
    <div id="Roadmap"><Roadmap/></div>
    <div id="Showcase"><Showcase/></div>
    <div id="Team"><Team/></div>
    <div id="Faq"><Faq/></div>
    <Faq/>
    <Bigf/> 


    {/* <Error/> */}

    
   
    </>
  )
}

export default Landingup