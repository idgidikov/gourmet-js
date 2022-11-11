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
    

    console.log(userData.profile)

    return (<>
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className='w-72' src={userData?.profile} alt="Movie" /></figure>
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
        <h2 className="my-post mb-8">My Posts</h2>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>
                    <label>
                        <input type="checkbox" className="checkbox" />
                    </label>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
                </thead>
                
            </table>
        </div>
    </>


    )
}

export default Profile

