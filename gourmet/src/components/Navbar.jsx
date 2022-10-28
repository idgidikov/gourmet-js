import React from "react"
import AllCocktails from "../views/recipes/AllCocktails"
import {Routes, Route, Link} from "react-router-dom"
import Home from "../views/Home"

const Navbar = function () {

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to="/"><p className="btn btn-ghost normal-case text-xl">Gourmet</p></Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                <li><Link to="/cocktails">Cocktails</Link></li>
                <li><a>Meals</a></li>
                <li><a>Blog</a></li>
                </ul>
            </div>

            <div className="flex-none gap-2">
                <div className="form-control">
                <input type="text" placeholder="Search" className="input input-bordered" />
                </div>
                <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar