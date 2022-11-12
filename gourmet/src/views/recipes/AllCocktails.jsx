import React from "react"
import { useEffect, useState } from 'react'
import {getData} from '../../data/get.data.js'
import RecipesCard from "../../components/recipes/RecipesCard"
import { API_KEYS } from "../../common/constants.js"

const AllCocktails = () => {
  const [cocktail, setCocktail] = useState([]);


 
  useEffect(() => {
    getData(API_KEYS.cocktail).then(result => setCocktail(result.drinks));
  }, [])



  return (
    <div className="AllCocktails">

      <div className="flex flex-wrap justify-around">
        {cocktail.map(el => <RecipesCard key={el.idDrink} cocktail={el} cockDetails={() => (el.idDrink)} />)}
      </div>
      {/* // <CocktailDetails cocktail={cocktail.length && cocktail[22]} /> */}
    </div>
  )
}

export default AllCocktails