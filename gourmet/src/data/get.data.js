export const getData = async function () {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');
    return data.json();
}

export const getSingleCocktail = async function (id) {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return data.json();

}
