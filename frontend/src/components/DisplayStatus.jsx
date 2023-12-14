import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DisplayStatus({ activeUsername, searchUsername }) {
    const [posts, setPosts] = useState([]);
    const [editPostId, setEditPostId] = useState(null);
    const [editContent, setEditContent] = useState("");

    async function getAllStatus() {
        let url = searchUsername ? `/api/status/user/${searchUsername}` : "/api/status";
        try {
            const response = await axios.get(url);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    async function deleteStatus(postId) {
        if (!postId) {
            console.error("Post ID is undefined");
            return;
        }
        try {
            await axios.delete(`/api/status/${postId}`);
            setPosts((currentPosts) =>
                currentPosts.filter((post) => post._id !== postId)
            );
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    async function editStatus(postId, username, newContent) {
        if (!newContent) return;
        if (!postId) {
            console.error("Post ID is undefined");
            return;
        }
        try {
            await axios.put(`/api/status/${postId}`, { username: username, content: newContent });
            setEditPostId(null);
            setPosts((currentPosts) =>
                currentPosts.map((post) => post._id == postId? { ...post, content: newContent } : post)
            );
        } catch (error) {
            console.error("Error editing post:", error);
        }
    }

    useEffect(() => {
        getAllStatus();
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.username}</h3>
                    {editPostId === post._id ? (
                        <div>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button onClick={() => editStatus(post._id, post.username, editContent)}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>{post.content}</p>
                            <p>
                                Posted on:{" "}
                                {new Date(post.createdAt).toLocaleString()}
                            </p>
                            {activeUsername === post.username && (
                                <div>
                                    <button onClick={() => deleteStatus(post._id)}>Delete</button>
                                    <button onClick={() => {
                                        setEditPostId(post._id);
                                        setEditContent(post.content);
                                    }}>
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

