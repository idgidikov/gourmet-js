import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import { getPostById } from '../../services/post.services'
import Comment from '../../components/forum/Comments'
import { togglePostLikes } from '../../services/post.services'
import { addComment, getCommentById } from '../../services/comments.services'
import { defaultPicture } from '../../common/constants';




function DetailsPost() {

    const { postId } = useParams()
    const { addToast,setAppState, userData, user } = useContext(AppContext)
    const [state, setState] = useState({
        postObject: null,
        comments: [],
        showCommentForm: false,
        commentText: '',
        post: '',
        title: '',
        url: '',
        id: '',

    })

    useEffect(() => {
        getPostById(postId)
            .then(p => {
                setState(state => ({
                    ...state,
                    post: p.post,
                    title: p.title,
                    url: p.url,
                    id: postId,
                    comments: [],

                }))
                const ids = Object.keys(p.comments)

                return Promise.all(ids.map(getCommentById))
                    .then(comments => setState(state => ({
                        ...state,
                        comments
                    })))
            })

            .catch(e => addToast('error', e.message))
    }, [postId && postId]);


    const toggleLike = async () => {
        try {
            await togglePostLikes(state.id, userData.username, !userData?.likedPostsIds?.includes(state.id))

            if (userData?.likedPostsIds?.includes(state.id)) {
                // dislike
                setAppState({

                    user,
                    userData: {
                        ...userData,
                        likedPostsIds: userData.likedPostsIds.filter(id => id !== state.id)
                    }
                })

                delete state.likedBy[userData.username]
                setState({
                    ...state,
                    //movie: state.movie,
                })
            } else {
                // like
                if (userData.likedPostsIds) {
                    setAppState({
                        user,
                        userData: {
                            ...userData,
                            likedPostsIds: [...userData.likedPostsIds, state.id]
                        }
                    })
                } else {
                    setAppState({
                        user,
                        userData: {
                            ...userData,
                            likedPostsIds: [state.id]
                        }
                    })
                }
                if (!state.likedBy) {
                    state.likedBy = {}
                }
                state.likedBy[userData?.username] = true
                setState({
                    ...state,
                })
            }
        } catch (error) {
            addToast('error', error.message)
        }
    }


    const toggleCommentForm = () => {
        setState({
            ...state,
            showCommentForm: !state.showCommentForm,
        })
    }



    const addPostComment = () => {
        if (state.commentText === '') {
            return setState({ ...state, showCommentForm: false })
        }

        addComment(userData.username, postId, state.commentText, userData.profile)
            .then(comment => {
                setState({
                    ...state,
                    comments: [...state.comments, comment],
                    commentText: '',
                    showCommentForm: false,
                })
            })
            .catch(e => addToast('error', e.message))
    }

    return (
        <div className="container">
            <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={userData?.profile} />
                </div>
            </div>
            <p className="user-name">Author: {userData?.firstName}</p>
            <figure><img className="blog-detail-thumbnail" src={state.url ? state.url : defaultPicture} alt="Album" /></figure>
            <h1 className="text-2xl text-center font-bold pt-8 mb-20" dangerouslySetInnerHTML={{ __html: state.title }}></h1>
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <div className="card-body">
                    <p dangerouslySetInnerHTML={{ __html: state.post }}></p>
                    <div className="card-actions justify-end">
                        {/* <button className="btn btn-primary" onClick={like}>Like {likes}</button> */}
                        <button className="btn btn-primary" onClick={toggleLike}>{userData?.likedPostsIds?.includes(state?.id) ? ' Unlike' : 'Like'} : {Object.keys(state?.likedBy || {}).length} </button>



                    </div>
                </div>
            </div>
                {!state.showCommentForm && <div className="flex mt-6">
                    <div className="flex-grow"></div>
                    <div className="flex-none">
                        <button className="btn btn-primary" disabled={!userData?.isActive} onClick={toggleCommentForm}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>}
                {state.showCommentForm && <div className="form-control mt-6">
                    <div className="input-group">
                        <input
                            value={state.commentText}
                            onChange={e => setState({ ...state, commentText: e.target.value })}
                            type="textarea"
                            placeholder="Comment..."
                            className="input input-bordered w-full"
                        />
                        <button className="btn btn-square" onClick={addPostComment}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>}
                <div className="grid card bg-base-300 rounded-box p-6 mt-6">
                    {state?.comments.length === 0
                        ? <p className="text-center">No comments</p>
                        : state?.comments?.map(c => <Comment key={c.id} comment={c} />)
                    }
                </div>
            </div>

         )
}
export default DetailsPost