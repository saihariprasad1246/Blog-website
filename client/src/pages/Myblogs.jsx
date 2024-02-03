import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { URL } from "../Url";
export default function Myblogs() {
  const param = useParams().id;
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const fetchPosts = async () => {
    try {
      setLoader(true);
      const res = await axios.get(URL + "/api/posts/user/" + param);
      console.log(res.data);
      setPosts(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <Navbar />
      {loader ? (
        <h2>Loading...</h2>
      ) : (
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
      )}
      <Footer />
    </div>
  );
}
