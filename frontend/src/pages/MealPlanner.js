import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function MealPlanner(){

const [recipes,setRecipes] = useState([])
const [mealPlans,setMealPlans] = useState([])

const [day,setDay] = useState("")
const [mealName,setMealName] = useState("")

const userId = localStorage.getItem("userId")

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
    const res = await axios.get("/api/recipes");
    setRecipes(res.data)
  }catch(err){
    console.log(err)
  }
}

const getMealPlans = async () => {
  try{
    const res = await axios.get(`/api/meals/${userId}`);
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

<h2>Meal Planner</h2>

<select value={day} onChange={(e)=>setDay(e.target.value)}>
<option value="">Select Day</option>

{days.map((d)=>(
<option key={d} value={d}>{d}</option>
))}

</select>

<br/><br/>

<input
  type="text"
  placeholder="Enter your meal (e.g. Pasta, Salad)"
  value={mealName}
  onChange={(e)=>setMealName(e.target.value)}
/>


<br/><br/>

<button onClick={addMeal}>
Add Meal
</button>

<hr/>

<h3>Weekly Plan</h3>


{days.map((d)=>{

  const meal = mealPlans.find(m => m.day === d)

  return(
    <div key={d}>
      <b>{d}</b> → {meal ? meal.mealName : "No meal planned"}
    </div>
  )
})}

</div>

)

}

export default MealPlanner