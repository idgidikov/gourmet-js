import React from 'react'
import MenuBlog from "../../components/forum/MenuBlog"
import { getAllPosts } from '../../services/post.services'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import PostsCard from '../../components/forum/PostCard'

const MostLikes = () => {
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
            <h1>Most Liked Posts</h1>
           
            <div className="flex flex-wrap justify-around">
                {posts.filter(   p => p.likedBy )
                    .map(p => <PostsCard key={p.id} post={p} />).sort().reverse()}
            </div>
            
        </div>
        )

}

export default MostLikes