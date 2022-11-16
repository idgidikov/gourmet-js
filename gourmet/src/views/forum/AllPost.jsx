import React from "react"
import MenuBlog from "../../components/forum/MenuBlog"
import { getAllPosts } from '../../services/post.services'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import PostsCard from '../../components/forum/PostCard'
import { getPostsPage } from "../../services/post.services"

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const { addToast } = useContext(AppContext)
    const [page, setPage] = useState(0)

    useEffect(() => {
        const pageSize = 3
        getPostsPage(pageSize, page).then((res) => {
            if (res.length > 0) {
                setPosts(res)
            }

        }).catch(e => addToast('error', e.message))
    }, [page])

    return (
        <div className="AllPost">
            <MenuBlog />
            <h1 className="about-us-header">All Posts</h1>

            <div className="flex flex-wrap justify-around">
                {posts.map(p => <PostsCard key={p.id} post={p} />)}
            </div>
            <div className="pagination-block">
                <button className="btn btn-primary mr-5" disabled={page === 0} onClick={() => setPage(page - 1)}>Prev</button>
                <button className="btn btn-primary" disabled={posts.length == 0} onClick={() => setPage(page + 1)} >Next</button>
            </div>


        </div>
    )

}

export default AllPosts