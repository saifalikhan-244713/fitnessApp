import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


export default function Signup() {
    
    const[email, setEmail]=useState()
    const[password, setPassword]=useState()
    const navigate = useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{email, password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
        navigate('/login')
    }

    return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <strong>email/username</strong>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter email"
            autoComplete="off"
            name="email"
            className="form-control"
            onChange={(e)=>setEmail(e.target.value)}
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="password">
            <strong>password/username</strong>
          </label>
          <br />
          <input
            type="text"
            placeholder="Enter Password"
            autoComplete="off"
            name="password"
            className="form-control"
            onChange={(e)=>setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">Register</button>
        </form>
      <br /> <br />
      <p>Already have an account</p>
      <Link to="/login">Login</Link>
    </>
  );
}
