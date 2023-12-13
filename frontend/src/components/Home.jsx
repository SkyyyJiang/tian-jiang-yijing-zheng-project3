import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import WriteStatus from "./WriteStatus";
import styles from "./HomePage.module.css";
export default function Home() {
  const [activeUsername, setActiveUsername] = useState(null);
  const [posts, setPosts] = useState([]);

  async function checkIfUserIsLoggedIn() {
    try {
      const response = await axios.get("/api/auth/isLoggedIn");
      setActiveUsername(response.data.username);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }

  async function fetchPosts() {
    try {
      const response = await axios.get("/api/status");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const handleDelete = async (postId) => {
    if (!postId) {
      console.error("Post ID is undefined");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/status/${postId}`);
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
    fetchPosts();
  }, []);

  return (
    <>
      <NavBar />
      {activeUsername && <WriteStatus username={activeUsername} />}
      <div className={styles.postsContainer}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <h3>{post.username}</h3>
              <p>{post.content}</p>
              <p>
                Posted on:{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US")}
              </p>
              {activeUsername === post.username && (
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
