import { useState, useEffect } from "react"
import axios from "axios";
import API from "../services/api";
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [mode, setMode] = useState("ingredients") 

  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  const API_KEY = process.env.REACT_APP_API_KEY
  const BASE_URL = "https://api.spoonacular.com/recipes"
  const BACKEND_BASE = `${process.env.REACT_APP_API_URL}`

  function normalizeSpoonacularRecipe(recipe) {
    const result = { ...recipe }
    if (!result.id && result._id) result.id = result._id
    return result
  }

  const getRandomRecipes = async () => {
    try {
      const spoonRes = await axios.get(`${BASE_URL}/random`, {
        params: {
          number: 8,
          apiKey: API_KEY
        }
      })
      const spoonacularRecipes = (spoonRes.data?.recipes || []).map(normalizeSpoonacularRecipe)
      setRecipes(spoonacularRecipes)
    } catch (err) {
      console.log("RANDOM ERROR:", err.response?.data || err.message)
      if (err.response?.status === 401) {
        alert("API key invalid or daily limit reached")
      }
    }
  }

  const searchByIngredients = async () => {
    if (!search) {
      getRandomRecipes()
      return
    }
    try {
      const spoonRes = await axios.get(`${BASE_URL}/findByIngredients`, {
        params: {
          ingredients: search,
          number: 8,
          apiKey: API_KEY
        }
      })
      const spoonacularRecipes = (spoonRes.data || []).map(normalizeSpoonacularRecipe)
      setRecipes(spoonacularRecipes)
    } catch (err) {
      console.log("SEARCH INGREDIENTS ERROR:", err.response?.data || err.message)
      if (err.response?.status === 401) {
        alert("API key invalid or limit reached")
      }
    }
  }

  const searchByName = async () => {
    if (!search) {
      getRandomRecipes()
      return
    }
    try {
      const spoonRes = await axios.get(`${BASE_URL}/complexSearch`, {
        params: {
          query: search,
          number: 8,
          apiKey: API_KEY
        }
      })
      const spoonacularRecipes = (spoonRes.data?.results || []).map(normalizeSpoonacularRecipe)
      setRecipes(spoonacularRecipes)
    } catch (err) {
      console.log("SEARCH NAME ERROR:", err.response?.data || err.message)
      if (err.response?.status === 401) {
        alert("API key invalid or limit reached")
      }
    }
  }

  const handleSearch = () => {
    if (mode === "ingredients") {
      searchByIngredients()
    } else {
      searchByName()
    }
  }

  const favoriteRecipe = async (recipe) => {
    try {
      await API.put("/api/recipes/favorite", {
        userId,
        recipe
      })
      alert("Recipe added to favorites")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRandomRecipes()
    
  }, [])

  function getRecipeImage(r) {
    if (r.image && /^https?:\/\//.test(r.image)) return r.image
    if (r.imageUrl && /^https?:\/\//.test(r.imageUrl)) return r.imageUrl
    return ""
  }

  return (
    <div>
      <Navbar />

      <main className="container page">
        <div className="row row-wrap" style={{ justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              Find recipes
            </h2>
            <div className="subtle">
              {mode === "ingredients"
                ? "Search by ingredients (comma separated) or explore random recipes."
                : 'Search recipes by name (e.g. "Pav Bhaji", "Veg Biryani").'}
            </div>
          </div>
        </div>

        <div className="card card-pad" style={{ marginBottom: 16 }}>
          <div className="row row-wrap">
            <div className="row" style={{ marginBottom: 8 }}>
              <button
                type="button"
                className={`btn ${mode === "ingredients" ? "btn-primary" : ""}`}
                onClick={() => setMode("ingredients")}
              >
                By ingredients
              </button>
              <button
                type="button"
                className={`btn ${mode === "name" ? "btn-primary" : ""}`}
                onClick={() => setMode("name")}
              >
                By name
              </button>
            </div>

            <input
              className="input grow"
              placeholder={mode === "ingredients" ? "tomato, onion, cheese" : "e.g. Paneer Butter Masala"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>

            <button className="btn" onClick={getRandomRecipes}>
              Random
            </button>
          </div>
          <div className="helper" style={{ marginTop: 10 }}>
            Tip: try “paneer, capsicum” or “chicken, garlic”.
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="empty">No recipes found. Try a different search.</div>
        ) : (
          <div className="grid grid-4">
            {recipes.map((r) => {
              const title = r.title || r.name
              const image = getRecipeImage(r)

              return (
                <article
                  key={r.id}
                  className="card recipe-card"
                  onClick={() => navigate(`/recipe/${r.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="recipe-media">{image ? <img src={image} alt={title} /> : null}</div>

                  <div className="recipe-body">
                    <h3 className="recipe-title">{title}</h3>

                    <div className="recipe-actions">
                      <button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.stopPropagation()
                          favoriteRecipe(r)
                        }}
                      >
                        Favorite
                      </button>

                      <button
                        className="btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/recipe/${r.id}`)
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default Recipes
