import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Url.js";
import axios from "axios";
import { useState } from "react";
import Footer from "../components/Footer";
import "../stylesheet/login.css";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = axios.post(URL + "/api/auth/register", {
        username,
        password,
        email,
      });
      console.log(res);
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err.message);
    }
  };

  console.log(username, password, email);

  return (
    <>
      <nav className="nav-container">
        <h2 className="nav-item1">
          <Link to="/">BlogMarket</Link>
        </h2>
        <h3>
          <Link to="/login">Login</Link>
        </h3>
      </nav>
      <div className="login-container">
        <form onSubmit={handleRegister} action="#" className="login-content">
          <h2>SignUp</h2>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="input-data"
            type="text"
            placeholder="username.."
            required
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input-data"
            type="email"
            placeholder="enter your email.."
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
              Do you have account<Link to="/login">Login</Link>
            </p>

            {error ? <h2>something went wrong </h2> : ""}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
