import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          // Store the user's email in local storage
          localStorage.setItem("userEmail", email);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container"></div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <strong>email/username</strong>
          </label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            autoComplete="off"
            name="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Enter Name"
            autoComplete="off"
            name="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">Login</button>
        <br /> <br />
        <p>dont have an account</p>
        <Link to="/register">Signup</Link>
      </form>
    </>
  );
}
