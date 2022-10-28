import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './views/Home'
import AllCocktails from "./views/recipes/AllCocktails"
import {Routes, Route} from "react-router-dom"

function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cocktails" element={<AllCocktails />} />
      </Routes>
     
    </div>
  )
}

export default App
