import React from 'react'
import { deletePost } from '../../services/post.services'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'

function RemovePost() {
    
    return (
        <div>Post removed</div>
    )
}

export default RemovePost