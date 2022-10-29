import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './views/Home'
import AllCocktails from "./views/recipes/AllCocktails"
import {Routes, Route} from "react-router-dom"
import AllPosts from "./views/forum/AllPost"
import CreatePost from './views/forum/CreatePost'
import CocktailDetails from "./components/recipes/CocktailDetails"
function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktails" element={<AllCocktails />} />
        <Route path="/cocktails/:id" element={ <CocktailDetails />} />
        <Route path="/blog-posts/" element={<AllPosts />} />
        <Route path="/create-blog-posts/" element={<CreatePost />} 
        
        />
      </Routes>
     
    </div>
  )
}

export default App
