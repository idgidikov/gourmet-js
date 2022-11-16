import React from 'react'
import { useState, useEffect } from 'react'
import { myFavoritesMeals } from '../../services/favorites.services'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import MealDetails from "../../components/recipes/MealDetails"
import { API_KEYS } from "../../common/constants.js"
import  MealCard  from "../../components/recipes/MealCard"


function FavoritesMeals() {
    const [favorites, setFavorites] = useState([])
    const { addToast,setAppState, userData, user } = useContext(AppContext)

    useEffect(() => {
        myFavoritesMeals(userData?.username, API_KEYS.mealId).then((result) => {
                const cleanObjects = result
                setFavorites(cleanObjects)
                
            })
    }, [userData])
    return (
        <div className="AllCocktails">
            <h1 className="about-us-header"> My Favorites Meals</h1>
            <div className="flex flex-wrap justify-around">
                {favorites?.map(el => <MealCard key={el.meals[0].idMeal} meal={el.meals[0]} mealDetails={() => (el.meals[0].idMeals)} />)}
            </div>
        </div>
    )
}

export default FavoritesMeals