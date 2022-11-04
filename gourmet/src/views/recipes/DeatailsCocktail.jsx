import React from "react"
import {useState, useEffect} from "react"


const CocktailDetails = ({cocktail}) => {
    const [cock, setCock] = useState(cocktail)
    useEffect(() => {
        setCock(cocktail)
    },[cocktail])
    const ingredients = Object.keys(cock).filter(key => key.includes("strIngredient"))
    const measure = Object.keys(cock).filter(key => key.includes("strMeasure"))

    const pear = (el) => {
        return measure.find(element => element.slice(-1) === el.slice(-1))
    }
    return (
       <CocktailDetails />
    )
}

export default CocktailDetails