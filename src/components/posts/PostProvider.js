import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("localhost:8088/posts")
            .then(res => res.json())
            .then(setPosts)
    }

    const getPostsByUserId = user_id => {
        return fetch(`localhost:8088/post?user_id=${user_id}`)
            .then(res => res.json())
            .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostsByUserId
        }}
    )
}