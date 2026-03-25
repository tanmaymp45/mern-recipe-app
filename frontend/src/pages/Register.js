import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const register = async () => {

if(!name || !email || !password){
alert("Please fill all fields")
return
}

try{

await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`,{
name,
email,
password
})

alert("User Registered Successfully")

window.location.href="/"

}catch(err){

alert("Registration Failed")
console.log(err)

}

}

return(

<div className="auth-wrap">
  <div className="card auth-card">
    <div className="auth-head">
      <h2 className="section-title">Create your account</h2>
      <p className="subtle" style={{ marginTop: 0 }}>
        It only takes a minute. Then you can favorite recipes and plan meals.
      </p>
    </div>

    <div className="auth-body">
      <div className="form">
        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

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

        <button className="btn btn-primary" onClick={register}>
          Register
        </button>

        <div className="helper">
          Already have an account? <Link to="/" style={{ textDecoration: "underline" }}>Back to login</Link>
        </div>
      </div>
    </div>
  </div>
</div>

)

}
export default Register