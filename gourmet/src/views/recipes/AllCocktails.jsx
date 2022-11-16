import React from "react"
import { useEffect, useState } from 'react'
import {getData} from '../../data/get.data.js'
import RecipesCard from "../../components/recipes/RecipesCard"
import { API_KEYS } from "../../common/constants.js"
import NavigationAbc from '../../components/recipes/NavigationAbc'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'

const AllCocktails = () => {
  const [cocktail, setCocktail] = useState([]);
  const [search, setSearch] = useState('n');
  const { addToast,setAppState, userData, user } = useContext(AppContext)
  const [favorites, setFavorites] = useState()

  const searchLetter = (letter) => {
    setSearch(letter)
  }

 
  useEffect(() => {
    getData(API_KEYS.cocktail + search).then(result => setCocktail(result.drinks));
  }, [search])



  return (
    <div className="AllCocktails">
      <NavigationAbc searchLetter={searchLetter}/>
      <div className="flex flex-wrap justify-around">
        {cocktail?.map(el => <RecipesCard key={el.idDrink} cocktail={el} cockDetails={() => (el.idDrink)} />)}
      </div>
    </div>
  )
}

export default AllCocktails