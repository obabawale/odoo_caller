import React from "react";

export default function Blog({ blog }) {
  return (
    <div>
      <li>
        <span>{blog.id}</span>
        <span>{blog.name}</span>
        <span>{blog.content}</span>
        <span>{blog.state}</span>
      </li>
    </div>
  );
}
