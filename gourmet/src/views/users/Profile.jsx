import React from 'react'
import { auth } from '/src/firebase/config'
import { useState } from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';

function Profile() {
    const { addToast, setAppState, user,userData } = useContext(AppContext)
    
    //const {email,uid}=user
     const {email,firstName,lastName,username}=userData
    // console.log(username)
    


    return (<>
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title"> Hello {username}
                </h2>
                <p>Email :  {email}</p>
                <p>FirstName :  {firstName}</p>
                <p>LastName :  {lastName}</p>
                
                {/* <p>{email}</p> */}
                <div className="card-actions justify-end">
                    <Link to='/edit-profile' className="btn btn-primary">Edit</Link>
                </div>
            </div>
        </div>
        # Responsiv
    </>


    )
}

export default Profile

