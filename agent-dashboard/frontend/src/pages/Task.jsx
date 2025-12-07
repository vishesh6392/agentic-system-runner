import React, { useContext, useEffect } from 'react'
import Header from '../component/Header'
import { AppContext } from '../ContextApi/AppContext'
import { HElement } from '../assets/asset'
import Card2 from '../component/Card2'

function Task() {
    const {setHeaderData}=useContext(AppContext)

     useEffect(()=>{
          setHeaderData({
              title:HElement.taskHeader,
              subtitle:HElement.tasktitle,
          })
     },[])
  return (

    <div>

      <Header/>
      <Card2/>

    </div>
  )
}

export default Task
