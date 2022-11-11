import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { getPostById } from '../../services/post.services'
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../services/post.services'

function DetailsPost() {
    const { postId } = useParams()
    const { addToast, userData } = useContext(AppContext)
    const navigate = useNavigate()

    const showPostDetails = () => {
        navigate(`/blog-post/edit/${postId}`)
    }

    const successDelete = () => {
        navigate(`/blog-post/removed`)
    }

    const removePost = async () => {
        try {
            await deletePost(postId, userData.username)
            successDelete()
        } catch (error) {
            error => addToast('error', error.message)
        }

    }

    const [state, setState] = useState({
        post: '',
        title: '',
        url: '',
    })
    useEffect(() => {
        getPostById(postId)
            .then(p => {
                setState(state => ({
                    ...state,
                    post: p.post,
                    title: p.title,
                    url: p.url,

                }))
            })
            .catch(e => addToast('error', e.message))
    }, [postId]);

    return (
        <div className="container">
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={userData.profile} />
                </div>
            </div>
            <p className="user-name">Author: {userData.firstName}</p>
            <figure><img className="blog-detail-thumbnail" src={state.url} alt="Album"/></figure>
            <h1 className="text-2xl text-center font-bold pt-8 mb-20" dangerouslySetInnerHTML={{__html:state.title}}></h1>
            <div className="card lg:card-side bg-base-100 shadow-xl">
            <div className="card-body">
            <p dangerouslySetInnerHTML={{__html:state.post}}></p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Comment</button>
                <button className="btn btn-primary" onClick={removePost}>Delete</button>
                <button className="btn btn-primary" onClick={showPostDetails}>Edit</button>
                
            </div>
            </div>
        </div>
        </div>
        
    )
}

export default DetailsPost