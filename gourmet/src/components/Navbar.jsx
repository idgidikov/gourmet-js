import React from "react"
import AllCocktails from "../views/recipes/AllCocktails"
import { Link, NavLink } from "react-router-dom"
import Home from "../views/Home"
import { useContext } from 'react'
import { AppContext } from '../context/app.context'
import { useSearchParams } from 'react-router-dom'
import { getPostsByName } from "../services/post.services"
import { useEffect, useState } from 'react'
import { defaultPicture } from "../common/constants"



const Navbar = function () {
    const [search, setSearch] = useSearchParams()
    const { addToast, setAppState, user, userData, searchData } = useContext(AppContext)


    const [posts, setPosts] = useState([])
    const [keyword, setKeyword] = useState(search.get('name') || '')


    // useEffect(() => {
    //     if (keyword === '') return setPosts([])
    
    //     const timer = setTimeout(() => getPostsByName(keyword)
    //       .then(setPosts)
    //       .catch(e => addToast('error', e.message)), 1000)
    
    //     return () => clearTimeout(timer)
    //   }, [keyword])
    
      const setSearchParams = (value) => {
        setKeyword(value)
        setSearch({ name: value })
        setAppState({
            user,
            userData,
            searchData: keyword
        })
        
      }
      




    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <NavLink to="/"><p className="btn btn-ghost normal-case text-xl">Gourmet</p></NavLink>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><NavLink to="/cocktails">Cocktails</NavLink></li>
                    <li><NavLink to="/meals" >Meal</NavLink></li>
                    <li><NavLink to="/blog-posts/">Blog</NavLink></li>
                    {/* <li><NavLink to="/login">Login</NavLink></li> */}
                </ul>
            </div>

            <div className="flex-none gap-2">
                <div className="form-control">
                    <Link to='/search-posts'><input  
                    type="text" placeholder="Search" 
                    className="input input-bordered"
                    value={keyword}
                    onChange={e => setSearchParams(e.target.value)}
                     /></Link>
                </div>
                {user === null ? <NavLink to="/login">Login</NavLink> :
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={userData?.profile ? userData.profile : defaultPicture} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to='/edit-profile'>Settings</Link></li>
                            <li><Link to='/logout'>Logout</Link></li>
                        </ul>
                    </div>}



            </div>
        </div>
    )
}

export default Navbar