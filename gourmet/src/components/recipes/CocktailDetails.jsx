import React from "react"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { getSingleCocktail } from "../../data/get.data"

const CocktailDetails = () => {
    const {id} = useParams();
    const [cock, setCock] = useState({})
    useEffect(() => {
        
        getSingleCocktail(id).then(result => setCock(result?.drinks[0]));
    },[id])
    const ingredients = Object.keys(cock).filter(key => key.includes("strIngredient"))
    const measure = Object.keys(cock).filter(key => key.includes("strMeasure"))

    const pear = (el) => {
        return measure.find(element => element.slice(-1) === el.slice(-1))
    }
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img src={cock.strDrinkThumb} alt={cock.strDrink}/></figure>
        <div className="card-body">
            <h2 className="card-title">{cock.strDrink}</h2>
            <p>Ingredients</p>
            <ul>
                {ingredients.filter(el => cock[el]).map(el => <li key={el.slice(-1)}>{cock[el]}: {cock[pear(el)]} </li>)}
            </ul>
            <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
            </div>
        </div>
        </div>
    )
}

export default CocktailDetails