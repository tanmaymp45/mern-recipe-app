import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import API from "../services/api";

const API_KEY = process.env.REACT_APP_API_KEY || "";
function RecipeDetails(){

const { id } = useParams()

const [recipe,setRecipe] = useState(null)

const userId = localStorage.getItem("userId")

const getRecipeDetails = async () => {

try{

const res = await axios.get(
`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
)

console.log("DETAILS:", res.data) 

setRecipe(res.data)

}catch(err){

console.log("DETAIL ERROR:", err.response?.data || err.message)

if(err.response?.status === 401){
  alert("API limit reached or invalid key")
}
}

}


const addToFavorites = async () => {

try{

await await API.put("/api/recipes/favorite", {
  userId,
  recipe
});

alert("Added to favorites")

}catch(err){
console.log(err)
}

}

useEffect(()=>{

if(id){
getRecipeDetails()
}

},[id])

if(!recipe){
return (
  <div>
    <Navbar />
    <main className="container page">
      <div className="empty">Loading recipe…</div>
    </main>
  </div>
)
}

return(

<div>
<Navbar/>

<main className="container page">
  <div className="two-col">
    <div className="card recipe-card">
      <div className="recipe-media">
        {recipe.image ? <img src={recipe.image} alt={recipe.title} /> : null}
      </div>
      <div className="recipe-body">
        <div className="row row-wrap" style={{ justifyContent: "space-between" }}>
          <h2 className="section-title" style={{ margin: 0 }}>{recipe.title}</h2>
          <span className="pill">{recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : "Recipe"}</span>
        </div>

        <div className="row row-wrap" style={{ marginTop: 8 }}>
          <button className="btn btn-success" onClick={addToFavorites}>
            Add to Favorites
          </button>
        </div>

        <hr className="hr" />

        <h3 className="section-title" style={{ fontSize: 18 }}>Ingredients</h3>
        <ul className="content-prose" style={{ marginTop: 8 }}>
          {recipe.extendedIngredients?.length > 0 ? (
            recipe.extendedIngredients.map((ing)=>(
              <li key={ing.id || ing.original}>{ing.original}</li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul>
      </div>
    </div>

    <aside className="grid" style={{ alignContent: "start" }}>

      <div className="card card-pad">
        <h3 className="section-title" style={{ fontSize: 18 }}>Instructions</h3>

        <div className="content-prose" style={{ marginTop: 8 }}>
          {/* ✅ HANDLE EMPTY INSTRUCTIONS */}
          {recipe.instructions ? (
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          ) : recipe.summary ? (
            <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          ) : (
            <p>No instructions available</p>
          )}
        </div>
      </div>
    </aside>
  </div>
</main>

</div>

)

}

export default RecipeDetails