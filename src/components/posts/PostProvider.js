import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostsByUserId = user_id => {
        return fetch(`http://localhost:8088/posts?user_id=${user_id}`)
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = postObj => {
        return fetch("http://localhost:8088/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postObj)
        })
        .then(response => response.json())
        .then(getPosts)
    }

    const getPostById = id => {
        return fetch(`http://localhost:8088/posts/${id}`)
            .then(res => res.json())
            // .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostsByUserId, addPost, getPostById
        }}>
            {props.children}
        </PostContext.Provider>
    )
}