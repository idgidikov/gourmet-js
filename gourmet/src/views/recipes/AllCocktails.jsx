import React from "react"

const Cocktail = ({cocktail, cockDetails}) => {
    
    return (
        
        <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{cocktail.strDrink}</h2>
          <p>{cocktail.strCategory}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => cockDetails(cocktail.idDrink)}>Details</button>
          </div>
        </div>
      </div>
    )
}

export default Cocktail