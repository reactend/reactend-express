import React from "react";

export const PostItem = ({ userId, id, title, body }) => (
  <div style={{ width: 500, margin: "0 auto" }}>
    <p>
      UserID: {userId} / PostID: {id}
    </p>
    <h1>Title: {title}</h1>
    <p>Body: {body}</p>
  </div>
);
