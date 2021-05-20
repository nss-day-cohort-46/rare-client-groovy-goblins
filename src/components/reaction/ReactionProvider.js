import React, { createContext, useState } from "react"

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
    const getReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`
            }
        })
        .then(res=>res.json())
    }

    const addReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${reaction.postId}/react`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }
    
    const removeReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${reaction.postId}/react`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }

    return(
        <ReactionContext.Provider value={{
            getReactions, addReaction, removeReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}