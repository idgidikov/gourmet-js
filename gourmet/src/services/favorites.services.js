import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey } from 'firebase/database'
import { db } from '../firebase/config'
import { getSingleCocktail } from '../data/get.data'

export const addCocktailsFavorites = async (author, cocktailId) => {
    const favorite = await get(ref(db, `users/${author}/cocktails/${cocktailId}`))
    if(!favorite.exists()) {
        await push(ref(db, `cocktails`), cocktailId)
        await update(ref(db), {
            [`users/${author}/cocktails/${cocktailId}`]: true,
        })
    }
    if(favorite.exists()) {
        console.log(favorite.val())
        await set(ref(db, `users/${author}/cocktails/${cocktailId}`), null)
    }

    return favorite.val()
}
export const addFavoriteMeals = async (author, mealsId) => {
    const favorite = await get(ref(db, `users/${author}/meals/${mealsId}`))
    if(!favorite.exists()) {
        await push(ref(db, `meals`), mealsId)
        await update(ref(db), {
            [`users/${author}/meals/${mealsId}`]: true,
        })
    }
    if(favorite.exists()) {
        console.log(favorite.val())
        await set(ref(db, `users/${author}/meals/${mealsId}`), null)
    }

    return favorite.val()
}


export const myFavoritesCocktails = async (author, API) => {
    const favorite = await get(ref(db, `users/${author}/cocktails`))
    const favoritesArray = Object.keys(favorite.val())
    const fetchCocktails = favoritesArray.map((el) => getSingleCocktail(API, el))

    return (
        Promise.all(fetchCocktails)
    )
}
export const myFavoritesMeals = async (author, API) => {
    const favorite = await get(ref(db, `users/${author}/meals`))
    const favoritesArray = Object.keys(favorite.val())
    const fetchMeals = favoritesArray.map((el) => getSingleCocktail(API, el))

    return (
        Promise.all(fetchMeals)
    )
}