import "../stylesheet/CreatePost.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdCancel } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useState } from "react";
import { URL } from "../Url";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.pop(i);
    setCats(updatedCats);
  };
  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    console.log(post);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err.message);
      }
    }
    console.log(post);
    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      //console.log(res.data);
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!user) {
    navigate("/login");
  }

  return (
    <>
      <Navbar />
      <div className="create-container">
        <h1>Create a Post:</h1>
        <form
          onSubmit={(e) => {
            handleCreate(e);
          }}
          className="create-content"
        >
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="input-title"
            type="text"
            placeholder="Enter the title..."
          />
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
          />
          <div className="post-cat">
            <div className="post-input">
              <input
                className="input-cat"
                type="text"
                placeholder="Enter the category"
                value={cat}
                onChange={(e) => {
                  setCat(e.target.value);
                }}
              />
              <p className="cat-add" onClick={addCategory}>
                Add
              </p>
            </div>
            <div className="post-categories">
              {cats?.map((value, i) => (
                <div className="post-categorie" key={i}>
                  <p>{value}</p>
                  <p onClick={(i) => deleteCategory(i)}>
                    <MdCancel />
                  </p>
                </div>
              ))}

              <input
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="textarea"
                rows={15}
                columns={30}
                placeholder="Enter the description"
              />
              <input type="submit" value="create" />
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
