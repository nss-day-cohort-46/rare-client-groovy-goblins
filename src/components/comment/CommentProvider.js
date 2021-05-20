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

    return(
        <CommentContext.Provider value={{
            comments, getComments
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}