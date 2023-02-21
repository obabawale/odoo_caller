import "./App.css";
import { useState } from "react";
import Blog from "./components/Blog";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = (event) => {
    event.preventDefault();
    fetch("http://localhost:8069/api/blogs", {})
      .then((response) => response.json())
      .then((data) => {
        console.log(data.blogs);
        setBlogs(data.blogs);
      });
  };

  const submitBlog = async () => {
    console.log("Title ", title);
    console.log("content ", content);
    const blogData = {
      title: title,
      content: content,
    };

    const url = "http://localhost:8069/api/blogs";
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: Object.keys(blogData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(blogData[key])
        )
        .join("&"),
    });
    const createdBlog = await resp.json();
    console.log("Created " + createdBlog);
  };

  return (
    <div class="container">
      <form>
        <div class="form-group">
          <label for="blogTitle">Title</label>
          <input
            type="text"
            class="form-control"
            id="blogTitle"
            placeholder="Blog Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="form-group">
          <div>
            <label for="blogContent">Blog Content</label>
            <textarea
              type="text"
              class="form-control"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <button onClick={fetchBlogs} className="btn btn-primary">
              Get Blogs
            </button>
          </div>
          <div class="col">
            <button onClick={submitBlog} className="btn btn-primary">
              Submit Blog
            </button>
          </div>
        </div>
      </form>
      <div class="row">
        {blogs.length !== 0 ? (
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        ) : (
          <p class="container">No blog.</p>
        )}
      </div>
      {}
    </div>
  );
}

export default App;
