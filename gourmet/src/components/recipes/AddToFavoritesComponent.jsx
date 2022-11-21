import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/app.context'
import { addCocktailsFavorites } from '../../services/favorites.services'
import { getUser } from '../../services/users.services'

function AddToFavoritesComponent(cocktailId) {
    const { addToast, setAppState, userData, user } = useContext(AppContext)
    const liked = userData?.cocktails[cocktailId.cocktailId]
    console.log(liked)
    const [favorites, setFavorites] = useState(liked)

    const addToFavorites = () => {

        addCocktailsFavorites(userData?.username, cocktailId.cocktailId)
            .then((result) => {
                if(result === true) {
                    setFavorites(false)
                    addToast('success', "Removed from favorites successful")
                    setAppState(prev => ({
                        ...prev,
                        userData: {
                            ...userData,
                            
                        }
                    })
                    )
                } else {
                    setFavorites(true)
                    addToast('success', "Added to favorites successful")
                    setAppState(prev => ({
                        ...prev,
                        userData: {
                            ...userData,
                            cocktailId : true
                        }
                    })
                    )
                }
            })
            .catch((error) => {addToast('error', error.message)})
        
       
    }
    console.log(userData)

 

    return (
        <div className="add-to-favorites" onClick={addToFavorites}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={favorites ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
        </div>
    )
}

export default AddToFavoritesComponent