import React from "react"
import CreatePost from "../../views/forum/CreatePost"
import { Routes, Route, Link,NavLink } from "react-router-dom"
import { AppContext } from '../../context/app.context'
import { useContext } from 'react'

const MenuBlog = () => {
    const { addToast, setAppState, ...appState } = useContext(AppContext)
    const { userData } = appState
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <Link to='/blog-posts/last-added' className="btn">Last Added</Link>
                        <Link to='/blog-posts/most-commented' className="btn">Most Commented</Link>
                        <Link to='/blog-posts/most-liked' className="btn">Most Liked</Link>
                        <Link to='/blog-posts/food' className="btn">Food</Link>
                        <Link to='/blog-posts/beverage' className="btn">Beverage</Link>
                      


                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li className="mr-5"><Link to='/blog-posts/last-added' className="btn">Last Added</Link></li>
                    <li className="mr-5"><Link to='/blog-posts/most-commented' className="btn">Most Commented</Link></li>
                    <li className="mr-5"><Link to='/blog-posts/most-liked' className="btn">Most Liked</Link></li>
                    <li className="mr-5"><Link to='/blog-posts/food' className="btn">Food</Link></li>
                    <li className="mr-5"><Link to='/blog-posts/beverage' className="btn">Beverage</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
            {
                            userData?.isActive === true ? <Link to="/create-blog-posts/"><p className="btn btn-primary" disabled={!userData?.isActive}>Create Post</p> </Link>
                            : <p className="btn btn-primary" disabled={!userData?.isActive}>Create Post</p>
                        }
            </div>
        </div>
    )

}

export default MenuBlog