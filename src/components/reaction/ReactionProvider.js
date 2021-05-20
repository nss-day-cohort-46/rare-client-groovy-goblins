import React, { createContext, useState } from "react"

export const ReactionContext = createContext()

export const ReactionProvider = (props) => {
    const [reactions, setReactions] = useState([])

    const getReactions = () => {
        return fetch("http://localhost:8000/reactions", {
            headers:{
                "Authorization": "Token"
            }
        })
        .then(res=>res.json())
        .then(setReactions)
    }

    const addReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${id}/react`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reaction)
        })
    }
    
    const removeReaction = reaction => {
        return fetch(`http://localhost:8000/posts/${id}/react`, {
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
            reactions, getReactions, addReaction, removeReaction
        }}>
            {props.children}
        </ReactionContext.Provider>
    )
}