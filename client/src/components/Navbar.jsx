import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu.jsx";

export default function Navbar() {
  const [prompt, setPrompt] = useState("");
  //console.log(prompt);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  //const user = false;
  return (
    <nav className="nav-container">
      <h2 className="nav-item1">
        <Link to="/">BlogMarket</Link>
      </h2>
      {path === "/" && (
        <div className="nav-search">
          <p
            onClick={() => {
              navigate(prompt ? "?search=" + prompt : navigate("/"));
            }}
          >
            <IoMdSearch />
          </p>
          <input
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            type="text"
            className="input-search"
            placeholder="search a post"
          />
        </div>
      )}

      <div className="nav-sign">
        <Menu />
      </div>
    </nav>
  );
}
