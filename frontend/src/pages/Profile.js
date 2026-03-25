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
    const res = await API.get(`/api/users/${userId}`);
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

<Navbar/>

<h2>My Profile</h2>

<h3>Name: {user.name}</h3>
<p>Email: {user.email}</p>

<hr/>

<h3>My Favorite Recipes ❤️</h3>

{favorites.length === 0 ? (
  <p>No favorite recipes yet</p>
) : (

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"20px"
}}>

{favorites.map((r)=>(

<div
key={r.id}
onClick={()=>navigate(`/recipe/${r.id}`)}
style={{
border:"1px solid #ccc",
padding:"10px",
borderRadius:"10px",
cursor:"pointer"
}}
>

<h4>{r.title}</h4>

<img
src={r.image}
alt={r.title}
style={{width:"100%"}}
/>


</div>

))}

</div>

)}

</div>

)

}

export default Profile