import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8088/posts")
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                return data
                
            })
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
            .then(() => getPostsByUserId(user_id))
    }

    const editPost = post => {
        return fetch(`http://localhost:8088/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
            })
            .then(getPosts)    
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
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostsByUserId, addPost, editPost, getPostById, deletePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}