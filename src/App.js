import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

const APP_ID = "954605be";
const API_KEY = "b269f736520e320f0b7ddc67d113d503";

const [recipes, setRecipes] = useState([]);
const [search, setSearch] = useState('');
const [query, setQuery] = useState('chicken')


useEffect(() => {
getRecipes();
}, [query]);

const getRecipes = async () => {
const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`)
const data =  await response.json();
setRecipes(data.hits);
}

const updateSearch = e => {
setSearch(e.target.value)
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}


  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button 
      className="search-button"  
      type="submit">Search</button>
    </form>
    < div className="recipes">
    {recipes.map(recipe =>(
      <Recipe 
      key={recipe.recipe.label}
      title={recipe.recipe.label} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>
    </div>
  );
}





export default App;
