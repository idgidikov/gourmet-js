import React from 'react'
import { auth } from '/src/firebase/config'
import { useState, useEffect } from 'react'
import { useUpdatePassword } from 'react-firebase-hooks/auth';
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import UserValid from '../../common/enums/user-validation'
import { getUserPosts } from '../../services/users.services'
import UserPostRows from '../../components/users/UserPostRows'
import { defaultPicture } from '../../common/constants';

function Profile() {
    const { addToast, setAppState, ...appState } = useContext(AppContext)
    const user = appState?.user
    const userData = appState?.userData
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getUserPosts(userData?.username)
            .then((post) => {
                setPosts(post)
            })
            .catch((error) => {console.log(error), addToast('error', error.message)})
    }, [userData?.username])




    return (<>
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className='w-72' src={userData?.picture ? userData.profile : defaultPicture} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title"> Hello {userData?.username}
                </h2>
                <p ><span className="badge badge-accent">Email:</span>  {userData?.email}</p>
                <p><span className="badge badge-accent">First name:</span>  {userData?.firstName}</p>
                <p><span className="badge badge-accent">Last name:</span>  {userData?.lastName}</p>
                
                {/* <p>{email}</p> */}
                <div className="card-actions justify-end">
                    <Link to='/edit-profile' className="btn btn-primary">Edit Info</Link>
                </div>
            </div>
        </div>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        
                        <th>My Posts</th>
                        <th >
                        {
                            userData.isActive === true ? <Link to="/create-blog-posts/"><p className="btn btn-primary" disabled={!userData?.isActive}>Create Post</p> </Link>
                            : <p className="btn btn-primary" disabled={!userData?.isActive}>Create Post</p>
                        }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map(post => <UserPostRows key={post?.id} post={post} />)}
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

export default Profile

