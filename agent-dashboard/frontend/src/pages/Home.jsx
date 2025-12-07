import React, { useContext, useEffect } from 'react'
import Card from '../component/Card'
import Footer from '../component/Footer'
import { AppContext } from '../ContextApi/AppContext'
import { HElement } from '../assets/asset'
import Header from '../component/Header'
function Home() {
    const {setHeaderData}=useContext(AppContext);
    
    useEffect(()=>{
        setHeaderData({
            title:HElement.hero,
            subtitle:HElement.herotitle
        })
    },[])
  return (

    <div>
     <Header/>
     <Card/>
     <Footer/>
    </div>
  )
}

export default Home
