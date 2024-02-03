import { IF } from "../Url.js";

export default function HomePost({ post }) {
  return (
    <div className="homepost-container">
      <div className="homepost-image">
        <img src={IF + post.photo} alt="image" />
      </div>
      <div className="homepost-content">
        <h3 className="homepost-title">{post.title}</h3>
        <div className="homepost-info">
          <p>@{post.username}</p>
          <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
        </div>
        <div className="homepost-snippet">
          {post.description.slice(0, 200) + "   ...ReadMore"}
        </div>
      </div>
    </div>
  );
}
