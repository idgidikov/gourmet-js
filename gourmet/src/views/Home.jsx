import React from "react"
import { useEffect, useState} from 'react'
import { userCount, postCount } from '../services/home.services'
import NumbersShuffle from '../react-spring/NumbersShuffle'
import { useNavigate } from 'react-router-dom'
import AutoScrollText from '../react-spring/AutoScrollText'



const Home = () => {
    const [users, setUsers] = useState(0)
    const [posts, setPosts] = useState(0)

    const navigate = useNavigate()

    const showAllPosts = () => {
      navigate(`/blog-posts/`)
    }
    // const showAllUsers = () => {
    //   navigate(`/blog-posts/`)
    // }
    const showAllCocktails = () => {
      navigate(`/cocktails/`)
    }
    const showAllMeals = () => {
      navigate(`/meals/`)
    }

    useEffect(() => {
        userCount().then(res => setUsers(res))
        postCount().then(res => setPosts(res))
    }, [])


    return (
        <div className="Home">
            <div className="header">
                <h1 className="gourmet-header">Gourmet</h1>
                <img className="main-image" src="src/assets/gourmet.jpg" alt="" />
            </div>
            <h2 className="header-statistics">Welcome to Gourmet forum</h2>
            <div className="forum-statistics">
                <div className="card w-96 bg-neutral text-neutral-content ml-3">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title-statistics"><NumbersShuffle n={100} /></h2>
                        <p className="card-paragraph-statistics">Cocktails</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={showAllCocktails}>View</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-neutral text-neutral-content ml-3">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title-statistics"><NumbersShuffle n={100} /></h2>
                        <p className="card-paragraph-statistics">Meals</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={showAllMeals}>View</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-neutral text-neutral-content ml-3">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title-statistics"><NumbersShuffle n={posts} /></h2>
                        <p className="card-paragraph-statistics">Posts</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={showAllPosts}>View</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-neutral text-neutral-content ml-3">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title-statistics"><NumbersShuffle n={users} /></h2>
                        <p className="card-paragraph-statistics">Users</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>

            </div>
            <h2 className="about-us-header">About us</h2>
            <div className="about-us">
                <p className="about-us-paragraph">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <h2 className="developers-header">Developers</h2>
            <div className="forum-developers">
                <div className="card w-96 bg-base-100 shadow-xl ml-8">
                    <figure className="px-10 pt-10">
                        <img src="src/assets/ivan.jpg" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Ivan</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary">Contacts</button>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl ml-4">
                    <figure className="px-10 pt-10">
                        <img src="src/assets/evgeni.jpg" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Evgeni</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary">Contacts</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home