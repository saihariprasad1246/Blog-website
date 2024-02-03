import Navbar from "../components/Navbar";
import { IF } from "../Url.js";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../Url.js";
import "../stylesheet/postdetails.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function PostDetails() {
  const navigate = useNavigate();
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  console.log(postId);

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleCommentDelete = async (id) => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      console.log(res);
      fetchPostComments();
    } catch (err) {
      console.log(err.message);
    }
  };
  const handlePostDelete = async (cId) => {
    try {
      const res = await axios.delete(URL + "/api/comments/" + cId);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchPost = async () => {
    try {
      setLoader(true);
      const res = await axios.get(URL + "/api/posts/" + postId);
      console.log(res.data);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      setComments(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const postComment = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        URL + "/api/comments/create",
        {
          comment,
          postId,
          author: user.username,
          userId: user._id,
        },
        { withCredentials: true },
      );
      fetchPostComments();
      //setComments([...comments, res.data]);
      setComment("");
      console.log(comments);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {loader ? (
        <h2>Loading..</h2>
      ) : (
        <>
          <Navbar />
          <div className="post-container">
            <div className="post-heading">
              <h1 className="homepost-title">{post.title}</h1>
              {user?._id === post?.userId && (
                <div className="post-buttons">
                  <p
                    onClick={() => {
                      navigate(`/edit/${postId}`);
                    }}
                  >
                    <FiEdit />
                  </p>
                  <p onClick={handlePostDelete}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </div>
            <div className="homepost-info">
              <p>@{post.username}</p>
              <p>17-01-2024 10:20</p>
            </div>
            <div className="homepost-image">
              <img className="image" src={IF + post.photo} alt="sjghfshj" />
            </div>
            <div className="homepost-snippet">{post.description}</div>
            <div className="categories">
              <p>Categories:</p>
              <div className="categorie-type">
                {post.categories
                  ? post.categories.map((category, i) => (
                      <p key={i} className="categorie">
                        {category}
                      </p>
                    ))
                  : ""}
              </div>
            </div>
            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                handleCommentDelete={handleCommentDelete}
              />
            ))}
            <div className="createcomment"></div>

            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              className="input-comment"
              placeholder="write a Comment..."
            />
            <button onClick={postComment} className="comment-button">
              Comment
            </button>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
