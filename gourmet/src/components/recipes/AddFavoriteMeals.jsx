import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/app.context'
import { addFavoriteMeals } from '../../services/favorites.services'
import { getUser } from '../../services/users.services'

function AddFavoriteMeals(mealId) {
    const { addToast, setAppState, userData, user } = useContext(AppContext)
    const [favorites, setFavorites] = useState()

    const addToFavorites = () => {

        addFavoriteMeals(userData?.username, mealId.mealId)
            .then((result) => {
                if(result === true) {
                    setFavorites(false)
                    console.log(result)
                    addToast('success', "Removed from favorites successful")
                } else {
                    setFavorites(true)
                    addToast('success', "Added to favorites successful")
                }
            })
            .catch((error) => {addToast('error', error.message)})
        
       
    }
    console.log(favorites)

    // useEffect(() => {
    //     if (user !== null) {

    //         getUser(userData?.username)
    //             .then((u) => {
    //                 setAppState({
    //                     ...user,
    //                     userData: {
    //                         ...userData,
    //                         favorites: {
    //                             ...favorites,
    //                             cocktails: u?.favorites?.cocktails || {},
    //                         },
    //                     },
    //                 })
    //             })
    //             .catch((error) => {addToast('error', error.message), console.log(error)})
    //     }

    // }, [cocktailId])

    return (
        <div className="add-to-favorites" onClick={addToFavorites}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={userData?.favorites?.meals[mealId] ? 'none' : 'red'} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
    )
}

export default AddFavoriteMeals