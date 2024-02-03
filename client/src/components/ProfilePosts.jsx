import { IF } from "../Url";
export default function ProfilePosts({ p }) {
  return (
    <div className="homepost-container">
      <div className="homepost-image">
        <img src={IF + p.photo} alt="no photo" />
      </div>
      <div className="homepost-content">
        <h3 className="homepost-title">{p.title} </h3>
        <div className="homepost-info">
          <p>@{p.username}</p>
          <p>{new Date(p.createdAt).toDateString()}</p>
        </div>
        <div className="homepost-snippet">{p.description.slice(0, 100)}</div>
      </div>
    </div>
  );
}
