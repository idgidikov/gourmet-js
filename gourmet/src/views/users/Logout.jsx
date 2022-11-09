import React from 'react'
import {logoutUser} from '../../services/auth.services'
function Logout() {

    const logOut =()=>{
        logoutUser()
    }
  return (
  
    <div onClick={logOut}>Logout</div>
  )
}

export default Logout