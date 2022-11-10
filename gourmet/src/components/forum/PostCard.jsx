import React from 'react'
import { useNavigate } from 'react-router-dom'

function PostCard({post}) {

    const navigate = useNavigate()

    const showPostDetails = () => {
      navigate(`/blog-post/${post.id}`)
    }

    return (

      <div className="card card-side bg-base-100 shadow-xl mb-8">
      <figure><img className="w-24 rounded-xl" src={post.url} alt="Post"/></figure>
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={showPostDetails}>View</button>
        </div>
      </div>
    </div>

    )
}

export default PostCard