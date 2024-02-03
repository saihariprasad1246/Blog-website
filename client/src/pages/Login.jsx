import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Url.js";
import axios from "axios";
import { useState, useContext } from "react";
import "../stylesheet/login.css";
import { UserContext } from "../Context/UserContext.jsx";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      //console.log("login succesfull", res.data);
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
  };
  return (
    <>
      <nav className="nav-container">
        <h2 className="nav-item1">
          <Link to="/">BlogMarket</Link>
        </h2>
        <h3>
          <Link to="/register">Register</Link>
        </h3>
      </nav>
      <div className="login-container">
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
          className="login-content"
        >
          <h2>SignIn</h2>

          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input-data"
            type="email"
            placeholder="email.."
            required
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input-data"
            type="password"
            placeholder="password.."
            required
          />
          <input className="input-submit" type="submit" />
          <div className="no-account">
            <p>
              Don't you have account<Link to="/register">Register</Link>
            </p>
            {error ? <h2>something went wrong</h2> : ""}
          </div>
        </form>
      </div>
    </>
  );
}
