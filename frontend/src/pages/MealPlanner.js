import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function MealPlanner(){

const [recipes,setRecipes] = useState([])
const [mealPlans,setMealPlans] = useState([])

const [day,setDay] = useState("")
const [mealName,setMealName] = useState("")

const userId = localStorage.getItem("userId")
const API = process.env.REACT_APP_API_URL
const days = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"
]

const getRecipes = async () => {
  try{
    const res = await axios.get(`${API}/api/recipes`);
    setRecipes(res.data)
  }catch(err){
    console.log(err)
  }
}

const getMealPlans = async () => {
  try{
    const res = await axios.get(`${API}/api/meals/${userId}`);
    setMealPlans(res.data)
  }catch(err){
    console.log(err)
  }
}

const addMeal = async () => {

  if(!day || !mealName){
    alert("Please select day and enter meal")
    return
  }

  try{
    await axios.post("/api/meals",{
      userId,
      day,
      mealName   
    })

    alert("Meal Added")

    setDay("")
    setMealName("")

    getMealPlans()

  }catch(err){
    console.log(err)
  }

}

useEffect(()=>{
  getRecipes()
  getMealPlans()
},[])

return(

<div>
      <Navbar />

      <main className="container page">

        {/* 🔹 Add Meal Section */}
        <div className="card card-pad">
          <h2 className="section-title">Meal Planner</h2>

          <div className="row row-wrap">

            <select
              className="input"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">Select Day</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <input
              className="input"
              placeholder="Enter your meal (e.g. Pasta, Salad)"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />

            <button className="btn btn-primary" onClick={addMeal}>
              Add Meal
            </button>

          </div>
        </div>

        {/* 🔹 Weekly Plan */}
        <div className="card card-pad" style={{ marginTop: 20 }}>
          <h3 className="section-title">Weekly Plan</h3>

          <div className="grid grid-2">
            {days.map((d) => {
              const meal = mealPlans.find(m => m.day === d)

              return (
                <div key={d} className="card card-pad">
                  <b>{d}</b>
                  <p style={{ marginTop: 6 }}>
                    {meal ? meal.mealName : "No meal planned"}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

      </main>
    </div>

)

}

export default MealPlanner