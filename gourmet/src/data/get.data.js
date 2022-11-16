export const getData = async function (API) {
    const data = await fetch(`${API}`);
    return data.json();
}

export const getSingleCocktail = async function (API,id) {
    const data = await fetch(`${API+id}`);
    
    return data.json();

}

export const getFavoriteCocktails = async (list=[]) => {
    const listFavorites = list.map(id => getSingleCocktail(API, id))

    return listFavorites
}