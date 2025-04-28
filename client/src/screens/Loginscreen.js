import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error.js";
import Loader from "../components/Loader.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const loginuser = async () => {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response.data);
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
      setloading(false);
      seterror(true);
    }
  };
  return (
    <div>
      {loading && <Loader />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {error && <Error message="Invalid credential" />}
          <div className="bs">
            <h1> Login</h1>

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={loginuser}>
              {" "}
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
