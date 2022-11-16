import React from 'react'
import { useState, useEffect } from 'react'
import { myFavoritesCocktails } from '../../services/favorites.services'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import RecipesCard from "../../components/recipes/RecipesCard"
import { API_KEYS } from "../../common/constants.js"


function FavoritesCocktails() {
    const [favorites, setFavorites] = useState([])
    const { addToast,setAppState, userData, user } = useContext(AppContext)
    useEffect(() => {
        myFavoritesCocktails(userData?.username, API_KEYS.cocktailId).then((result) => {
                const cleanObjects = result
                setFavorites(cleanObjects)
                
            })
    }, [userData])

    return (
        <div className="AllCocktails">
            <h1 className="about-us-header"> My Favorites Cocktails</h1>
            <div className="flex flex-wrap justify-around">
                {favorites?.map(el => <RecipesCard key={el.drinks[0].idDrink} cocktail={el?.drinks[0]} cockDetails={() => (el.drinks[0].idDrink)} />)}
            </div>
        </div>
    )
}

export default FavoritesCocktails