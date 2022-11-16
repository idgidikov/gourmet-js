import React from "react"
import { useEffect, useState } from 'react'
import {getData} from '../../data/get.data.js'
import MealCard from "../../components/recipes/MealCard.jsx"
import { API_KEYS } from "../../common/constants.js"
import NavigationAbc from '../../components/recipes/NavigationAbc'


const AllMeals = () => {
  const [meal, setMeal] = useState([]);
  const [search, setSearch] = useState('n');


  const searchLetter = (letter) => {
    setSearch(letter)
  }


  useEffect(() => {
      getData(API_KEYS.meal + search).then(result => setMeal(result.meals));
  
  },[search])

  return (
    <div className="AllMeals">
      <NavigationAbc searchLetter={searchLetter}/>
         <div className="flex flex-wrap justify-around">
        {meal?.map(el => <MealCard key={el.idMeal} meal={el} mealDetails={() => (el.idMeal)} />)}
        
      </div> 
    
    
    </div>
  )
}

export default AllMeals