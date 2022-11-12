import React from 'react'
import { useContext } from 'react'
import { AppContext } from '/src/context/app.context'

import MenuBlog from "../../components/forum/MenuBlog"
import { getAllPosts } from '../../services/post.services'
import { useState } from 'react'
import { useEffect } from 'react'
import PostsCard from '../../components/forum/PostCard'
import { getPostsByName } from '../../services/post.services'

function SearchPosts() {
    const { addToast, setAppState, user, userData, searchData } = useContext(AppContext)
    const [posts, setPosts] = useState([])
    console.log(searchData)
    useEffect(() => {
        if (searchData=== '') return setPosts([])
    
        const timer = setTimeout(() => getPostsByName(searchData)
          .then(p=>setPosts(p))
          .catch(e => addToast('error', e.message)), 1000)
    
        return () => clearTimeout(timer)
      }, [searchData])
      //console.log(posts)
    return (
        <>

            <div>SearchPosts</div>
            <div className="flex flex-wrap justify-around">
        {posts?.map(m => <PostsCard key={m.id} post={m} />)}
        
      </div> 
        </>
    )
}

export default SearchPosts