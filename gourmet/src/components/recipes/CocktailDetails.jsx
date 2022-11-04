import React from "react"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { getSingleCocktail } from "../../data/get.data"
import { API_KEYS } from "../../common/constants"

const CocktailDetails = () => {
    const {id} = useParams();
    const [cock, setCock] = useState({})
    useEffect(() => {
        
        getSingleCocktail(API_KEYS.cocktailId,id).then(result => setCock(result?.drinks[0]));
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
            <p><b className="badge badge-accent">Category:</b> {cock.strCategory}</p>
            <p><b className="badge badge-accent">Glass:</b> {cock.strGlass}</p>
            <p className="badge badge-accent">Ingredients</p>
            {ingredients.filter(el => cock[el]).map(el => <p key={el.slice(-1)}><span className="badge badge-accent">{cock[el]}:</span> {cock[pear(el)]} </p>)}
            <div className="card-actions justify-end">
            <p><b className="badge badge-accent">Instructions: </b> {cock.strInstructions}</p>
            </div>
        </div>
        </div>
    )
}

export default CocktailDetails