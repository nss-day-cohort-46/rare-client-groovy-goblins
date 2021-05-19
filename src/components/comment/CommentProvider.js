import React, { createContext, useState } from "react"

export const CommentContext = createContext()

export const CommentProvider = (props) => {
    const [comments, setComments] = useState()

    const getComments = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}/comments`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(setComments)
    }

    const createComment = (comment) => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(getComments(comment.postId))
    }

    const deleteComment = (obj) => {
        return fetch(`http://localhost:8000/comments/${obj.commentId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(getComments(obj.postId))
    }

    return(
        <CommentContext.Provider value={{
            comments, getComments, createComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}