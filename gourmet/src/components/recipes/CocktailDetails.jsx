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
        <figure><img className="cocktail-detail-image" src={cock.strDrinkThumb} alt={cock.strDrink}/></figure>
        <div className="card-body">
            <h2 className="card-title">{cock.strDrink}</h2>
            <p><b>Category:</b> {cock.strCategory}</p>
            <p><b>Glass:</b> {cock.strGlass}</p>
            <p>Ingredients</p>
            {ingredients.filter(el => cock[el]).map(el => <p className="card-info mt-2" key={el.slice(-1)}>{cock[el]}: {cock[pear(el)]} </p>)}
            <div className="card-actions justify-end">
            <p><b>Instructions: </b> {cock.strInstructions}</p>
            </div>
        </div>
        </div>
    )
}

export default CocktailDetails