import React from 'react'
import { useParams } from 'react-router-dom'

function Profilepage() {
    const param=useParams();
    console.log(param);
  return (
    <div>
      <h1 style={{color:"black"}}>Profile {param.profileId}</h1>
    </div>
  )
}

export default Profilepage
