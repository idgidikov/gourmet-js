import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { getPostById } from '../../services/post.services'

function DetailsPost() {
    const { postId } = useParams()
    const { addToast, setAppState } = useContext(AppContext)

    const [state, setState] = useState({
        post: '',
        title: '',
    })
    useEffect(() => {
        getPostById(postId)
            .then(p => {
                setState(state => ({
                    ...state,
                    post: p.post,
                    title: p.title,

                }))
            })
            .catch(e => addToast('error', e.message))
    }, [postId]);
    return (
        <div className="container">
            <h1 className="text-2xl text-center font-bold pt-8 mb-20" dangerouslySetInnerHTML={{__html:state.title}}></h1>
            <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure><img src="https://placeimg.com/400/400/arch" alt="Album"/></figure>
            <div className="card-body">
            <p dangerouslySetInnerHTML={{__html:state.post}}></p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Comment</button>
            </div>
            </div>
        </div>
        </div>
        
    )
}

export default DetailsPost