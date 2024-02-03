import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Url.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { user } = useContext(UserContext);
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setnoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const fetchPosts = async () => {
    try {
      setLoader(true);
      const res = await axios.get(URL + "/api/posts/" + search, {
        withCredentials: true,
      });
      setPosts(res.data);
      setLoader(false);
      if (res.data.length === 0) {
        setnoResults(true);
      } else {
        setnoResults(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <div className="container">
      <Navbar />
      {loader ? (
        <h2>Loading....</h2>
      ) : noResults ? (
        <h2>No Posts Available</h2>
      ) : (
        posts.map((post) => (
          <>
            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePost key={post._id} post={post} />
            </Link>
          </>
        ))
      )}
      <Footer />
    </div>
  );
}
