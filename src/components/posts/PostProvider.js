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

    const deletePost = ( id, user_id ) => {
        return fetch(`http://localhost:8088/posts/${id}`, {
            method: "DELETE"
        })
            .then(getPostsByUserId(user_id))
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostsByUserId, deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}