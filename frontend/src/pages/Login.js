import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
function Login(){
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const login = async () => {
if(!email || !password){
alert("Please enter email and password")
return
}
try{
const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,{
email,
password
})
console.log("LOGIN RESPONSE:", res.data)
localStorage.setItem("token", res.data.token)
localStorage.setItem("userId", res.data.user._id)
localStorage.setItem("user", JSON.stringify(res.data.user))
alert("Login Successful")
window.location.href="/home"
}catch(err){
alert(err.response?.data?.message || "Login Failed")
console.log(err)
}
}
return(
<div className="auth-wrap">
  <div className="card auth-card">
    <div className="auth-head">
      <h2 className="section-title">Welcome back</h2>
      <p className="subtle" style={{ marginTop: 0 }}>
        Login to search recipes, favorite them, and plan meals for the week.
      </p>
    </div>
    <div className="auth-body">
      <div className="form">
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="btn btn-primary" onClick={login}>
          Login
        </button>
        <div className="helper">
          New here? <Link to="/register" style={{ textDecoration: "underline" }}>Create an account</Link>
        </div>
      </div>
    </div>
  </div>
</div>
)
}
export default Login
