import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

function Profile(){

const [user,setUser] = useState(null)
const [favorites,setFavorites] = useState([])

const userId = localStorage.getItem("userId")
const navigate = useNavigate()


const getUser = async () => {
  try{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
    setUser(res.data)
    setFavorites(res.data.favorites || [])   

  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  getUser()
},[])

if(!user){
  return <h2>Loading...</h2>
}

return(

<div>
  <Navbar />

  <main className="container page">
    <div className="card card-pad">
      <h2 className="section-title">My Profile</h2>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>

    <div className="card card-pad" style={{ marginTop: 20 }}>
      <h3 className="section-title">My Favorite Recipes ❤️</h3>

      {favorites.length === 0 ? (
        <p>No favorite recipes yet</p>
      ) : (
        <div className="grid grid-4">
          {favorites.map((r) => (
            <div
              key={r.id}
              className="card recipe-card"
              onClick={() => navigate(`/recipe/${r.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="recipe-media">
                <img src={r.image} alt={r.title} />
              </div>

              <div className="recipe-body">
                <h4>{r.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </main>
</div>

)

}

export default Profile