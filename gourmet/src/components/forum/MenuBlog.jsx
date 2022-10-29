import React from "react"
import CreatePost from "../../views/forum/CreatePost"
import {Routes, Route, Link} from "react-router-dom"


const MenuBlog = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <a className="btn">Top 10</a>
                    <a className="btn">Trends</a>
                    <a className="btn">Liked</a>
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <a className="btn">Top 10</a>
                    <a className="btn ml-3">Trends</a>
                    <a className="btn ml-3">Liked</a>
                </ul>
            </div>
            <div className="navbar-end">
            <Link to="/create-blog-posts/"><p className="btn btn-primary">Create Post</p></Link>
            </div>
        </div>
    )

}

export default MenuBlog