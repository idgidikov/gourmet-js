import React from "react"
import { useEffect, useState } from 'react'
import {getData} from '../../data/get.data.js'
import MealCard from "../../components/recipes/MealCard.jsx"
// import MealCard from "../../components/recipes/MealCard"
import { API_KEYS } from "../../common/constants.js"

const AllMeals = () => {
  const [meal, setMeal] = useState([]);

  useEffect(() => {
    getData(API_KEYS.meal).then(result => setMeal(result.meals));
  }, [])



  return (
    <div className="AllMeals">

      <div className="flex flex-wrap justify-around">
        {meal.map(el => <MealCard key={el.idMeal} meal={el} mealDetails={() => (el.idMeal)} />)}
        
      </div>
    
    </div>
  )
}

export default AllMeals