import React from "react"
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import { getSingleCocktail } from "../../data/get.data"
import { API_KEYS } from "../../common/constants"
const MealDetails = () => {
    const {id} = useParams();
    console.log(id)
    const [meal, setMeal] = useState({})
    useEffect(() => {
        
        getSingleCocktail(API_KEYS.mealId,id).then(result => setMeal(result?.meals[0]));
    },[id])
    const ingredients = Object.keys(meal).filter(key => key.includes("strIngredient"))
    const measure = Object.keys(meal).filter(key => key.includes("strMeasure"))

    const pear = (el) => {
        return measure.find(element => element.slice(-1) === el.slice(-1))
    }
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure><img className="mealtail-detail-image" src={meal.strMealThumb} alt={meal.strMeal}/></figure>
        <div className="card-body">
            <h2 className="card-title">{meal.strMeal}</h2>
            <p><b className="badge badge-accent">Category:</b> {meal.strCategory}</p>
            {/* <p><b className="badge badge-accent">Glass:</b> {meal.strGlass}</p> */}
            <p className="badge badge-accent">Ingredients</p>
            {ingredients.filter(el => meal[el]).map(el => <p key={el.slice(-1)}><span className="badge badge-accent">{meal[el]}:</span> {meal[pear(el)]} </p>)}
            <div className="card-actions justify-end">
            <p><b className="badge badge-accent">Instructions: </b> {meal.strInstructions}</p>
            </div>
        </div>
        </div>
    )
}

export default MealDetails