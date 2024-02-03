import axios from "axios";
import { URL } from "../Url.js";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../Context/UserContext.jsx";
import { useContext } from "react";

export default function Comment({ c, handleCommentDelete }) {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h3>@{c.author}</h3>
      <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
      <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
      {user?._id === c?.userId && (
        <div className="post-buttons">
          <p
            onClick={() => {
              handleCommentDelete(c._id);
            }}
          >
            <MdDelete />
          </p>
        </div>
      )}
      <p>{c.comment}</p>
    </div>
  );
}
