import React from "react"
import MenuBlog from "../../components/forum/MenuBlog"
import { getAllPosts } from '../../services/post.services'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import PostsCard from '../../components/forum/PostCard'

const ByDatePosts = () => {
    const [posts, setPosts] = useState([])
    const { addToast } = useContext(AppContext)

    useEffect(() => {
        getAllPosts().then((res) => {
            setPosts(res)
        }).catch(e => addToast('error', e.message))
    }, [])
    return (
        <div className="AllPost">
            <MenuBlog />
            <h1 className="about-us-header">Last Added by Date</h1>
           
            <div className="flex flex-wrap justify-around">
                {posts.map(p => <PostsCard key={p.id} post={p} />).reverse()}
            </div>
            
        </div>
        )

}

export default ByDatePosts