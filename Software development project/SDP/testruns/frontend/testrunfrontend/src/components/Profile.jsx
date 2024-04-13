import React from 'react'
import ProfileName from './ProfileName'
import { useContext } from "react";
import App, { AppCustomeContext } from "../App";

function Profile() {
  const { name } = useContext(AppCustomeContext);
  return (
    <div>
      <h1>this is the profile : {name}</h1>
      <ProfileName/>
    </div>
  )
}

export default Profile
