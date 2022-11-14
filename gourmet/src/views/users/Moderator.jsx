import React from 'react'
import { useState, useEffect } from 'react'
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { allUsers, deactivateUserById } from '../../services/admin.services'
import ModeratorAllUsers from '../../components/users/ModeratorAllUsers'
import UserPostRows from '../../components/users/UserPostRows'
import { getAllPosts } from '../../services/post.services'
import { defaultPicture } from '../../common/constants';


function Moderator() {
    const { addToast, setAppState, user, userData } = useContext(AppContext)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [content, setContent] = useState(true)


    useEffect(() => {
        allUsers()
            .then((u) => {
                setUsers(u)
            })
            .catch((error) => { addToast('error', error.message)})

        getAllPosts()
            .then((p) => {
                setPosts(p)
            })
    }, [userData?.username])

    const showContent = () => {
        setContent(!content)
    }
    

    return (<>
        <div className="card card-side bg-base-100 shadow-xl">
            <figure><img className='w-72' src={userData?.profile ? userData.profile : defaultPicture} alt="Movie" /></figure>
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
                    <th>
                        <button className="btn btn-success btn-xs" disabled={content} onClick={showContent}>All Users</button>
                    </th>     
                    <th>
                        <button className="btn btn-success btn-xs" disabled={!content} onClick={showContent}>All Posts</button>
                    </th>     
                    </tr>
                </thead>
                <tbody>
                    {content ? users.map(user => <ModeratorAllUsers key={user.uid} user={user} />) : posts.map(post => <UserPostRows key={post.id} post={post} />)}
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