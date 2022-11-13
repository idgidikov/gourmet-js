import React from 'react'
import { useState, useEffect } from 'react'
import { userRole } from '../common/enums/user-role.enum'
import { AppContext } from '../context/app.context'
import { useContext } from 'react'
import Profile from '../views/users/Profile'
import Moderator from '../views/users/Moderator'


function UserRoleRender() {
    const { addToast, user, userData } = useContext(AppContext)
    
    return (
        <div className="user">
            {userData?.role === userRole.BASIC ? <Profile /> : <Moderator />}
        </div>
    )
}

export default UserRoleRender