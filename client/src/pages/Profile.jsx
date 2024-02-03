import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { IF } from "../Url.js";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { URL } from "../Url.js";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import ProfilePosts from "../components/ProfilePosts";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const param = useParams().id;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  const handleuserupdate = async () => {
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        {
          username,
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleuserdelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      console.log(res.data);
      setUsername(res.data.info.username);
      setEmail(res.data.info.email);
      setPassword(res.data.info.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-posts">
          {posts.length == 0 ? (
            <h2>No posts available</h2>
          ) : (
            posts.map((p) => (
              <>
                <Link to={`/posts/post/${p._id}`}>
                  <ProfilePosts key={p._id} p={p} />
                </Link>
              </>
            ))
          )}
        </div>
        <div className="profile-details">
          <h1 className="profileheading">Profile:</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Your username"
            className="profile-username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Your email"
            className="profile-email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Your password"
            className="profile-username"
          />
          <div className="profile-change">
            <button onClick={handleuserupdate} className="profile-update">
              Update
            </button>
            <button onClick={handleuserdelete} className="profile-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
