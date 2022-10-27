import { useEffect, useState } from 'react'
import {getData, getSingleCocktail} from './data/get.data.js'
import './App.css'
import Cocktail from './components/Coctail';
import CocktailDetails from './components/CocktailDetails';
import Navbar from './components/Navbar'


function App() {
  const [cocktail, setCocktail] = useState([]);

  useEffect(() => {
    getData().then(result => setCocktail(result.drinks));
  },[])

  

  return (
    <div className="App">
      <Navbar />
      
      <div className="flex flex-wrap justify-around">
        {cocktail.map(el => <Cocktail key={el.idDrink} cocktail={el} cockDetails={() => cockDetails(el.idDrink)}/>)}
      </div>
      <CocktailDetails cocktail={cocktail.length && cocktail[22]}/>
    </div>
  )
}

export default App
