import React from 'react'
import { useContext } from 'react'
import App, { AppCustomeContext } from '../App'

function Home() {
  const {name}=useContext(AppCustomeContext);
  return (
    <div>
      <h1>this is the home : {name} </h1>
    </div>
  )
}

export default Home
