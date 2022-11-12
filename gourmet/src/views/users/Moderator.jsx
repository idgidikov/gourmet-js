import React from 'react'
import { useState, useEffect } from 'react'
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { allUsers } from '../../services/admin.services'
import ModeratorAllUsers from '../../components/users/ModeratorAllUsers'


function Moderator() {
    const { addToast, setAppState, user, userData } = useContext(AppContext)
    const [users, setUsers] = useState([])


    useEffect(() => {
        allUsers()
            .then((u) => {
                setUsers(u)
            })
            .catch((error) => { addToast('error', error.message)})
    }, [userData?.username])

    console.log(users)
    return (<>
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className='w-72' src={userData ? userData.profile : 'https://campussafetyconference.com/wp-content/uploads/2020/08/iStock-476085198.jpg'} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title"> Hello {userData?.username}
                </h2>
                <p ><span className="badge badge-accent">Email:</span>  {userData?.email}</p>
                <p><span className="badge badge-accent">First name:</span>  {userData?.firstName}</p>
                <p><span className="badge badge-accent">Last name:</span>  {userData?.lastName}</p>
                
                <div className="card-actions justify-end">
                    <Link to='/edit-profile' className="btn btn-primary">Edit Info</Link>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        
                        <th>All users</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <ModeratorAllUsers key={user.uid} user={user} />)}
                </tbody>
                <tfoot>
                <tr>
                   
                    <th></th>
                </tr>
                </tfoot>
                
            </table>
            </div>
    </>


    )
}

export default Moderator