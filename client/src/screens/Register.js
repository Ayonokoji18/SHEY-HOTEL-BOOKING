import React, { useState } from "react";
import axios from "axios";
import Success from "../components/Success.js";
import Error from "../components/Error.js";
import Loader from "../components/Loader.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };

      try {
        setloading(true);
        const response = await axios.post("/api/users/register", user);
        console.log(response.data);
        setloading(false);
        setsuccess(true);

        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
      } catch (err) {
        console.log(err);
        setloading(false);
        seterror(true);
      }

      console.log(user);
    } else alert("password not match");
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}

      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {success && <Success message="Registration successful" />}
          <div className="bs">
            <h1> Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              {" "}
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
