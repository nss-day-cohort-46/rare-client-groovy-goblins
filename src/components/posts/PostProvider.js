import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    console.log('posts: ', posts);

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                return data
                
            })
    }

    const getPostsByUserId = user_id => {
        return fetch(`http://localhost:8000/posts?user_id=${user_id}`,  {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
            .then(setPosts)
    }

    const deletePost = ( id, user_id ) => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            method: "DELETE"
        })
            .then(() => getPostsByUserId(user_id))
    }

    const editPost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
            })
            .then(getPosts)    
    }
    
    const addPost = postObj => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(postObj)
        })
            .then(response => response.json())
            .then(getPosts)
    }

    const getPostById = id => {
        return fetch(`http://localhost:8000/posts/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
            .then(res => res.json())
    }

    const approvePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}/approve`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            },
            body: JSON.stringify(post)
            })
            .then(getPosts)    
    }


    return (
        <PostContext.Provider value={{
            posts, getPosts, getPostsByUserId, addPost, editPost, getPostById, deletePost, approvePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}