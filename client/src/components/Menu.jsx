import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../Url.js";

export default function Menu() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(null);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      {!user && (
        <h4
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Login
        </h4>
      )}
      {!user && (
        <h4
          onClick={() => {
            navigate(`/register`);
          }}
        >
          Register
        </h4>
      )}
      {user && (
        <h4
          onClick={() => {
            navigate(`/write`);
          }}
        >
          Write
        </h4>
      )}
      {user && (
        <h4
          onClick={() => {
            navigate(`/profile/${user._id}`);
          }}
        >
          Profile
        </h4>
      )}
      {user && (
        <h4
          onClick={() => {
            navigate(`/myblogs/${user._id}`);
          }}
        >
          My blogs
        </h4>
      )}
      {user && <h4 onClick={handleLogout}>Logout</h4>}
    </>
  );
}
