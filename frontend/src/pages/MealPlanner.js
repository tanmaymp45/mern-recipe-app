import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function MealPlanner() {

  const [mealPlans, setMealPlans] = useState([])

  const [day, setDay] = useState("")
  const [mealName, setMealName] = useState("")
  const [note, setNote] = useState("")

  const userId = localStorage.getItem("userId")

  // ✅ IMPORTANT: use backend URL
  const API = process.env.REACT_APP_API_URL

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // 🔹 Get meal plans
  const getMealPlans = async () => {
    try {
      const res = await axios.get(`${API}/api/meals/${userId}`)
      setMealPlans(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 🔹 Add meal
  const addMeal = async () => {
    if (!day || !mealName) {
      alert("Please select day and enter meal")
      return
    }

    try {
      await axios.post(`${API}/api/meals`, {
        userId,
        day,
        mealName,
        note
      })

      alert("Meal Added")

      setDay("")
      setMealName("")
      setNote("")

      getMealPlans()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userId) getMealPlans()
  }, [userId])

  return (
    <div>
      <Navbar />

      <main className="container page">
        <div className="row row-wrap" style={{ justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              Meal Planner
            </h2>
            <div className="subtle">Plan your week in one place.</div>
          </div>
        </div>

        <div className="grid grid-2" style={{ alignItems: "start" }}>

          {/* 🔹 Add Meal */}
          <div className="card card-pad">
            <h3 className="section-title" style={{ fontSize: 18 }}>
              Add a meal
            </h3>

            <div className="form">
              <select
                className="select"
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
                type="text"
                placeholder="Enter your meal (e.g. Pasta, Salad)"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />

              <textarea
                className="textarea"
                placeholder='Optional note (e.g. "Light dinner")'
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <button className="btn btn-primary" onClick={addMeal}>
                Add Meal
              </button>
            </div>
          </div>

          {/* 🔹 Weekly Plan */}
          <div className="card card-pad">
            <h3 className="section-title" style={{ fontSize: 18 }}>
              Weekly plan
            </h3>

            <div className="grid" style={{ marginTop: 10 }}>
              {days.map((d) => {
                const meal = mealPlans.find((m) => m.day === d)

                return (
                  <div
                    key={d}
                    className="card"
                    style={{
                      padding: 12,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.04)"
                    }}
                  >
                    <div className="row" style={{ justifyContent: "space-between" }}>
                      <div style={{ fontWeight: 700 }}>{d}</div>
                      <span className="pill">
                        {meal ? "Planned" : "Empty"}
                      </span>
                    </div>

                    <div className="subtle" style={{ marginTop: 6 }}>
                      {meal ? meal.mealName || "No meal planned" : "No meal planned"}
                    </div>

                    {meal?.note && (
                      <div className="helper" style={{ marginTop: 4 }}>
                        Note: {meal.note}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default MealPlanner