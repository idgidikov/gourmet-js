import React from "react"
import {Link} from 'react-router-dom'
import { useParams } from "react-router-dom"
const RecipesCard = ({cocktail, cockDetails}) => {
    
    return (
        
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{cocktail.strDrink}</h2>
          <p>{cocktail.strCategory}</p>
          <div className="card-actions">
            
            <Link className="btn btn-primary" to={`/cocktails/${cocktail.idDrink}`}>
            Details
            </Link>
             
            
          </div>
        </div>
      </div>
    )
}

export default RecipesCard