import "./App.css";
import { useState } from "react";
import Blog from "./components/Blog";

function App() {
  const [name, setName] = useState("");
  const [blogs, setBlogs] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:8069/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      // mode: "nocors",
      body: `${encodeURIComponent("uuid")}=${encodeURIComponent(45)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.blogs);
        setBlogs(data.blogs);
      });
  };

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <div>
            <label>What's your name</label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="Post"></input>
      </form>
      <div>
        {blogs.length !== 0 ? (
          blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
        ) : (
          <p>Nope blog.</p>
        )}
      </div>
      {}
    </div>
  );
}

export default App;
