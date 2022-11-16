import React from "react"
import MenuBlog from "../../components/forum/MenuBlog"
import { getAllPosts } from '../../services/post.services'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import PostsCard from '../../components/forum/PostCard'

const Beverage = () => {
    const [posts, setPosts] = useState([])
    const { addToast } = useContext(AppContext)

    useEffect(() => {
        getAllPosts().then((res) => {
            if(res.length > 0){
              const filteredRes= res.filter(p => p.tag === 'Beverage')
            setPosts(filteredRes)
        }
        }).catch(e => addToast('error', e.message))
    }, [])
    return (
        <div className="AllPost">
            <MenuBlog />
            <h1 className="about-us-header">Beverage</h1>
           
            <div className="flex flex-wrap justify-around">
                {posts.map(p => <PostsCard key={p.id} post={p} />).reverse()}
            </div>
            
        </div>
        )

}

export default Beverage