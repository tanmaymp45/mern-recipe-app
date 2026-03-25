import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Recipes from "./pages/Recipes"
import MealPlanner from "./pages/MealPlanner"
import Profile from "./pages/Profile"
import RecipeDetails from "./pages/RecipeDetails"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Recipes />} />
          <Route path="/planner" element={<MealPlanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App