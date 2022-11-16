import React from "react"
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom"

import AddFavoriteMeals from './AddFavoriteMeals'

const MealCard = ({meal}) => {
    
    return (
        
        <div className="card w-96 bg-base-300 shadow-xl mb-7">
        <figure className="px-10 pt-10">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{meal.strMeal}</h2>
          <AddFavoriteMeals mealId={meal.idMeal}/>
          <p>{meal.strCategory}</p>
          <div className="card-actions">
            
            <Link className="btn btn-primary" to={`/meals/${meal.idMeal}`}>
            Details
            </Link>
             
            
          </div>
        </div>
      </div>
    )
}

export default MealCard